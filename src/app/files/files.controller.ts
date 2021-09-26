import { Controller, Post, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@Controller('files')
@ApiTags('Upload de Imagens')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product/:idProduct')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('idProduct') idProduct: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    console.log(file);
    return this.filesService.create(+idProduct, file);
  }

  @Delete()
  async deleteFile(@Query('filename') filename: string) {
    return this.filesService.remove([filename])
  }
}
