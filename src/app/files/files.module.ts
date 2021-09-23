import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { GoogleBucketService } from './googleBucket.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService, GoogleBucketService],
  exports: [FilesService]
})
export class FilesModule {
}
