import { Inject } from '@nestjs/common';
import { Client } from 'minio';
import { MINIO_CONNECTION } from 'nestjs-minio';

export class S3Service {
    constructor(@Inject(MINIO_CONNECTION) private readonly _minioClient: Client) { }

    async putObject(bucket: string, file: string, data: any, metaData: any): Promise<any> {
        return this._minioClient.putObject(bucket, file, data, metaData);
    }

    async setBucketPolicy(bucket: string, policy: any): Promise<any> {
        return this._minioClient.setBucketPolicy(bucket, policy);
    }
}