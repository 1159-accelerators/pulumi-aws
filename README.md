# 11:59 AWS Pulumi

A collection of custom components created by [11:59](https://1159.ai) for items not covered by existing Pulumi providers. Most components use the [AWS SDK for JavaScript (V3)](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/) under the hood, and have been created using Pulumi's [Dynamic Resource Provider](https://www.pulumi.com/docs/iac/concepts/resources/dynamic-providers/) construct.

## Installation

#### NPM
`npm install @elevenfiftynine/pulumi-aws`

#### Yarn
`yarn add @elevenfiftynine/pulumi-aws`

## Services

| Service | Description
| --- | --- |
| [Connect](/src/connect/) | Amazon Connect is a cloud-based contact center solution that you use to set up and manage a customer contact center and provide reliable customer engagement at any scale. Amazon Connect provides metrics and real-time reporting that enable you to optimize contact routing. You can also resolve customer issues more efficiently by getting customers in touch with the appropriate agents. |
| [Connect Cases](/src/connectcases/) | With Amazon Connect Cases, your agents can track and manage customer issues that require multiple interactions, follow-up tasks, and teams in your contact center. A case represents a customer issue. It records the issue, the steps and interactions taken to resolve the issue, and the outcome. For more information, see [Amazon Connect Cases](https://docs.aws.amazon.com/connect/latest/adminguide/cases.html) in the Amazon Connect Administrator Guide. |
| [Customer Profiles](/src/customer-profiles/) | Amazon Connect Customer Profiles is a unified customer profile for your contact center that has pre-built connectors powered by AppFlow that make it easy to combine customer information from third party applications, such as Salesforce (CRM), ServiceNow (ITSM), and your enterprise resource planning (ERP), with contact history from your Amazon Connect contact center. For more information about the Amazon Connect Customer Profiles feature, see [Use Customer Profiles](https://docs.aws.amazon.com/connect/latest/adminguide/customer-profiles.html) in the Amazon Connect Administrator's Guide. |
