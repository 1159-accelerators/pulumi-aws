import * as pulumi from '@pulumi/pulumi';
import {
  CustomerProfilesClient,
  PutProfileObjectTypeCommand,
  DeleteProfileObjectTypeCommand,
} from '@aws-sdk/client-customer-profiles';
import { clientConfig } from '../config';

export interface ProfileObjectTypeArgs {
  domainName: pulumi.Input<string>;
  objectType: pulumi.Input<string>;
  description: pulumi.Input<string>;
  templateId?: pulumi.Input<string>;
}

interface Inputs {
  domainName: string;
  objectType: string;
  description: string;
  templateId?: string;
}

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
      Description: inputs.description,
      ObjectTypeName: inputs.objectType,
      TemplateId: inputs.templateId,
    };
    try {
      await this.client().send(new PutProfileObjectTypeCommand(input));
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }

    const outs: Outputs = inputs;

    return {
      id: `${inputs.domainName}-${inputs.objectType}-object-type`,
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
      olds.objectType !== news.objectType ||
      olds.description !== news.description ||
      olds.templateId !== news.templateId
    ) {
      changes = true;
    }
    return {
      changes,
      deleteBeforeReplace: true,
      replaces: ['domainName', 'objectType', 'description', 'templateId'],
    };
  }

  async delete(id: string, props: Outputs) {
    const input = {
      DomainName: props.domainName,
      ObjectTypeName: props.objectType,
    };
    try {
      await this.client().send(new DeleteProfileObjectTypeCommand(input));
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}

export class ProfileObjectType extends pulumi.dynamic.Resource {
  constructor(
    name: string,
    args: ProfileObjectTypeArgs,
    opts?: pulumi.CustomResourceOptions,
  ) {
    super(new Provider(getClient), name, args, opts);
  }
}
