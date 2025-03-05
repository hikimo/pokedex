import { Component, OnInit } from '@angular/core';
import { 
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '@/app/core/services/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonList,
    IonItem,
    IonLabel,
  ]
})
export class FavoritesPage implements OnInit {
  pokemonList: string[] = [];

  constructor(
    private favoriteService: FavoriteService
  ) {
    this.pokemonList = this.favoriteService.favorites;
  }

  ngOnInit() {
  }

}
