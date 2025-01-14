import * as pulumi from '@pulumi/pulumi';
import {
  CustomerProfilesClient,
  PutIntegrationCommand,
  DeleteIntegrationCommand,
} from '@aws-sdk/client-customer-profiles';
import { clientConfig } from '../config';
import { v4 as uuidv4 } from 'uuid';

export interface IntegrationArgs {
  domainName: pulumi.Input<string>;
  objectTypeName?: pulumi.Input<string>;
  uri: pulumi.Input<string>;
}

type Inputs = {
  domainName: string;
  objectTypeName?: string;
  uri: string;
};

type Outputs = Inputs;

const getClient = () => new CustomerProfilesClient(clientConfig());

class Provider implements pulumi.dynamic.ResourceProvider {
  private client: () => CustomerProfilesClient;

  constructor(getClient: () => CustomerProfilesClient) {
    this.client = getClient;
  }

  async create(inputs: Inputs): Promise<pulumi.dynamic.CreateResult> {
    const input = {
      DomainName: inputs.domainName,
      ObjectTypeName: inputs.objectTypeName,
      Uri: inputs.uri,
    };
    try {
      await this.client().send(new PutIntegrationCommand(input));
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }

    const outs: Outputs = inputs;

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

    if (
      olds.domainName !== news.domainName ||
      olds.objectTypeName !== news.objectTypeName ||
      olds.uri !== news.uri
    ) {
      changes = true;
    }
    return {
      changes,
      deleteBeforeReplace: true,
      replaces: ['domainName', 'objectTypeName', 'uri'],
    };
  }

  async delete(id: string, props: Outputs) {
    const input = { DomainName: props.domainName, Uri: props.uri };
    try {
      await this.client().send(new DeleteIntegrationCommand(input));
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}

export class Integration extends pulumi.dynamic.Resource {
  declare readonly domainName: pulumi.Output<string>;
  declare readonly objectTypeName: pulumi.Output<string>;
  declare readonly uri: pulumi.Output<string>;

  constructor(
    name: string,
    args: IntegrationArgs,
    opts?: pulumi.CustomResourceOptions,
  ) {
    super(new Provider(getClient), name, args, opts);
  }
}
