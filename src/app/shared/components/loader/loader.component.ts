import { LoadingService } from '@/app/core/services/loading.service';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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
