import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { BannerController } from './banner/banner.controller';
import { BannerService } from './banner/banner.service';
import { BlobStorage } from './blob/blob.storage';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public', // The URL prefix to access the static files
    }),
  ],
  controllers: [BannerController],
  providers: [BannerService, BlobStorage],
})
export class AppModule {}
