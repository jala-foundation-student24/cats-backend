import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTag } from './tag.interfaces.dto';

@Injectable()
export class TagRepository {
  constructor(private prisma: PrismaService) {}

  async list() {
    return await this.prisma.tag.findMany();
  }

  async getById(id: number) {
    return await this.prisma.tag.findUnique({ where: { id } });
  }

  async getByDescription(description: string) {
    return await this.prisma.tag.findUnique({ where: { description } });
  }

  async create(data: CreateTag) {
    return await this.prisma.tag.create({ data });
  }
}
