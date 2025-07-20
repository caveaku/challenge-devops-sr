import { Template } from 'aws-cdk-lib/assertions';
import { App } from 'aws-cdk-lib';
import { SecureBucket } from '../lib/secure-bucket';

test('S3 Bucket Created', () => {
  const app = new App();

  const stack = new SecureBucket(app, 'TestStack', {
    projectId: 'abc123',
    enableVersioning: true,
    enableEncryption: true,
    githubRepo: 'caveaku/sr-devops-challange'
  });

  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::S3::Bucket', 1);
});
