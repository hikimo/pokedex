import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokedexDetailPage } from './pokedex-detail.page';

describe('PokedexDetailPage', () => {
  let component: PokedexDetailPage;
  let fixture: ComponentFixture<PokedexDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
