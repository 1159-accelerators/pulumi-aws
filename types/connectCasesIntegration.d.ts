import * as pulumi from '@pulumi/pulumi';
export interface ConnectCasesIntegrationArgs {
  instanceId: pulumi.Input<string>;
  domainArn: pulumi.Input<string>;
}
export declare class ConnectCasesIntegration extends pulumi.dynamic.Resource {
  readonly instanceId: pulumi.Output<string>;
  readonly domainArn: pulumi.Output<string>;
  readonly integrationAssociationId: pulumi.Output<string>;
  readonly integrationAssociationArn: pulumi.Output<string>;
  constructor(
    name: string,
    args: ConnectCasesIntegrationArgs,
    opts?: pulumi.CustomResourceOptions,
  );
}
//# sourceMappingURL=connectCasesIntegration.d.ts.map
