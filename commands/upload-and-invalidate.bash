#!/bin/bash
set -e

# Read CDK outputs
STACK_OUTPUT=$(aws cloudformation describe-stacks \
  --stack-name FrontendStack \
  --query "Stacks[0].Outputs" \
  --output json)

BUCKET=$(echo $STACK_OUTPUT | node -e \
  "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
   console.log(d.find(o=>o.OutputKey==='BucketName').OutputValue)")

DIST_ID=$(echo $STACK_OUTPUT | node -e \
  "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
   console.log(d.find(o=>o.OutputKey==='DistributionId').OutputValue)")

echo "→ Syncing to s3://$BUCKET"
aws s3 sync dist/ s3://$BUCKET --delete

echo "→ Invalidating CloudFront: $DIST_ID"
aws cloudfront create-invalidation \
  --distribution-id $DIST_ID \
  --paths "/*"

echo "✅ Done! Changes will be live in ~30–60s"