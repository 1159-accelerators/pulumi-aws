import * as pulumi from '@pulumi/pulumi';
export interface IntegrationArgs {
  domainName: pulumi.Input<string>;
  objectTypeName?: pulumi.Input<string>;
  uri: pulumi.Input<string>;
}
export declare class Integration extends pulumi.dynamic.Resource {
  readonly domainName: pulumi.Output<string>;
  readonly objectTypeName: pulumi.Output<string>;
  readonly uri: pulumi.Output<string>;
  constructor(
    name: string,
    args: IntegrationArgs,
    opts?: pulumi.CustomResourceOptions,
  );
}
//# sourceMappingURL=integration.d.ts.map
