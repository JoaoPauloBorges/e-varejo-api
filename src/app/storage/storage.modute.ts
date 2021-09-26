import { Module } from '@nestjs/common';
import { GoogleBucketService } from './googleBucket.service';

@Module({
  providers: [GoogleBucketService],
  exports: [GoogleBucketService],
})
export class StorageModule {}
