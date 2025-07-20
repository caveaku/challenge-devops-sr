
import { Construct } from 'constructs';
import {
  Stack,
  StackProps,
  CfnOutput, // ✅ Add this
  aws_s3 as s3,
  aws_iam as iam,
  aws_kms as kms,
} from 'aws-cdk-lib'; // ✅ Remove duplicate aws_iam import

export interface SecureBucketProps {
  projectId: string;
  enableVersioning?: boolean;
  enableEncryption?: boolean;
  githubRepo?: string;
}

export class SecureBucket extends Stack {
  constructor(scope: Construct, id: string, props: SecureBucketProps & StackProps) {
    super(scope, id, props);

    const bucketProps: s3.BucketProps = {
      bucketName: `${props.projectId}-secure-bucket`,
      versioned: props.enableVersioning,
      encryption: props.enableEncryption ? s3.BucketEncryption.KMS_MANAGED : s3.BucketEncryption.UNENCRYPTED,
    };

    const bucket = new s3.Bucket(this, 'SecureBucket', bucketProps);

    if (props.githubRepo) {
      const oidcProvider = new iam.OpenIdConnectProvider(this, 'OIDCProvider', {
        url: 'https://token.actions.githubusercontent.com',
        clientIds: ['sts.amazonaws.com']
      });

      const role = new iam.Role(this, 'GithubOIDCRole', {
        assumedBy: new iam.WebIdentityPrincipal(
          oidcProvider.openIdConnectProviderArn,
          {
            "StringLike": {
              "token.actions.githubusercontent.com:sub": `repo:${props.githubRepo}:*`
            }
          }
        ),
        description: 'GitHub Actions OIDC Role',
      });

      bucket.grantReadWrite(role);

      new CfnOutput(this, 'OIDCRoleArn', {
        value: role.roleArn
      });
    }

    new CfnOutput(this, 'BucketName', {
      value: bucket.bucketName
    });
  }
}
