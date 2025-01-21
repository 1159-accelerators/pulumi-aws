# Integration

Adds an integration between the service and a third-party service, which includes Amazon AppFlow and Amazon Connect. An integration can belong to only one domain.

## Example Usage

```ts
import * as elevenfiftynine_aws from '@elevenfiftynine/pulumi-aws';

const connectIntegration = new elevenfiftynine_aws.customerProfiles.Integration(
  'connect-profiles-integration',
  {
    domainName: customerProfilesDomain.domainName,
    uri: connectInstance.arn,
    objectTypeName: defaultProfileTemplate.objectTypeName,
  },
);
```

## Properties

### Inputs

| Name | Type | Description |
| --- | --- | --- |
| **domainName** | string | The unique name of the domain. |
| **uri** | string | The URI of the S3 bucket, Connect instance, or any other type of data source. |
| **objectTypeName** `optional` | string &#124; undefined | The name of the profile object type. |

### Outputs

All **input** properties are implicitly available as output properties.
