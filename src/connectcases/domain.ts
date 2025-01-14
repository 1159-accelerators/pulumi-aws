import * as pulumi from '@pulumi/pulumi';
import {
  ConnectCasesClient,
  CreateDomainCommand,
  DeleteDomainCommand,
} from '@aws-sdk/client-connectcases';
import { clientConfig } from '../config';
import { v4 as uuidv4 } from 'uuid';

export interface DomainArgs {
  name: pulumi.Input<string>;
}

interface Inputs {
  name: string;
}

interface Outputs extends Inputs {
  domainArn: string;
  domainId: string;
  domainStatus: string;
}

const getClient = () => new ConnectCasesClient(clientConfig());

class Provider implements pulumi.dynamic.ResourceProvider {
  private domainArn: string | undefined = undefined;
  private domainId: string | undefined = undefined;
  private domainStatus: string | undefined = undefined;

  private client: () => ConnectCasesClient;

  constructor(getClient: () => ConnectCasesClient) {
    this.client = getClient;
  }

  async create(inputs: Inputs): Promise<pulumi.dynamic.CreateResult> {
    const input = { name: inputs.name };
    try {
      const response = await this.client().send(new CreateDomainCommand(input));

      this.domainArn = response.domainArn;
      this.domainId = response.domainId;
      this.domainStatus = response.domainStatus;

      if (!this.domainArn || !this.domainId || !this.domainStatus) {
        const errorMessage = 'Return values are incorrect';
        pulumi.log.error(errorMessage, undefined, undefined, true);
        throw new Error(errorMessage);
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }

    const outs: Outputs = {
      domainArn: this.domainArn,
      domainId: this.domainId,
      domainStatus: this.domainStatus,
      ...inputs,
    };

    return {
      id: uuidv4(),
      outs: outs,
    };
  }

  async diff(
    id: string,
    olds: Outputs,
    news: Inputs,
  ): Promise<pulumi.dynamic.DiffResult> {
    let changes = false;

    if (olds.name !== news.name) {
      changes = true;
    }
    return {
      changes,
      deleteBeforeReplace: true,
      replaces: ['name'],
    };
  }

  async delete(id: string, props: Outputs) {
    const input = { domainId: props.domainId };
    try {
      await this.client().send(new DeleteDomainCommand(input));
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}

export class Domain extends pulumi.dynamic.Resource {
  declare readonly domainArn: pulumi.Output<string>;
  declare readonly domainId: pulumi.Output<string>;
  declare readonly domainStatus: pulumi.Output<string>;

  declare readonly name: pulumi.Output<string>;

  constructor(
    name: string,
    args: DomainArgs,
    opts?: pulumi.CustomResourceOptions,
  ) {
    super(
      new Provider(getClient),
      name,
      {
        domainArn: undefined,
        domainId: undefined,
        domainStatus: undefined,
        ...args,
      },
      opts,
    );
  }
}
