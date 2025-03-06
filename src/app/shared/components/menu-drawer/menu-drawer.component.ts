// Angular & Ionic core
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonMenu,
  IonContent,
  IonMenuToggle,
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
// Local components
import { HeaderComponent } from '@/app/shared/components/header/header.component';

@Component({
  selector: 'app-menu-drawer',
  templateUrl: './menu-drawer.component.html',
  styleUrls: ['./menu-drawer.component.scss'],
  imports: [
    HeaderComponent,
    RouterLink,
    
    IonMenu,
    IonContent,
    IonMenuToggle,
    IonButtons,
    IonButton,
    IonIcon
  ]
})
export class MenuDrawerComponent {

  @Input() contentId: string = '';

  constructor() {
    addIcons({
      close
    })
  }

}
