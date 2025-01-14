import * as pulumi from '@pulumi/pulumi';
export interface PhoneNumberContactFlowArgs {
    phoneNumberId: pulumi.Input<string>;
    instanceId: pulumi.Input<string>;
    contactFlowId: pulumi.Input<string>;
}
export declare class PhoneNumberContactFlow extends pulumi.dynamic.Resource {
    readonly phoneNumberId: pulumi.Output<string>;
    readonly instanceId: pulumi.Output<string>;
    readonly contactFlowId: pulumi.Output<string>;
    constructor(name: string, args: PhoneNumberContactFlowArgs, opts?: pulumi.CustomResourceOptions);
}
//# sourceMappingURL=phoneNumberContactFlow.d.ts.map