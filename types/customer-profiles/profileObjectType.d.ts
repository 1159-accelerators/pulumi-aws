import * as pulumi from '@pulumi/pulumi';
export interface ProfileObjectTypeArgs {
  domainName: pulumi.Input<string>;
  objectTypeName: pulumi.Input<string>;
  description: pulumi.Input<string>;
  templateId?: pulumi.Input<string>;
}
export declare class ProfileObjectType extends pulumi.dynamic.Resource {
  readonly domainName: pulumi.Output<string>;
  readonly objectTypeName: pulumi.Output<string>;
  readonly description: pulumi.Output<string>;
  readonly templateId: pulumi.Output<string>;
  constructor(
    name: string,
    args: ProfileObjectTypeArgs,
    opts?: pulumi.CustomResourceOptions,
  );
}
//# sourceMappingURL=profileObjectType.d.ts.map
