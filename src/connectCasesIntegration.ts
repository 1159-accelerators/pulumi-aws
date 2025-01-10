import * as pulumi from '@pulumi/pulumi';
import { execSync } from 'node:child_process';

export interface ConnectCasesIntegrationArgs {
  instanceId: pulumi.Input<string>;
  domainArn: pulumi.Input<string>;
}

interface Inputs {
  instanceId: string;
  domainArn: string;
}

interface Outputs extends Inputs {
  integrationAssociationId: string;
  integrationAssociationArn: string;
}

class Provider implements pulumi.dynamic.ResourceProvider {
  private integrationAssociationId: string = '';
  private integrationAssociationArn: string = '';

  async diff(
    id: string,
    olds: Outputs,
    news: Inputs,
  ): Promise<pulumi.dynamic.DiffResult> {
    let changes = false;

    if (
      olds.domainArn !== news.domainArn ||
      olds.instanceId !== news.instanceId
    ) {
      changes = true;
    }
    return {
      changes,
      deleteBeforeReplace: true,
      replaces: ['domainArn', 'instanceId'],
    };
  }

  async create(inputs: Inputs): Promise<pulumi.dynamic.CreateResult> {
    try {
      const integrationResult = JSON.parse(
        execSync(
          `aws connect create-integration-association --instance-id ${inputs.instanceId} --integration-type CASES_DOMAIN --integration-arn ${inputs.domainArn} --output json`,
          { stdio: ['pipe', 'pipe', 'ignore'] },
        ).toString(),
      );

      this.integrationAssociationId =
        integrationResult.IntegrationAssociationId;
      this.integrationAssociationArn =
        integrationResult.IntegrationAssociationArn;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }

    const outs: Outputs = {
      integrationAssociationId: this.integrationAssociationId,
      integrationAssociationArn: this.integrationAssociationArn,
      ...inputs,
    };

    return {
      id: `${inputs.instanceId}-${inputs.domainArn}-integration`,
      outs: outs,
    };
  }

  async delete(id: string, props: Outputs) {
    try {
      execSync(
        `aws connect delete-integration-association --instance-id ${props.instanceId} --integration-association-id ${props.integrationAssociationId}`,
        { stdio: 'ignore' },
      );
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}

export class ConnectCasesIntegration extends pulumi.dynamic.Resource {
  declare readonly instanceId: pulumi.Output<string>;
  declare readonly domainArn: pulumi.Output<string>;

  declare readonly integrationAssociationId: pulumi.Output<string>;
  declare readonly integrationAssociationArn: pulumi.Output<string>;

  constructor(
    name: string,
    args: ConnectCasesIntegrationArgs,
    opts?: pulumi.CustomResourceOptions,
  ) {
    super(new Provider(), name, args, opts);
  }
}
