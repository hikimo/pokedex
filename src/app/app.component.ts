import { Component } from '@angular/core';
import { 
  IonApp, 
  IonRouterOutlet 
} from '@ionic/angular/standalone';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoadingService } from './core/services/loading.service';
import { FavoriteService } from './core/services/favorite.service';

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
  constructor(
    private favoriteService: FavoriteService,
    private loadingService: LoadingService
  ) {
    this.loadingService.startLoading();

    this.favoriteService.checkStorage();

    setTimeout(() => {
      this.loadingService.stopLoading();
    }, 1500);
  }
}
