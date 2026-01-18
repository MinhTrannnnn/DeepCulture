import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

export class S3Storage {
    private client: S3Client;
    private bucket: string;
    private region: string;

    constructor() {
        this.region = process.env.AWS_REGION || 'ap-southeast-1';
        this.bucket = process.env.AWS_BUCKET_NAME || '';

        this.client = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
            }
        });
    }

    async uploadImage(file: Express.Multer.File, folder: string = 'images'): Promise<{
        url: string;
        key: string;
        width: number;
        height: number;
        fileSize: number;
        mimeType: string;
    }> {
        // Resize và compress với Sharp
        const resized = await sharp(file.buffer)
            .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 80 })
            .toBuffer();

        const metadata = await sharp(resized).metadata();

        const key = `${folder}/${uuidv4()}.webp`;

        await this.client.send(new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: resized,
            ContentType: 'image/webp'
            // Note: Use Bucket Policy for public access instead of ACL
        }));

        return {
            url: `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`,
            key,
            width: metadata.width || 0,
            height: metadata.height || 0,
            fileSize: resized.length,
            mimeType: 'image/webp'
        };
    }

    async deleteFile(key: string): Promise<void> {
        await this.client.send(new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key
        }));
    }
}