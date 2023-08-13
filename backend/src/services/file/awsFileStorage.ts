import { getConfig } from '../../config';
import { IFile } from '../../interfaces';
import {
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: getConfig().AWS_REGION,
  credentials: {
    accessKeyId: getConfig().AWS_ACCESS_KEY_ID,
    secretAccessKey: getConfig().AWS_SECRET_ACCESS_KEY,
  },
});

export default class AWSStorage {
  /**
   * Creates a signed upload URL that enables
   * the frontend to upload directly to S3 in a
   * secure way
   */

  static async create(receiveParams: any) {
    try {
      await s3.send(new PutObjectCommand(receiveParams));
      return true;
    } catch (err) {
      console.log('Error', err);
      return false;
    }
  }

  static async saveFileS3(
    file: File,
    fileNameKey: string,
    extension: string,
  ) {
    
    const s3Params = {
      Bucket: process.env.Bucket,
      Key: fileNameKey,
      Body: file,
      ContentType: '',
      ContentEncoding: '',
    };

    if (extension === 'pdf') {
      s3Params.ContentType = 'application/pdf';
      s3Params.ContentEncoding = 'binary';
    }

    return await this.create(s3Params);
  }
}
