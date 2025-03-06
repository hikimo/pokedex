// Angular & Ionic core
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonContent
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
// Services
import { FavoriteService } from '@/app/core/services/favorite.service';
import { LoadingService } from '@/app/core/services/loading.service';
import { PokemonService } from '@/app/core/services/pokemon.service';
import { ChangeDetectorRef, Component } from '@angular/core';
// Interfaces
import { IPokemonDetailResponse } from '@/app/core/interfaces/pokemon-detail-response.interface';
// Local components
import { MenuDrawerComponent } from "@/app/shared/components/menu-drawer/menu-drawer.component";
import { PokecardComponent } from '@/app/shared/components/pokecard/pokecard.component';
// Env
import { environment } from '@/environments/environment';

@Component({
  selector: 'app-pokedex-detail',
  templateUrl: './pokedex-detail.page.html',
  styleUrls: ['./pokedex-detail.page.scss'],
  standalone: true,
  imports: [
    PokecardComponent,
    MenuDrawerComponent,
    
    IonContent
  ]
})
export class PokedexDetailPage {
  private selectedPokemon!: string;  
  public id!: number;

  public pokemon!: IPokemonDetailResponse;
  public cries!: HTMLAudioElement;
  public isFavorite: boolean = false;

  constructor(
    private router: Router,
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

        },
        (err) => {
          alert("Pokemon with this name / id is not found from the library!");
          this.router.navigate(["/"]);

          if (!environment.production) {
            console.log("ERROR - POKEDEX DETAIL - LOAD DATA:", err);
          }
        }, 
        () => {
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

  
}
