import * as pulumi from '@pulumi/pulumi';
import {
  CustomerProfilesClient,
  PutProfileObjectTypeCommand,
  DeleteProfileObjectTypeCommand,
} from '@aws-sdk/client-customer-profiles';
import { clientConfig } from '../config';
import { v4 as uuidv4 } from 'uuid';

export interface ProfileObjectTypeArgs {
  domainName: pulumi.Input<string>;
  objectTypeName: pulumi.Input<string>;
  description: pulumi.Input<string>;
  templateId?: pulumi.Input<string>;
}

interface Inputs {
  domainName: string;
  objectTypeName: string;
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
      ObjectTypeName: inputs.objectTypeName,
      TemplateId: inputs.templateId,
    };
    try {
      const response = await this.client().send(
        new PutProfileObjectTypeCommand(input),
      );
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
      olds.description !== news.description ||
      olds.templateId !== news.templateId
    ) {
      changes = true;
    }
    return {
      changes,
      deleteBeforeReplace: true,
      replaces: ['domainName', 'objectTypeName', 'description', 'templateId'],
    };
  }

  async delete(id: string, props: Outputs) {
    const input = {
      DomainName: props.domainName,
      ObjectTypeName: props.objectTypeName,
    };
    try {
      await this.client().send(new DeleteProfileObjectTypeCommand(input));
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}

export class ProfileObjectType extends pulumi.dynamic.Resource {
  declare readonly domainName: pulumi.Output<string>;
  declare readonly objectTypeName: pulumi.Output<string>;
  declare readonly description: pulumi.Output<string>;
  declare readonly templateId: pulumi.Output<string>;

  constructor(
    name: string,
    args: ProfileObjectTypeArgs,
    opts?: pulumi.CustomResourceOptions,
  ) {
    super(new Provider(getClient), name, args, opts);
  }
}
