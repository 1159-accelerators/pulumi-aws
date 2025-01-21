# Phone Number Contact Flow

Associates a flow with a phone number claimed to your Amazon Connect instance.  
  
If the number is claimed to a traffic distribution group, and you are calling this API using an instance in the Amazon Web Services Region where the traffic distribution group was created, you can use either a full phone number ARN or UUID value for the `PhoneNumberId` URI request parameter. However, if the number is claimed to a traffic distribution group and you are calling this API using an instance in the alternate Amazon Web Services Region associated with the traffic distribution group, you must provide a full phone number ARN. If a UUID is provided in this scenario, you will receive a `ResourceNotFoundException`.

## Example Usage

```ts
import * as elevenfiftynine_aws from '@elevenfiftynine/pulumi-aws';

new elevenfiftynine_aws.connect.PhoneNumberContactFlow(
  "main-number-associate",
  {
    instanceId: connectInstance.id,
    phoneNumberId: mainPhoneNumber.id,
    contactFlowId: mainInboundFlow.contactFlowId,
  },
);
```

## Properties

### Inputs

| Name | Type | Description |
| --- | --- | --- |
| **contactFlowId** | string | The identifier of the flow. |
| **instanceId** | string | The identifier of the Amazon Connect instance.  |
| **phoneNumberId** | string | A unique identifier for the phone number. |

### Outputs

All **input** properties are implicitly available as output properties.
