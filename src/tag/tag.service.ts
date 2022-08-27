import { Injectable } from '@nestjs/common';
import { CreateTag } from './tag.interfaces.dto';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(private tagRepository: TagRepository) {}

  async listTags() {
    return await this.tagRepository.list();
  }

  async getTagById(id: number) {
    return await this.tagRepository.getById(id);
  }

  async getTagByDescription(description: string) {
    return await this.tagRepository.getByDescription(description);
  }

  async createTag(data: CreateTag) {
    return await this.tagRepository.create(data);
  }
}
