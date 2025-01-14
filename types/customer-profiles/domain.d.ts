import * as pulumi from '@pulumi/pulumi';
export interface DomainArgs {
    domainName: pulumi.Input<string>;
    defaultEncryptionKey?: pulumi.Input<string>;
    defaultExpirationDays?: pulumi.Input<number>;
}
export declare class Domain extends pulumi.dynamic.Resource {
    readonly domainName: pulumi.Output<string>;
    readonly defaultEncryptionKey: pulumi.Output<string>;
    readonly defaultExpirationDays: pulumi.Output<number>;
    constructor(name: string, args: DomainArgs, opts?: pulumi.CustomResourceOptions);
}
//# sourceMappingURL=domain.d.ts.map