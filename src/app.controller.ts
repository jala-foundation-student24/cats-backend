import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/cat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/list')
  listCats() {
    return this.appService.listCats();
  }

  @Get(':id')
  getCatById(@Param() params: { id: string }) {
    const { id } = params;
    return this.appService.getCatById(id);
  }

  @Post()
  createCat(@Body() data: any) {
    return this.appService.createCat(data);
  }

  @Patch('/favorite/:id')
  updateCatFavorite(
    @Param() params: { id: string },
    @Body() data: { favorite: boolean },
  ) {
    const { id } = params;
    const { favorite } = data;

    return this.appService.updateCatFavorite({ id, favorite });
  }

  @Patch('/adopt/:id')
  updateCatAdopted(
    @Param() params: { id: string },
    @Body() data: { adopted: boolean },
  ) {
    const { id } = params;
    const { adopted } = data;

    return this.appService.updateCatAdopted({ id, adopted });
  }
}
