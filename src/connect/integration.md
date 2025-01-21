# Integration

Creates an Amazon Web Services resource association with an Amazon Connect instance.

## Example Usage

```ts
import * as elevenfiftynine_aws from '@elevenfiftynine/pulumi-aws';

const connectCasesIntegration = new elevenfiftynine_aws.connect.Integration(
  "connect-cases-integration",
  {
    instanceId: connectInstance.id,
    integrationArn: casesDomain.domainArn,
    integrationType: "CASES_DOMAIN",
  },
);
```

## Properties

### Inputs

| Name | Type | Description |
| --- | --- | --- |
| **instanceId** | string | The identifier of the Amazon Connect instance. |
| **integrationArn** | string | The Amazon Resource Name (ARN) of the integration. When integrating with Amazon Web Services End User Messaging, the Amazon Connect and Amazon Web Services End User Messaging instances must be in the same account. |
| **integrationType** | [IntegrationType](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-connect/Variable/IntegrationType/) | The type of information to be ingested. |

### Outputs

All **input** properties are implicitly available as output properties. Additionally, the Integration resource produces the following output properties:
| Name | Type | Description |
| --- | --- | --- |
| **integrationAssociationArn** | string &#124; undefined | The Amazon Resource Name (ARN) for the association. |
| **integrationAssociationId** | string &#124; undefined | The identifier for the integration association. |
