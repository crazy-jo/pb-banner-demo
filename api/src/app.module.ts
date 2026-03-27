import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public', // The URL prefix to access the static files
    }),
  ],
  controllers: [BannerController],
  providers: [BannerService],
})
export class AppModule {}
