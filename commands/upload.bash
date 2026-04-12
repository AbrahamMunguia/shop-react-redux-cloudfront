aws s3 sync dist/ s3://YOUR_BUCKET_NAME --delete

aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"