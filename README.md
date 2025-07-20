# DevOps Engineer Coding Challenge

This project implements a reusable AWS CDK Construct for provisioning a secure S3 bucket and a GitHub Actions CI/CD workflow for deployment.

## Project Structure
- `lib/secure-bucket.ts`: Reusable CDK construct for creating an S3 bucket with versioning, encryption, and GitHub OIDC role.
- `bin/app.ts`: CDK app entry point.
- `test/secure-bucket.test.ts`: Unit tests for the construct.
- `.github/workflows/deploy.yml`: GitHub Actions workflow for CI/CD.
- `cdk.json`: CDK configuration file.
- `package.json`: Node.js dependencies and scripts.

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure AWS Credentials**
   - Set up AWS CLI with your credentials or use GitHub OIDC for authentication.
   - Update `cdk.json` with your AWS account ID and region.

4. **Configure GitHub OIDC**
   - Create an OIDC provider in AWS IAM for GitHub Actions.
   - Update the `role-to-assume` ARN in `.github/workflows/deploy.yml` with your OIDC role ARN.

5. **Run Tests**
   ```bash
   npm test
   ```

6. **Synthesize and Deploy**
   ```bash
   npm run cdk synth
   npm run cdk deploy
   ```

## GitHub Actions Workflow
- Located in `.github/workflows/deploy.yml`.
- Steps:
  1. Installs dependencies.
  2. Runs unit tests using Jest.
  3. Synthesizes and deploys the CDK stack to a dev environment.
  4. Uses GitHub OIDC for secure AWS authentication.

## Bonus Features (Optional)
- Supports multiple environments (dev, prod) with a manual approval step for prod.
- Validates stack changes using `cdk diff`.
- Includes linting/formatting with ESLint or Prettier.

## Usage
To use the `SecureBucket` construct in your CDK app:

```typescript
import { SecureBucket } from '../lib/secure-bucket';

new SecureBucket(this, 'MyBucket', {
  projectId: 'abc123',
  enableVersioning: true,
  enableEncryption: true,
  githubRepo: 'myorg/myrepo'
});
```

## Requirements
- Node.js >= 16.x
- AWS CDK >= 2.x
- AWS CLI (for local deployment)
- GitHub Actions configured with OIDC for AWS

## Evaluation Criteria
- Code clarity and adherence to CDK best practices.
- Secure and correct CI/CD workflow with OIDC.
- Reusable and tested CDK construct.
- (Bonus) Environment separation, testing, and approval workflows.
