#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { SecureBucket } from '../lib/secure-bucket';

const app = new App();

new SecureBucket(app, 'SecureBucketStack', {
  projectId: 'abc123',
  enableVersioning: true,
  enableEncryption: true,
  githubRepo: 'caveaku/sr-devops-challange',
  env: {
    region: 'us-east-1'
  }
});
