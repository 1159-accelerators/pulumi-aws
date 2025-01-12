import * as pulumi from '@pulumi/pulumi';
export interface CasesDomainArgs {
    name: pulumi.Input<string>;
    instanceId: pulumi.Input<string>;
}
export declare class CasesDomain extends pulumi.dynamic.Resource {
    readonly domainArn: pulumi.Output<string>;
    readonly domainId: pulumi.Output<string>;
    readonly domainStatus: pulumi.Output<string>;
    constructor(name: string, args: CasesDomainArgs, opts?: pulumi.CustomResourceOptions);
}
//# sourceMappingURL=casesDomain.d.ts.map