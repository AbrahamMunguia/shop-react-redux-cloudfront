// Filename: hello-lambda-stack.ts
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as path from 'path';
import { Construct } from 'constructs';
import * as lambdaNode from 'aws-cdk-lib/aws-lambda-nodejs';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const account = process.env.AWS_ACCOUNT;
const region = process.env.AWS_REGION;
const frontendURL = process.env.FRONTEND_URL;
if (!account || !region) {
    throw new Error("AWS_ACCOUNT_ID or AWS_REGION not found in environment variables");
}
if (!frontendURL) {
    throw new Error("FRONTEND_URL not found in environment variables");
}
export class HelloLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const lambdaFunction = new lambdaNode.NodejsFunction(this, 'lambda-function', {
            runtime: lambda.Runtime.NODEJS_20_X,
            memorySize: 1024,
            timeout: cdk.Duration.seconds(5),
            entry: path.join(__dirname, './handler.ts'),
            handler: 'main',
        });
        const api = new apigateway.RestApi(this, "my-api", {
            restApiName: "My API Gateway",
            description: "This API serves the Lambda functions."
        });
        const helloFromLambdaIntegration = new apigateway.LambdaIntegration(lambdaFunction, {
            requestTemplates: {
                "application/json":
                    `{ "message": "$input.params('message')" }` // Map the query param message
            },
            integrationResponses: [
                {
                    statusCode: '200',
                }
            ],
            proxy: false,
        });
        // Create a resource /hello and GET request under it
        const helloResource = api.root.addResource("hello");
        // On this resource attach a GET method which pass reuest to our Lambda function
        helloResource.addMethod('GET', helloFromLambdaIntegration, {
            methodResponses: [{ statusCode: '200' }]
        });
        helloResource.addCorsPreflight({
            allowOrigins: [`https://${frontendURL}`],
            allowMethods: ['GET'],
        });
    }
}