export interface BannerImage {
  b64Data: string;
  fileName: string;
}

export interface Banner {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  updatedAt: string;
  createdAt: string;
}

export interface CreateBannerDto {
  name: string;
  description: string;
  imageData: BannerImage;
}

export interface UpdateBannerDto {
  name?: string;
  description?: string;
  imageData?: BannerImage;
}
