import { IPokemonDetailResponse } from '@/app/core/interfaces/pokemon-detail-response.interface';
import { FavoriteService } from '@/app/core/services/favorite.service';
import { LoadingService } from '@/app/core/services/loading.service';
import { PokemonService } from '@/app/core/services/pokemon.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { 
  IonContent,
  IonButtons,
  IonButton,
  IonIcon
} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { 
  heart, 
  heartOutline, 
  menuOutline, 
  volumeHighOutline,
  arrowBackCircle,
  arrowForwardCircle
} from 'ionicons/icons';

@Component({
  selector: 'app-pokedex-detail',
  templateUrl: './pokedex-detail.page.html',
  styleUrls: ['./pokedex-detail.page.scss'],
  standalone: true,
  imports: [
    IonButtons, 
    IonContent,
    IonButtons,
    IonButton,
    IonIcon
  ]
})
export class PokedexDetailPage {
  private selectedPokemon!: string;  
  public id!: number;

  public pokemon!: IPokemonDetailResponse;
  public cries!: HTMLAudioElement;
  public isFavorite: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService,
    private favoriteService: FavoriteService,
    private loadingService: LoadingService
  ) {
    this.selectedPokemon = this.activatedRoute.snapshot.paramMap.get('name') as string;
    this.loadData();

    addIcons({ 
      menuOutline, 
      heart, 
      heartOutline, 
      volumeHighOutline,
      arrowBackCircle,
      arrowForwardCircle
    });
  }

  // All data fetchers
  loadData(useId?: boolean) {
    this.loadingService.startLoading();
    this.pokemonService.getPokeDetails(useId ? String(this.id) : this.selectedPokemon)
      .subscribe(
        (response) => {
          this.id = response.id;
          this.pokemon = response;

          this.checkFavorite();
          this.setSound(useId);

          this.loadingService.stopLoading();
          this.cdr.detectChanges();
        }
      )
  }

  checkFavorite() {
    this.isFavorite = this.favoriteService.favorites.findIndex((name) => this.pokemon.name === name) > -1;
  }

  setSound(reset?: boolean) {
    if (!this.cries || reset) {
      this.cries = new Audio(this.pokemon.cries.latest);
      this.cries.loop = false;

      this.playSound();
    }
  }

  playSound() {
    this.cries.play();
  }

  // All event handlers
  onNavigate(control: 'next' | 'prev') {
    if (control === 'next') {
      this.id += 1;
      this.loadData(true);
    } else if (control === 'prev') {
      this.id -= 1;
      this.loadData(true);
    }
  }

  onToggleFavorite() {
    if (this.isFavorite) {
      this.favoriteService.removeFromFavorite(this.pokemon.name);      
    } else {
      this.favoriteService.addToFavorite(this.pokemon.name);
    }
    this.checkFavorite();
  }
  
  // Utils
  padNumber(id: number, totalLength: number = 4): string {
    return id.toString().padStart(totalLength, '0');
  }

  replaceStateName(name: string): string {
    // Skip process if not SP
    if (!name.includes("-")) return name;

    return name.replace("special-", "sp.");
  }
}
