import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule
  ]
})
export class LoaderPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(["/home"]);
      this.router
    }, 2000);
  }

}
