import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { TagService } from 'src/tag/tag.service';
import {
  CreateCat,
  UpdateCatAdopt,
  UpdateCatFavorite,
} from './cat.interfaces.dto';
import { CatRepository } from './cat.repository';

@Injectable()
export class CatService {
  constructor(
    private catRepository: CatRepository,
    private tagService: TagService,
  ) {}

  async listCats() {
    return await this.catRepository.list();
  }

  async getCatById(id: number) {
    return await this.catRepository.getById(id);
  }

  async createCat(data: CreateCat) {
    const { tags } = data;
    //create cat
    const cat = await this.catRepository.create(data);

    if (tags) {
      const allTags = await this.tagService.listTags();
      //filtering found tags
      const foundTags = allTags.filter((tag) => tags.includes(tag.description));

      //filtering not found tags
      const notFoundTags = tags.filter(
        (description) =>
          !foundTags.map((f) => f.description).includes(description),
      );

      console.log('foundTags', foundTags);
      console.log('notFoundTags', notFoundTags);

      //connect found tags
      if (foundTags) {
        await this.catRepository.connectTagsIdToCat({
          catId: cat.id,
          tagsIds: foundTags.map((tag) => tag.id),
        });
      }

      // create and connect new tag
      if (notFoundTags) {
        const newTags: Tag[] = [];
        for await (const tag of notFoundTags) {
          const newTag = await this.tagService.createTag({ description: tag });
          newTags.push(newTag);
        }
        await this.catRepository.connectTagsIdToCat({
          catId: cat.id,
          tagsIds: newTags.map((tag) => tag.id),
        });
      }
    }

    return await this.getCatById(cat.id);
  }

  async updateCatFavorite(props: UpdateCatFavorite) {
    return await this.catRepository.updateFavorite(props);
  }

  async updateCatAdopted(props: UpdateCatAdopt) {
    return await this.catRepository.updateAdopt(props);
  }
}
