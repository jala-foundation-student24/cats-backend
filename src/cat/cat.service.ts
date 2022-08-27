import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
  getHello(): string {
    return 'Hello World!';
  }

  listCats() {
    return 'listCats';
  }

  getCatById(id: number) {
    return id;
  }

  createCat(data: any) {
    return data;
  }

  updateCatFavorite(props: { id: number; favorite: boolean }) {
    return props;
  }

  updateCatAdopted(props: { id: number; adopted: boolean }) {
    return props;
  }
}
