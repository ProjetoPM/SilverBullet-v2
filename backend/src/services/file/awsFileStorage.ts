import { getConfig } from '../../config';
import { v4 } from 'uuid';
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

  static async saveFileS3(file: File, fileKey: string) {
    const s3Params = {
      Bucket: getConfig().WEEKLY_REPORT_BUCKET,
      Key: fileKey,
      Body: file,
      ContentType: '',
      ContentEncoding: '',
    };


    if (file.type === 'pdf') {
      s3Params.ContentType = 'application/pdf';
      s3Params.ContentEncoding = 'binary';
    }

    return await this.create(s3Params);
  }


}
