import * as pulumi from '@pulumi/pulumi';
import {
  CustomerProfilesClient,
  CreateDomainCommand,
  DeleteDomainCommand,
  UpdateDomainCommand,
} from '@aws-sdk/client-customer-profiles';
import { clientConfig } from '../config';

export interface DomainArgs {
  domainName: pulumi.Input<string>;
  defaultEncryptionKey?: pulumi.Input<string>;
  defaultExpirationDays?: pulumi.Input<number>;
}

type Inputs = {
  domainName: string;
  defaultEncryptionKey?: string;
  defaultExpirationDays?: number;
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
      DefaultEncryptionKey: inputs.defaultEncryptionKey,
      DefaultExpirationDays: inputs.defaultExpirationDays || 720,
    };
    try {
      await this.client().send(new CreateDomainCommand(input));
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }

    const outs: Outputs = {
      ...inputs,
    };

    return {
      id: `${inputs.domainName}-customer-profiles-domain`,
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
      olds.defaultEncryptionKey !== news.defaultEncryptionKey ||
      olds.defaultExpirationDays !== news.defaultExpirationDays
    ) {
      changes = true;
    }
    return {
      changes,
      deleteBeforeReplace: true,
      replaces: ['domainName'],
    };
  }

  async delete(id: string, props: Outputs) {
    const input = { DomainName: props.domainName };
    try {
      await this.client().send(new DeleteDomainCommand(input));
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async update(
    id: string,
    olds: Outputs,
    news: Inputs,
  ): Promise<pulumi.dynamic.UpdateResult> {
    const input = {
      DomainName: olds.domainName,
      DefaultEncryptionKey: news.defaultEncryptionKey,
      DefaultExpirationDays: news.defaultExpirationDays || 720,
    };
    try {
      await this.client().send(new UpdateDomainCommand(input));
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }

    const outs: Outputs = {
      ...news,
    };

    return {
      outs: outs,
    };
  }
}

export class Domain extends pulumi.dynamic.Resource {
  constructor(
    name: string,
    args: DomainArgs,
    opts?: pulumi.CustomResourceOptions,
  ) {
    super(new Provider(getClient), name, args, opts);
  }
}
