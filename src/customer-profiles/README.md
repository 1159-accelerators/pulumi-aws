# Customer Profiles

Amazon Connect Customer Profiles is a unified customer profile for your contact center that has pre-built connectors powered by AppFlow that make it easy to combine customer information from third party applications, such as Salesforce (CRM), ServiceNow (ITSM), and your enterprise resource planning (ERP), with contact history from your Amazon Connect contact center.  
  
For more information about the Amazon Connect Customer Profiles feature, see [Use Customer Profiles](https://docs.aws.amazon.com/connect/latest/adminguide/customer-profiles.html) in the Amazon Connect Administrator's Guide.

## Resources

| Resource | Description |
| --- | --- |
| [Domain](/src/customer-profiles/domain.md) | Creates a domain, which is a container for all customer data, such as customer profile attributes, object types, profile keys, and encryption keys. You can create multiple domains, and each domain can have multiple third-party integrations. Each Amazon Connect instance can be associated with only one domain. Multiple Amazon Connect instances can be associated with one domain. |
| [Integration](/src/customer-profiles/integration.md) | Adds an integration between the service and a third-party service, which includes Amazon AppFlow and Amazon Connect. An integration can belong to only one domain. |
| [ProfileObjectType](/src/customer-profiles/profileObjectType.md) | Defines a ProfileObjectType. |