import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const R2 = new S3Client({
  region: 'auto',
  endpoint: `https://${import.meta.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: import.meta.env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.CLOUDFLARE_SECRET_ACCESS_KEY
  }
});

export async function generatePresignedUrl(key, expiresIn = 3600) {
  const command = new GetObjectCommand({
    Bucket: 'acarquitectura',
    Key: key
  });

  return await getSignedUrl(R2, command, { expiresIn });
}