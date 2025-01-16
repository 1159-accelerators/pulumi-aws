import * as pulumi from '@pulumi/pulumi';
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
export declare class Integration extends pulumi.dynamic.Resource {
  readonly integrationAssociationId: pulumi.Output<string>;
  readonly integrationAssociationArn: pulumi.Output<string>;
  readonly instanceId: pulumi.Output<string>;
  readonly integrationArn: pulumi.Output<string>;
  readonly integrationType: pulumi.Output<IntegrationType>;
  constructor(
    name: string,
    args: IntegrationArgs,
    opts?: pulumi.CustomResourceOptions,
  );
}
export {};
//# sourceMappingURL=integration.d.ts.map
