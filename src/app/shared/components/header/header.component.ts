// Angular & Ionic core
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    RouterLink,
    
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle
  ]
})
export class HeaderComponent {

  @Input('hide-menu') hideMenu: boolean = false;
  @Input('enable-passing-content') enablePassingContent: boolean = false; 

  constructor() { }

}
