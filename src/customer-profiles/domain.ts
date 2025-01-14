import * as pulumi from '@pulumi/pulumi';
import {
  CustomerProfilesClient,
  CreateDomainCommand,
  DeleteDomainCommand,
  UpdateDomainCommand,
} from '@aws-sdk/client-customer-profiles';
import { clientConfig } from '../config';
import { v4 as uuidv4 } from 'uuid';

export interface DomainArgs {
  name: pulumi.Input<string>;
  encryptionKey?: pulumi.Input<string>;
  expirationDays?: pulumi.Input<number>;
}

interface Inputs {
  name: string;
  encryptionKey?: string;
  expirationDays?: number;
}

interface Outputs extends Inputs {
  domainName?: string;
  defaultEncryptionKey?: string;
  defaultExpirationDays?: number;
}

const getClient = () => new CustomerProfilesClient(clientConfig());

class Provider implements pulumi.dynamic.ResourceProvider {
  private domainName: string | undefined = undefined;
  private defaultEncryptionKey: string | undefined = undefined;
  private defaultExpirationDays: number | undefined = undefined;

  private client: () => CustomerProfilesClient;

  constructor(getClient: () => CustomerProfilesClient) {
    this.client = getClient;
  }

  async create(inputs: Inputs): Promise<pulumi.dynamic.CreateResult> {
    const input = {
      DomainName: inputs.name,
      DefaultEncryptionKey: inputs.encryptionKey,
      DefaultExpirationDays: inputs.expirationDays || 720,
    };
    try {
      const response = await this.client().send(new CreateDomainCommand(input));

      this.domainName = response.DomainName;
      this.defaultEncryptionKey = response.DefaultEncryptionKey;
      this.defaultExpirationDays = response.DefaultExpirationDays;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }

    const outs: Outputs = {
      domainName: this.domainName,
      defaultEncryptionKey: this.defaultEncryptionKey,
      defaultExpirationDays: this.defaultExpirationDays,
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

    if (
      olds.name !== news.name ||
      olds.encryptionKey !== news.encryptionKey ||
      olds.expirationDays !== news.expirationDays
    ) {
      changes = true;
    }
    return {
      changes,
      deleteBeforeReplace: true,
      replaces: ['name'],
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
      DomainName: olds.name,
      DefaultEncryptionKey: news.encryptionKey,
      DefaultExpirationDays: news.expirationDays || 720,
    };
    try {
      const response = await this.client().send(new UpdateDomainCommand(input));

      this.domainName = response.DomainName;
      this.defaultEncryptionKey = response.DefaultEncryptionKey;
      this.defaultExpirationDays = response.DefaultExpirationDays;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }

    const outs: Outputs = {
      domainName: this.domainName,
      defaultEncryptionKey: this.defaultEncryptionKey,
      defaultExpirationDays: this.defaultExpirationDays,
      ...news,
    };

    return {
      outs: outs,
    };
  }
}

export class Domain extends pulumi.dynamic.Resource {
  declare readonly domainName: pulumi.Output<string>;
  declare readonly defaultEncryptionKey: pulumi.Output<string>;
  declare readonly defaultExpirationDays: pulumi.Output<number>;

  constructor(
    name: string,
    args: DomainArgs,
    opts?: pulumi.CustomResourceOptions,
  ) {
    super(
      new Provider(getClient),
      name,
      {
        domainName: undefined,
        defaultEncryptionKey: undefined,
        defaultExpirationDays: undefined,
        ...args,
      },
      opts,
    );
  }
}
