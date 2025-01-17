# Domain

Creates a domain, which is a container for all customer data, such as customer profile attributes, object types, profile keys, and encryption keys. You can create multiple domains, and each domain can have multiple third-party integrations. Each Amazon Connect instance can be associated with only one domain. Multiple Amazon Connect instances can be associated with one domain.

## Example Usage

```ts
import * as elevenfiftynine_aws from '@elevenfiftynine/pulumi-aws';

const profilesDomain = new elevenfiftynine_aws.customerProfiles.Domain(
  'profiles-domain',
  {
    name: 'amazon-connect-accounting-prod',
    defaultEncryptionKey: key.arn,
    defaultExpirationDays: 365,
  },
);
```

## Properties

### Inputs

| Name | Type | Description |
| --- | --- | --- |
| **name** | string | The unique name of the domain. Should begin with **amazon-connect-** to avoid having to manually adjust permissions. |
| **defaultEncryptionKey** `optional`  | string &#124; undefined | The default encryption key, which is an AWS managed key, is used when no specific type of encryption key is specified. It is used to encrypt all data before it is placed in permanent or semi-permanent storage. |
| **defaultExpirationDays** `optional` | number &#124; undefined | The default number of days until the data within the domain expires. |

### Outputs

All [input](/src/customer-profiles/domain.md#L22) properties are implicitly available as output properties.
