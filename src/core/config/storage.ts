import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "./env";

export const s3 = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

const bucket = env.AWS_BUCKET_NAME;
const customDomain = `${bucket}.s3.amazonaws.com`;

// Subir archivo
export async function uploadFile(key: string, body: Buffer, contentType: string) {
  const command = new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType });
  await s3.send(command);
  return `https://${customDomain}/${key}`;
}

// URL firmada temporal
export async function getFileUrl(key: string, expiresIn = 3600) {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(s3, command, { expiresIn });
}

// Eliminar archivo
export async function deleteFile(key: string) {
  const command = new DeleteObjectCommand({ Bucket: bucket, Key: key });
  return s3.send(command);
}
