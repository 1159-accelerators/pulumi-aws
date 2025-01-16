import * as pulumi from '@pulumi/pulumi';
import {
  ConnectCasesClient,
  CreateFieldCommand,
  DeleteFieldCommand,
  UpdateFieldCommand,
  FieldType,
} from '@aws-sdk/client-connectcases';
import { clientConfig } from '../config';
import { v4 as uuidv4 } from 'uuid';

export interface FieldArgs {
  name: pulumi.Input<string>;
  domainId: pulumi.Input<string>;
  description?: pulumi.Input<string>;
  type: pulumi.Input<FieldType>;
}

interface Inputs {
  name: string;
  domainId: string;
  description?: string;
  type: FieldType;
}

interface Outputs extends Inputs {
  fieldArn?: string;
  fieldId?: string;
}

const getClient = () => new ConnectCasesClient(clientConfig());

class Provider implements pulumi.dynamic.ResourceProvider {
  private fieldArn: string | undefined = undefined;
  private fieldId: string | undefined = undefined;

  private client: () => ConnectCasesClient;

  constructor(getClient: () => ConnectCasesClient) {
    this.client = getClient;
  }

  async create(inputs: Inputs): Promise<pulumi.dynamic.CreateResult> {
    const input = {
      name: inputs.name,
      domainId: inputs.domainId,
      type: inputs.type,
      description: inputs.description,
    };
    try {
      const response = await this.client().send(new CreateFieldCommand(input));

      this.fieldArn = response.fieldArn;
      this.fieldId = response.fieldId;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }

    const outs: Outputs = {
      fieldArn: this.fieldArn,
      fieldId: this.fieldId,
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
      olds.domainId !== news.domainId ||
      olds.type !== news.type ||
      olds.description !== news.description
    ) {
      changes = true;
    }
    return {
      changes,
      deleteBeforeReplace: true,
      replaces: ['domainId', 'type'],
    };
  }

  async delete(id: string, props: Outputs) {
    const input = { domainId: props.domainId, fieldId: props.fieldId };
    try {
      await this.client().send(new DeleteFieldCommand(input));
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
      domainId: olds.domainId,
      fieldId: olds.fieldId,
      description: news.description,
      name: news.name,
    };
    try {
      await this.client().send(new UpdateFieldCommand(input));
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }

    const outs: Outputs = {
      ...olds,
      name: news.name,
      description: news.description,
    };

    return {
      outs: outs,
    };
  }
}

export class Domain extends pulumi.dynamic.Resource {
  declare readonly fieldArn: pulumi.Output<string>;
  declare readonly fieldId: pulumi.Output<string>;

  declare readonly name: pulumi.Output<string>;
  declare readonly domainId: pulumi.Output<string>;
  declare readonly type: pulumi.Output<string>;
  declare readonly description: pulumi.Output<string>;

  constructor(
    name: string,
    args: FieldArgs,
    opts?: pulumi.CustomResourceOptions,
  ) {
    super(
      new Provider(getClient),
      name,
      {
        fieldArn: undefined,
        fieldId: undefined,
        ...args,
      },
      opts,
    );
  }
}
