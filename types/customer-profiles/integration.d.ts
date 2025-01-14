import * as pulumi from '@pulumi/pulumi';
export interface IntegrationArgs {
    domainName: pulumi.Input<string>;
    objectTypeName?: pulumi.Input<string>;
    uri: pulumi.Input<string>;
}
export declare class Integration extends pulumi.dynamic.Resource {
    constructor(name: string, args: IntegrationArgs, opts?: pulumi.CustomResourceOptions);
}
//# sourceMappingURL=integration.d.ts.map