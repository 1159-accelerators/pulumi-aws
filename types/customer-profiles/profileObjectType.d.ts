import * as pulumi from '@pulumi/pulumi';
export interface ProfileObjectTypeArgs {
    domainName: pulumi.Input<string>;
    objectType: pulumi.Input<string>;
    description: pulumi.Input<string>;
    templateId?: pulumi.Input<string>;
}
export declare class ProfileObjectType extends pulumi.dynamic.Resource {
    readonly domainName: pulumi.Output<string>;
    readonly objectType: pulumi.Output<string>;
    readonly description: pulumi.Output<string>;
    readonly templateId: pulumi.Output<string>;
    constructor(name: string, args: ProfileObjectTypeArgs, opts?: pulumi.CustomResourceOptions);
}
//# sourceMappingURL=profileObjectType.d.ts.map