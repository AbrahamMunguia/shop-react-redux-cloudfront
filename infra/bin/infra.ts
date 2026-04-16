#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DeployWebAppStack } from '../lib/deploy-web-app-stack';
import * as dotenv from 'dotenv';
import * as path from 'path';

const app = new cdk.App();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const account = process.env.AWS_ACCOUNT;
const region = process.env.AWS_REGION;

if (!account || !region) {
  throw new Error("AWS_ACCOUNT_ID or AWS_REGION not found in environment variables");
}

new DeployWebAppStack(app, 'DeployWebAppStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */
  env: { account, region },
});