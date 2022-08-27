import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TagRepository } from './tag.repository';
import { TagService } from './tag.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TagService, PrismaService, TagRepository],
  exports: [TagService],
})
export class TagModule {}
