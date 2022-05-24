import { ConfigService } from "@nestjs/config";

export default class MinioPolicyConstants {
    public static policy: string;

    constructor(private configService: ConfigService) {
        MinioPolicyConstants.policy = this.getPolicy();
    }

    private getPolicy(): string {
        const bucket = this.configService.get<string>('MINIOBUCKET');
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
                    Resource: [`arn:aws:s3:::${bucket}`],
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
                    Resource: [`arn:aws:s3:::${bucket}/*`],
                },
            ],
        };
        return JSON.stringify(MinioPolicyConstant);
    }
}
