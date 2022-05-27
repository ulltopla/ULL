import {Injectable} from '@nestjs/common';
import {Storage} from '@google-cloud/storage'
import {JwtUser, MinimalFile} from "@ull/api-interfaces";
import {v4 as uuidv4} from 'uuid';

const BUCKET_NAME = 'ulltopla'

@Injectable()
export class StorageService {
  storage = new Storage()


  async upload(file: MinimalFile, user: JwtUser): Promise<string> {
    const fileName = `${user.userType}/${user.id}/${uuidv4()}-${file.originalname}`
    await this.storage
      .bucket(BUCKET_NAME)
      .file(fileName)
      .save(file.buffer)
    return fileName
  }

  async delete(fileName: string, user: JwtUser): Promise<void> {
    await this.storage
      .bucket(BUCKET_NAME)
      .file(`${user.userType}/${user.id}/${fileName}`)
      .delete()
  }
}
