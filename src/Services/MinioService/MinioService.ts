import { BadRequestException, Injectable } from "@nestjs/common";
import { BufferedFile } from "src/Models/File/FileModel";
import { S3Service } from "./S3Service";
import * as crypto from 'crypto';
import MinioPutObjectResponse from "src/Models/Response/MinioPutObjectResponse";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MinioService {
    private bucketName: string;

    constructor(
        private readonly _s3Service: S3Service,
        private readonly configService: ConfigService
    ) {
        this.bucketName = this.configService.get<string>('MINIOBUCKET');
        this._s3Service.setBucketPolicy(
            this.bucketName,
            this.setPolicy()
        );
    }

    async upload(file: BufferedFile): Promise<MinioPutObjectResponse> {
        if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
            throw new BadRequestException('File type not supported');
        }
        const timestamp = Date.now().toString();
        const hashedFileName = crypto.createHash('md5').update(timestamp).digest('hex');
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        const metaData = { 'Content-Type': file.mimetype };
        const fileName = hashedFileName + extension;
        this._s3Service.putObject(this.bucketName, fileName, file.buffer, metaData);
        return new MinioPutObjectResponse(`https://${process.env.MINIO_ENDPOINT}/${this.bucketName}/${fileName}`)
    }

    private setPolicy(): string {
        const MinioPolicyConstant = {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: [
                        's3:ListBucketMultipartUploads',
                        's3:GetBucketLocation',
                        's3:ListBucket',
                    ],
                    Resource: [`arn:aws:s3:::${this.bucketName}`],
                },
                {
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: [
                        's3:PutObject',
                        's3:AbortMultipartUpload',
                        's3:DeleteObject',
                        's3:GetObject',
                        's3:ListMultipartUploadParts',
                    ],
                    Resource: [`arn:aws:s3:::${this.bucketName}/*`],
                },
            ],
        };
        return JSON.stringify(MinioPolicyConstant);
    }

}