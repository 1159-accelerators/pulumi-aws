# Field

Creates a field in the Cases domain. This field is used to define the case object model (that is, defines what data can be captured on cases) in a Cases domain.

## Example Usage

```ts
import * as elevenfiftynine_aws from '@elevenfiftynine/pulumi-aws';

const acknowledgedField = new elevenfiftynine_aws.connectcases.Field(
  'acknowledged-field',
  {
    name: 'acknowledged',
    domainId: casesDomain.id,
    type: 'BOOLEAN',
    description: 'Mark once the agent has ackowledged the case',
  },
);
```

## Properties

### Inputs

| Name | Type | Description |
| --- | --- | --- |
| **domainId** | string | The unique identifier of the Cases domain. |
| **name** | string | The name of the field. |
| **type** | [FieldType](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-connectcases/Variable/FieldType/) | Defines the data type, some system constraints, and default display of the field. |
| **description** `optional` | string &#124; undefined | The description of the field. |

### Outputs

All **input** properties are implicitly available as output properties. Additionally, the Field resource produces the following output properties:
| Name | Type | Description |
| --- | --- | --- |
| **fieldArn** | string &#124; undefined | The Amazon Resource Name (ARN) of the field. |
| **fieldId** | string &#124; undefined | The unique identifier of a field. |
