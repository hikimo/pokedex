// Angular & Ionic core
import { 
  Component, 
  EventEmitter, 
  Input, 
  OnInit, 
  Output
} from '@angular/core';
import {
  IonMenuToggle,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
// Interfaces
import { IPokemonDetailResponse } from '@/app/core/interfaces/pokemon-detail-response.interface';

@Component({
  selector: 'app-pokecard',
  templateUrl: './pokecard.component.html',
  styleUrls: ['./pokecard.component.scss'],
  imports: [
    IonMenuToggle,
    IonButtons,
    IonButton,
    IonIcon,
  ]
})
export class PokecardComponent  implements OnInit {
  @Input() pokemon!: IPokemonDetailResponse;
  @Input() isFavorite: boolean = false;
  @Output() onNavigate = new EventEmitter<'prev' | 'next'>;
  @Output() onPlaySound = new EventEmitter();
  @Output() onToggleFavorite = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  // All event handlers
  navigate(action: 'prev' | 'next') {
    this.onNavigate.emit(action);
  }

  playSound() {
    this.onPlaySound.emit();
  }

  toggleFavorite() {
    this.onToggleFavorite.emit();
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
