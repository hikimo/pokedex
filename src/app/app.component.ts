// Angular & Ionics
import { Component } from '@angular/core';
import { 
  IonApp, 
  IonRouterOutlet 
} from '@ionic/angular/standalone';
// Services
import { FavoriteService } from '@/app/core/services/favorite.service';
import { LoadingService } from '@/app/core/services/loading.service';
// Local components
import { LoaderComponent } from '@/app/shared/components/loader/loader.component';

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
