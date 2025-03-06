import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: string[] = [];

  constructor() {}

  checkStorage() {
    this.favorites = JSON.parse(String(sessionStorage.getItem("favorites"))) ?? [];
  }

  addToFavorite(name: string) {
    if (!this.favorites.find((val) => val === name)?.length) {
      this.favorites.push(name);
      sessionStorage.setItem("favorites", JSON.stringify(this.favorites));
    }
  }

  removeFromFavorite(name: string) {
    const _temp = this.favorites.filter((val) => val !== name);
    this.favorites = _temp;
    sessionStorage.setItem("favorites", JSON.stringify(this.favorites));
  }
}
