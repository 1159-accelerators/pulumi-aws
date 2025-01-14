import * as pulumi from '@pulumi/pulumi';
export interface DomainArgs {
    name: pulumi.Input<string>;
}
export declare class Domain extends pulumi.dynamic.Resource {
    readonly domainArn: pulumi.Output<string>;
    readonly domainId: pulumi.Output<string>;
    readonly domainStatus: pulumi.Output<string>;
    readonly name: pulumi.Output<string>;
    constructor(name: string, args: DomainArgs, opts?: pulumi.CustomResourceOptions);
}
//# sourceMappingURL=domain.d.ts.map