// api/r2.js
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

let R2;

export async function initR2() {
  if (!R2) {
    R2 = new S3Client({
      region: 'auto',
      endpoint: `https://${import.meta.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: import.meta.env.CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.CLOUDFLARE_SECRET_ACCESS_KEY
      }
    });
  }
  return R2;
}

export async function generatePresignedUrl(key, expiresIn = 600) { // 10 minutos
  try {
    await initR2();
    const command = new GetObjectCommand({
      Bucket: 'acarquitectura',
      Key: key
    });
    
    return await getSignedUrl(R2, command, { 
      expiresIn,
      signableHeaders: new Set(['Range']) 
    });
  } catch (error) {
    console.error('Error generando URL:', error);
    throw new Error('No se pudo cargar el recurso');
  }
}