import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  listCats() {
    return 'listCats';
  }

  getCatById(id: string) {
    return id;
  }

  createCat(data: any) {
    return data;
  }

  updateCatFavorite(props: { id: string; favorite: boolean }) {
    return props;
  }

  updateCatAdopted(props: { id: string; adopted: boolean }) {
    return props;
  }
}
