# React + Vite — AWS S3 & CloudFront Deployment with CDK

This project is a React application built with Vite, deployed to AWS S3 and served via CloudFront using the AWS CDK.

---

## Required Versions

| Package | Version |
|---|---|
| `react` | `^18.2.0` |
| `typescript` | `^4.7.4` |
| `dotenv` | `^17.4.1` |
| `node` | `>= 18.x` |
| `aws-cdk` (CLI) | Latest |

---

## Prerequisites

Make sure the following are installed on your machine before getting started:

- [Node.js](https://nodejs.org/) `>= 18.x`
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- AWS CDK CLI:
  ```bash
  npm install -g aws-cdk
  ```

---

## Environment Setup

Create a `.env` file at the **root of the project** with your AWS credentials:

```env
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_ACCOUNT=your_aws_account_id
AWS_REGION=us-east-1
```

> **Where to find these values:**
> - Go to **AWS Console → IAM → Users → Your User → Security credentials**
> - Click **Create access key** → choose **CLI** → copy the values
> - Your Account ID is found in the **top-right corner** of the AWS Console

> ⚠️ **Never commit `.env` to version control.** Make sure `.env` is listed in your `.gitignore`.

```bash
echo ".env" >> .gitignore
```

---

## Installation

Install all project dependencies:

```bash
npm install
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run start` | Start local development server |
| `npm run build` | Type-check and build the app for production |
| `npm run cdk:synth` | Synthesize the CDK CloudFormation template |
| `npm run cdk:bootstrap` | Bootstrap the CDK toolkit in your AWS account/region |
| `npm run cdk:deploy` | Deploy the CDK stack (S3 + CloudFront) |
| `npm run deploy:first` | **First-time full deploy**: build + bootstrap + deploy |
| `npm run deploy` | **Subsequent deploys**: build + deploy (skips bootstrap) |

---

## First-Time Deployment

Run this command once to build the app, bootstrap CDK in your AWS account, and deploy the infrastructure:

```bash
npm run deploy:first
```

This will:
1. Build the React app (`tsc && vite build`)
2. Bootstrap the CDK toolkit in your AWS account and region
3. Deploy the S3 bucket and CloudFront distribution via CDK

After deployment, CDK will print your:
- **BucketName** — the S3 bucket where your app is hosted
- **DistributionId** — your CloudFront distribution ID
- **CloudFrontURL** — the public URL of your application

> After the first deploy, upload your build to S3 and create a CloudFront invalidation manually:
>
> ```bash
> aws s3 sync dist/ s3://YOUR_BUCKET_NAME --delete
>
> aws cloudfront create-invalidation \
>   --distribution-id YOUR_DISTRIBUTION_ID \
>   --paths "/*"
> ```

---

## Subsequent Deployments

For any future infrastructure or code changes, run:

```bash
npm run deploy
```

This skips the bootstrap step (only needed once per AWS account/region).

---

## Destroying the Infrastructure

To tear down all AWS resources (S3 bucket and CloudFront distribution):

```bash
cd infra && cdk destroy --force
```

> The S3 bucket is configured with `autoDeleteObjects: true` and `RemovalPolicy.DESTROY`, so all files and the bucket itself will be automatically removed. Nothing will be left behind.

---

## Project Structure

```
your-app/
├── infra/                   # AWS CDK infrastructure
│   ├── bin/
│   │   └── app.ts           # CDK entry point
│   ├── lib/
│   │   └── stack.ts         # S3 + CloudFront stack definition
│   └── cdk.json
├── src/                     # React source code
├── scripts/
│   └── upload-and-invalidate.sh  # Upload + cache invalidation script
├── .env                     # AWS credentials (never commit this)
├── .gitignore
├── package.json
└── vite.config.ts
```

---

## How It Works

- **S3 Bucket** — stores the production build, kept **private** (no public access)
- **CloudFront** — serves the app over HTTPS with Origin Access Control (OAC), handles SPA routing by returning `index.html` on 403/404 errors
- **CDK** — provisions and manages all infrastructure as code
- **dotenv** — loads your `.env` credentials automatically during CDK synth and deploy


> [!NOTE]
URLS Available:
Part 2.1 & 2.2: https://d3d3779215347.cloudfront.net
