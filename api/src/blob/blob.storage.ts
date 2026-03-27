import { join } from 'path';
import { writeFile, unlink } from 'fs/promises';

const { BLOB_FOLDER = 'public' } = process.env;

export class BlobStorage {
  public async storeFile(params: {
    b64Data: string;
    fileName: string;
  }): Promise<string> {
    const { b64Data, fileName } = params;
    const buffer = Buffer.from(b64Data, 'base64');
    const filePath = join(BLOB_FOLDER, fileName);
    await writeFile(join(process.cwd(), filePath), buffer);
    return filePath;
  }

  public async deleteFile(filePath: string): Promise<void> {
    await unlink(join(process.cwd(), filePath));
  }
}
