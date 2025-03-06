// Angular core
import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
// RxJS
import { Observable } from 'rxjs';
// Services
import { LoadingService } from '@/app/core/services/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports: [
    AsyncPipe
  ]
})
export class LoaderComponent  implements OnInit {

  public loading$: Observable<boolean>;

  constructor(
    private loadingService: LoadingService
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit() {}

}
