export interface CreateCat {
  name: string;
  image_url: string;
  tags?: string[];
}

export interface UpdateCatFavorite {
  id: number;
  favorited: boolean;
}

export interface UpdateCatAdopt {
  id: number;
  adopted: boolean;
}