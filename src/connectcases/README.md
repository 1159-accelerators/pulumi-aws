# Connect Cases

With Amazon Connect Cases, your agents can track and manage customer issues that require multiple interactions, follow-up tasks, and teams in your contact center. A case represents a customer issue. It records the issue, the steps and interactions taken to resolve the issue, and the outcome. For more information, see [Amazon Connect Cases](https://docs.aws.amazon.com/connect/latest/adminguide/cases.html) in the Amazon Connect Administrator Guide.

## Resources

| Resource                              | Description                                                                                                                                                                                                                                                                                                |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Domain](/src/connectcases/domain.md) | Creates a domain, which is a container for all case data, such as cases, fields, templates and layouts. Each Amazon Connect instance can be associated with only one Cases domain. This will not associate your connect instance to Cases domain. Instead, use [Integration](/src/connect/integration.md). |
| [Field](/src/connectcases/field.md)   | Creates a field in the Cases domain. This field is used to define the case object model (that is, defines what data can be captured on cases) in a Cases domain.                                                                                                                                           |
