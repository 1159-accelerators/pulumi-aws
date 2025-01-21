# Connect

Amazon Connect is a cloud-based contact center solution that you use to set up and manage a customer contact center and provide reliable customer engagement at any scale. Amazon Connect provides metrics and real-time reporting that enable you to optimize contact routing. You can also resolve customer issues more efficiently by getting customers in touch with the appropriate agents.

## Resources

| Resource | Description |
| --- | --- |
| [Integration](/src/connect/integration.md) | Creates an Amazon Web Services resource association with an Amazon Connect instance. |
| [PhoneNumberContactFlow](/src/connect/phoneNumberContactFlow.md)   | Associates a flow with a phone number claimed to your Amazon Connect instance. If the number is claimed to a traffic distribution group, and you are calling this API using an instance in the Amazon Web Services Region where the traffic distribution group was created, you can use either a full phone number ARN or UUID value for the `PhoneNumberId` URI request parameter. However, if the number is claimed to a traffic distribution group and you are calling this API using an instance in the alternate Amazon Web Services Region associated with the traffic distribution group, you must provide a full phone number ARN. If a UUID is provided in this scenario, you will receive a `ResourceNotFoundException`. |
