// Angular & Ionic Core
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
// Local Components
import { HeaderComponent } from '@/app/shared/components/header/header.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [
    HeaderComponent,
    RouterOutlet,
    IonContent
  ]
})
export class MainLayoutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
