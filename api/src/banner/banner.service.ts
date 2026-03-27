import { Injectable } from '@nestjs/common';

import { BlobStorage } from '../blob/blob.storage';
import type {
  Banner,
  UpdateBannerDto,
  CreateBannerDto,
  BannerImage,
} from './banner.model';

const { HOST_URL, BLOB_FOLDER } = process.env;

const banners: Banner[] = [
  {
    id: 1,
    name: 'Hamburger',
    description: 'Very delicious hamburger',
    imageUrl: `${HOST_URL}/${BLOB_FOLDER}/hamburger.jpg`,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'Pizza',
    description: 'Very tasty pizza',
    imageUrl: `${HOST_URL}/${BLOB_FOLDER}/pizza.jpg`,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
];

@Injectable()
export class BannerService {
  constructor(private readonly blobStorage: BlobStorage) {}

  public getBanners(): Banner[] {
    return banners;
  }

  public getBannerById(id: number): Banner | undefined {
    return banners.find((banner) => banner.id === id);
  }

  public async deleteBanner(id: number): Promise<void> {
    const index = banners.findIndex((banner) => banner.id === id);
    if (index !== -1) {
      const currentBanner = banners[index];
      const imgPath = new URL(currentBanner.imageUrl).pathname;
      await this.blobStorage.deleteFile(imgPath);
      banners.splice(index, 1);
    }
  }

  public async updateBanner(
    id: number,
    newBanner: UpdateBannerDto,
  ): Promise<void> {
    const index = banners.findIndex((banner) => banner.id === id);
    if (index !== -1) {
      const currentBanner = banners[index];
      let imageUrl = currentBanner.imageUrl;
      if (newBanner.imageData) {
        const oldImgPath = new URL(currentBanner.imageUrl).pathname;
        await this.blobStorage.deleteFile(oldImgPath);
        imageUrl = await this.saveFile(id, newBanner.imageData);
      }

      banners[index] = {
        ...currentBanner,
        ...newBanner,
        imageUrl,
        updatedAt: new Date(),
      };
    }
  }

  public async createBanner(bannerDto: CreateBannerDto): Promise<Banner> {
    const newId = Date.now();
    const { imageData, ...banner } = bannerDto;
    const imageUrl = await this.saveFile(newId, imageData);
    const newBanner: Banner = {
      ...banner,
      id: newId,
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    banners.push(newBanner);
    return newBanner;
  }

  private async saveFile(id: number, imageData: BannerImage): Promise<string> {
    const fileExtension = imageData.fileName.split('.').pop();
    const fileName = `${id}.${fileExtension}`;
    const filePath = await this.blobStorage.storeFile({
      b64Data: imageData.b64Data,
      fileName,
    });
    return `${HOST_URL}/${filePath}`;
  }
}
