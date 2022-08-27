import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCat, ListCats } from './cat.interfaces.dto';
import { CatService } from './cat.service';

@Controller('/cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  async listCats(@Query() query?: ListCats) {
    return await this.catService.listCats(query);
  }

  @Get(':id')
  async getCatById(@Param() params: { id: string }) {
    const { id } = params;
    return await this.catService.getCatById(Number(id));
  }

  @Post()
  async createCat(@Body() data: CreateCat) {
    return await this.catService.createCat(data);
  }

  @Patch('/favorite/:id')
  async updateCatFavorite(
    @Param() params: { id: string },
    @Body() data: { favorited: boolean },
  ) {
    const { id } = params;
    const { favorited } = data;

    return await this.catService.updateCatFavorite({
      id: Number(id),
      favorited: favorited,
    });
  }

  @Patch('/adopt/:id')
  async updateCatAdopted(
    @Param() params: { id: string },
    @Body() data: { adopted: boolean },
  ) {
    const { id } = params;
    const { adopted } = data;

    return await this.catService.updateCatAdopted({ id: Number(id), adopted });
  }
}
