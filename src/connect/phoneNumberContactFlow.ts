import * as pulumi from '@pulumi/pulumi';
import {
  ConnectClient,
  AssociatePhoneNumberContactFlowCommand,
  DisassociatePhoneNumberContactFlowCommand,
} from '@aws-sdk/client-connect';
import { clientConfig } from '../config';

export interface PhoneNumberContactFlowArgs {
  phoneNumberId: pulumi.Input<string>;
  instanceId: pulumi.Input<string>;
  contactFlowId: pulumi.Input<string>;
}

interface Inputs {
  phoneNumberId: string;
  instanceId: string;
  contactFlowId: string;
}

type Outputs = Inputs;

const getClient = () => new ConnectClient(clientConfig());

class Provider implements pulumi.dynamic.ResourceProvider {
  private client: () => ConnectClient;

  constructor(getClient: () => ConnectClient) {
    this.client = getClient;
  }

  async diff(
    id: string,
    olds: Outputs,
    news: Inputs,
  ): Promise<pulumi.dynamic.DiffResult> {
    let changes = false;

    if (
      olds.phoneNumberId !== news.phoneNumberId ||
      olds.instanceId !== news.instanceId ||
      olds.contactFlowId !== news.contactFlowId
    ) {
      changes = true;
    }
    return {
      changes,
      deleteBeforeReplace: true,
      replaces: ['phoneNumberId', 'instanceId', 'contactFlowId'],
    };
  }

  async create(inputs: Inputs): Promise<pulumi.dynamic.CreateResult> {
    const input = {
      ContactFlowId: inputs.contactFlowId,
      InstanceId: inputs.instanceId,
      PhoneNumberId: inputs.phoneNumberId,
    };
    try {
      const response = await this.client().send(
        new AssociatePhoneNumberContactFlowCommand(input),
      );
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }

    const outs: Outputs = inputs;

    return {
      id: `${inputs.phoneNumberId}-${inputs.contactFlowId}-phone-flow-association`,
      outs: outs,
    };
  }

  async delete(id: string, props: Outputs) {
    const input = {
      InstanceId: props.instanceId,
      PhoneNumberId: props.phoneNumberId,
    };
    try {
      await this.client().send(
        new DisassociatePhoneNumberContactFlowCommand(input),
      );
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}

export class PhoneNumberContactFlow extends pulumi.dynamic.Resource {
  constructor(
    name: string,
    args: PhoneNumberContactFlowArgs,
    opts?: pulumi.CustomResourceOptions,
  ) {
    super(new Provider(getClient), name, args, opts);
  }
}
