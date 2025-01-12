import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import { fromEnv, fromIni } from '@aws-sdk/credential-providers';

export function clientConfig() {
  let credentialValue;
  if (aws.config.accessKey && aws.config.secretKey) {
    credentialValue = {
      accessKeyId: aws.config.accessKey,
      secretAccessKey: aws.config.secretKey,
      sessionToken: aws.config.token,
    };
  } else if (aws.config.profile) {
    credentialValue = fromIni({ profile: aws.config.profile });
  } else if (
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY
  ) {
    credentialValue = fromEnv();
  } else if (process.env.AWS_PROFILE) {
    credentialValue = fromIni({ profile: process.env.AWS_PROFILE });
  } else {
    credentialValue = fromIni();
  }

  return {
    region:
      aws.config.region ||
      process.env.AWS_REGION ||
      process.env.AWS_DEFAULT_REGION,
    credential: credentialValue,
  };
}
