import { Controller, Post, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@Controller('files')
@ApiTags('Upload de Imagens')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFileArbitrary(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Post('product/:idProduct')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Param('idProduct') idProduct: number, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.filesService.create(+idProduct, file);
  }
}
