import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TagModule } from 'src/tag/tag.module';
import { CatController } from './cat.controller';
import { CatRepository } from './cat.repository';
import { CatService } from './cat.service';

@Module({
  imports: [TagModule],
  controllers: [CatController],
  providers: [CatService, PrismaService, CatRepository],
})
export class CatModule {}
