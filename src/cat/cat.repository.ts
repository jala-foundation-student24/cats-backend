import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { filter } from 'rxjs';
import { PrismaService } from 'src/prisma.service';
import {
  CreateCat,
  ListCats,
  UpdateCatAdopt,
  UpdateCatFavorite,
} from './cat.interfaces.dto';

@Injectable()
export class CatRepository {
  constructor(private prisma: PrismaService) {}

  private filterByTag(tag: string) {
    return {
      TagsOnCats: {
        some: {
          tag: {
            description: tag,
          },
        },
      },
    };
  }

  async list(filters?: ListCats) {
    return await this.prisma.cat.findMany({
      include: {
        TagsOnCats: {
          select: {
            tag: true,
          },
        },
      },
      //challenge 3 filter
      ...(filters?.orderByProp && {
        orderBy: {
          [filters.orderByProp]: filters?.order,
        },
      }),
      //challenge 4 and 6 filter
      ...((filters?.tag || filters?.adopted) && {
        where: {
          AND:
            filters?.tag && filters?.adopted
              ? [this.filterByTag(filters.tag), { is_adopted: filters.adopted }]
              : filters?.tag
              ? [this.filterByTag(filters.tag)]
              : [{ is_adopted: filters.adopted }],
        },
      }),
      //challenge 5 filter
      ...(filters?.skip && { skip: Number(filters.skip) }),
      ...(filters?.take && { take: Number(filters.take) }),
    });
  }

  async getById(id: number) {
    return await this.prisma.cat.findUnique({
      where: { id },
      include: {
        TagsOnCats: {
          select: {
            tag: true,
          },
        },
      },
    });
  }

  async create(data: CreateCat) {
    return await this.prisma.cat.create({
      data: {
        name: data.name,
        image_url: data.image_url,
      },
    });
  }

  async updateFavorite(props: UpdateCatFavorite) {
    const { id, favorited } = props;
    return await this.prisma.cat.update({
      where: { id },
      data: { favorited },
    });
  }

  async updateAdopt(props: UpdateCatAdopt) {
    const { id, adopted } = props;
    return await this.prisma.cat.update({
      where: { id },
      data: { is_adopted: adopted },
    });
  }
  async connectTagsIdToCat(props: { catId: number; tagsIds: number[] }) {
    const { catId, tagsIds } = props;
    for await (const tagId of tagsIds) {
      await this.prisma.tagsOnCats.create({ data: { catId, tagId } });
    }
  }
}
