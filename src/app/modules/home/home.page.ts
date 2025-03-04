import { TResults } from '@/app/core/interfaces/common-response.interface';
import { PokemonService } from '@/app/core/services/pokemon.service';
import { environment } from '@/environments/environment';
import { Component } from '@angular/core';
import { 
  InfiniteScrollCustomEvent,
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/angular/standalone';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonInfiniteScroll,
    IonInfiniteScrollContent
  ],
})
export class HomePage {
  public pokemonList: TResults[] = [];
  public pokemonTypeList: TResults[] = [];
  
  // Flags
  public completed: boolean = false;
  public loading: boolean = false;
  public loadingType: boolean = false;
  // Parameters to load the list
  private skip = 0;
  private limit = 50;
  
  constructor(
    private pokemonService: PokemonService
  ) {
    this.loadAll();
  }

  // All data fetchers
  loadAll() {
    this.loadList();
    this.loadTypes();
  }

  loadList(event?: InfiniteScrollCustomEvent) {
    // Only process when completed flag is false
    if (!this.completed) {
      this.loading = true;
      this.pokemonService.getPokeList(this.skip, this.limit)
        .subscribe(
          (response) => {
            // Flag as compelted if response.next is null
            if (!response.next) this.completed = true;
            else if (response.next && this.completed) this.completed = false;
            
            const results = response.results satisfies TResults[];
            this.skip += this.limit;
            this.pokemonList = [
              ...this.pokemonList,
              ...results
            ];
          },
          (err) => {
            // Only show the logs on development 
            if (!environment.production) {
              console.log("ERROR - HOME LOAD-POKEMON-LIST:", err?.message ?? err);
            }
          },
          () => {
            this.loading = false;
            if (event) {
              event.target.complete();
            }
          }
        );
    } else if (event) {
      event.target.complete();
    }
  }

  loadTypes() {
    this.loadingType = false;
    this.pokemonService.getTypes()
      .subscribe(
        (response) => {
          this.pokemonTypeList = response.results;
        },
        (err) => {
          // Only show the logs on development 
          if (!environment.production) {
            console.log("ERROR - HOME LOAD-POKEMON-TYPE-LIST:", err?.message ?? err);
          }
        },
        () => {
          this.loadingType = false;
        }
      );
  }

  loadPokemonByTypes(name: string) {
    this.pokemonService.getPokeListByType(name)
      .pipe(
        map((response) => {
          const results: TResults[] = [];
          response.pokemon.forEach(item => {
            results.push(item.pokemon);
          });

          return results;
        })
      )
      .subscribe(
        (response) => {
          this.skip = 0;
          this.completed = true;
          this.pokemonList = response;
        },
        (err) => {
          // Only show the logs on development 
          if (!environment.production) {
            console.log("ERROR - HOME LOAD-POKEMON-TYPE-LIST:", err?.message ?? err);
          }
        }
      );
  }

  // All event handlers
  onIonInfinite(event: InfiniteScrollCustomEvent) {
    if (!this.loading) {
      this.loadList(event);
    } else {
      event.target.complete();
    }
  }

  onHandleTypeFilter(event: CustomEvent) {
    const name = event.detail.value;
    if (name) {
      this.loadPokemonByTypes(name);
    }
  }
}
