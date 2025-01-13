import * as pulumi from '@pulumi/pulumi';
import {
  ConnectClient,
  CreateIntegrationAssociationCommand,
  DeleteIntegrationAssociationCommand,
} from '@aws-sdk/client-connect';
import { clientConfig } from '../config';

type IntegrationType =
  | 'EVENT'
  | 'VOICE_ID'
  | 'PINPOINT_APP'
  | 'WISDOM_ASSISTANT'
  | 'WISDOM_KNOWLEDGE_BASE'
  | 'WISDOM_QUICK_RESPONSES'
  | 'Q_MESSAGE_TEMPLATES'
  | 'CASES_DOMAIN'
  | 'APPLICATION'
  | 'FILE_SCANNER'
  | 'SES_IDENTITY'
  | 'ANALYTICS_CONNECTOR'
  | 'CALL_TRANSFER_CONNECTOR'
  | 'COGNITO_USER_POOL';

export interface IntegrationArgs {
  instanceId: pulumi.Input<string>;
  integrationArn: pulumi.Input<string>;
  integrationType: pulumi.Input<IntegrationType>;
}

interface Inputs {
  instanceId: string;
  integrationArn: string;
  integrationType: IntegrationType;
}

interface Outputs extends Inputs {
  integrationAssociationId: string;
  integrationAssociationArn: string;
}

const getClient = () => new ConnectClient(clientConfig());

class Provider implements pulumi.dynamic.ResourceProvider {
  private integrationAssociationId: string | undefined = undefined;
  private integrationAssociationArn: string | undefined = undefined;

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
      olds.integrationArn !== news.integrationArn ||
      olds.instanceId !== news.instanceId
    ) {
      changes = true;
    }
    return {
      changes,
      deleteBeforeReplace: true,
      replaces: ['integrationArn', 'instanceId'],
    };
  }

  async create(inputs: Inputs): Promise<pulumi.dynamic.CreateResult> {
    const input = {
      InstanceId: inputs.instanceId,
      IntegrationArn: inputs.integrationArn,
      IntegrationType: inputs.integrationType,
    };
    try {
      const response = await this.client().send(
        new CreateIntegrationAssociationCommand(input),
      );

      this.integrationAssociationId = response.IntegrationAssociationId;
      this.integrationAssociationArn = response.IntegrationAssociationArn;

      if (!this.integrationAssociationId || !this.integrationAssociationArn) {
        const errorMessage = 'Return values are incorrect';
        pulumi.log.error(errorMessage, undefined, undefined, true);
        throw new Error(errorMessage);
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }

    const outs: Outputs = {
      integrationAssociationId: this.integrationAssociationId,
      integrationAssociationArn: this.integrationAssociationArn,
      ...inputs,
    };

    return {
      id: `${inputs.instanceId}-${inputs.integrationArn}-integration`,
      outs: outs,
    };
  }

  async delete(id: string, props: Outputs) {
    const input = {
      InstanceId: props.instanceId,
      IntegrationAssociationId: props.integrationAssociationId,
    };
    try {
      await this.client().send(new DeleteIntegrationAssociationCommand(input));
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}

export class Integration extends pulumi.dynamic.Resource {
  declare readonly integrationAssociationId: pulumi.Output<string>;
  declare readonly integrationAssociationArn: pulumi.Output<string>;

  constructor(
    name: string,
    args: IntegrationArgs,
    opts?: pulumi.CustomResourceOptions,
  ) {
    super(
      new Provider(getClient),
      name,
      {
        integrationAssociationId: undefined,
        integrationAssociationArn: undefined,
        ...args,
      },
      opts,
    );
  }
}
