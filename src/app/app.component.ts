import { Component } from '@angular/core';
import { 
  IonApp, 
  IonRouterOutlet 
} from '@ionic/angular/standalone';
import { LoaderComponent } from './shared/components/loader/loader.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    LoaderComponent,
    
    IonApp,
    IonRouterOutlet
  ],
})
export class AppComponent {
  constructor() {}
}
