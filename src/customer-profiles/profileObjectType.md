# Profile Object Type

Defines a ProfileObjectType.

## Example Usage

```ts
import * as elevenfiftynine_aws from '@elevenfiftynine/pulumi-aws';

const defaultObjectType = new elevenfiftynine_aws.customerProfiles.ProfileObjectType(
    "default-object-type",
    {
      domainName: customerProfilesDomain.domainName,
      description: "Creates inferred profiles and auto-associates profiles",
      objectTypeName: "CTR",
      templateId: "CTR-NoInferred",
    },
  );
```

## Properties

### Inputs

| Name | Type | Description |
| --- | --- | --- |
| **description** | string | Description of the profile object type. |
| **domainName** | string | The unique name of the domain. |
| **objectTypeName** | string | The name of the profile object type. |
| **templateId** `optional` | string &#124; undefined | A unique identifier for the object template. For some attributes in the request, the service will use the default value from the object template when TemplateId is present. If these attributes are present in the request, the service may return a `BadRequestException`. These attributes include: AllowProfileCreation, SourceLastUpdatedTimestampFormat, Fields, and Keys. For example, if AllowProfileCreation is set to true when TemplateId is set, the service may return a `BadRequestException`. |


### Outputs

All **input** properties are implicitly available as output properties.
