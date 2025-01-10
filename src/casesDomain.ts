import * as pulumi from '@pulumi/pulumi';
import { execSync } from 'node:child_process';

export interface CasesDomainArgs {
  name: pulumi.Input<string>;
  instanceId: pulumi.Input<string>;
}

interface Inputs {
  name: string;
  instanceId: string;
}

interface Outputs extends Inputs {
  domainArn: string;
  domainId: string;
  domainStatus: string;
}

class Provider implements pulumi.dynamic.ResourceProvider {
  private domainArn: string = '';
  private domainId: string = '';
  private domainStatus: string = '';

  async create(inputs: Inputs): Promise<pulumi.dynamic.CreateResult> {
    try {
      const domainResult = JSON.parse(
        execSync(
          `aws connectcases create-domain --name ${inputs.name} --output json`,
          { stdio: ['pipe', 'pipe', 'ignore'] },
        ).toString(),
      );

      this.domainArn = domainResult.domainArn;
      this.domainId = domainResult.domainId;
      this.domainStatus = domainResult.domainStatus;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }

    return {
      id: `${inputs.name}-${inputs.instanceId}-cases-domain`,
      outs: {
        domainArn: this.domainArn,
        domainId: this.domainId,
        domainStatus: this.domainStatus,
        ...inputs,
      },
    };
  }

  async diff(
    id: string,
    olds: Outputs,
    news: Inputs,
  ): Promise<pulumi.dynamic.DiffResult> {
    let changes = false;

    if (olds.name !== news.name || olds.instanceId !== news.instanceId) {
      changes = true;
    }
    return {
      changes,
      deleteBeforeReplace: true,
      replaces: ['name', 'instanceId'],
    };
  }

  async delete(id: string, props: Outputs) {
    try {
      execSync(`aws connectcases delete-domain --domain-id ${props.domainId}`, {stdio: "ignore"});
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}

export class CasesDomain extends pulumi.dynamic.Resource {
  declare readonly domainArn: pulumi.Output<string>;
  declare readonly domainId: pulumi.Output<string>;
  declare readonly domainStatus: pulumi.Output<string>;

  declare readonly name: pulumi.Output<string>;
  declare readonly instanceId: pulumi.Output<string>;

  constructor(
    name: string,
    args: CasesDomainArgs,
    opts?: pulumi.CustomResourceOptions,
  ) {
    super(new Provider(), name, args, opts);
  }
}
