import { IPokemonDetailResponse } from '@/app/core/interfaces/pokemon-detail-response.interface';
import { PokemonService } from '@/app/core/services/pokemon.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { 
  IonContent,
  IonButtons,
  IonButton,
  IonIcon
} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { heart, heartOutline, menuOutline, volumeHighOutline } from 'ionicons/icons';

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
  public cries!: HTMLAudioElement;
  public pokemon!: IPokemonDetailResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
    this.selectedPokemon = this.activatedRoute.snapshot.paramMap.get('name') as string;
    this.loadData();

    addIcons({ menuOutline, heart, heartOutline, volumeHighOutline });
  }

  // All data fetchers
  loadData() {
    this.pokemonService.getPokeDetails(this.selectedPokemon)
      .subscribe(
        (response) => {
          this.pokemon = response;
          this.setSound();
        }
      )
  }

  setSound() {
    if (!this.cries) {
      this.cries = new Audio(this.pokemon.cries.latest);
      this.cries.loop = false;

      this.playSound();
    }
  }

  playSound() {
    this.cries.play();
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
