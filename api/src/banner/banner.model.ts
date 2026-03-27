import {
  number as zNumber,
  string as zString,
  date as zDate,
  object as zObject,
  infer as zInfer,
} from 'zod';

export const bannerSchema = zObject({
  id: zNumber(),
  name: zString(),
  description: zString(),
  imageUrl: zString(),
  updatedAt: zDate(),
  createdAt: zDate(),
});

export const bannerImageSchema = zObject({
  b64Data: zString(),
  fileName: zString(),
});

export const createBannerDtoSchema = zObject({
  name: zString(),
  description: zString(),
  imageData: bannerImageSchema,
});

export const updateBannerDtoSchema = zObject({
  name: zString().optional(),
  description: zString().optional(),
  imageData: bannerImageSchema.optional(),
});

export type Banner = zInfer<typeof bannerSchema>;
export type BannerImage = zInfer<typeof bannerImageSchema>;
export type CreateBannerDto = zInfer<typeof createBannerDtoSchema>;
export type UpdateBannerDto = zInfer<typeof updateBannerDtoSchema>;
