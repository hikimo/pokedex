import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { ICommonResponse } from "@/app/core/interfaces/common-response.interface";
import { IPokemonTypeFilterResponse } from '../interfaces/pokemon-type-filter-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getPokeList(skip: number = 0, limit: number = 20): Observable<ICommonResponse> {
    const qParams = new URLSearchParams({
      offset: String(skip),
      limit: String(limit)
    });
    return this.http.get<ICommonResponse>(`${this.baseUrl}/pokemon?${qParams}`);
  }

  getTypes(): Observable<ICommonResponse> {
    return this.http.get<ICommonResponse>(`${this.baseUrl}/type`);
  }

  getPokeListByType(name: string): Observable<IPokemonTypeFilterResponse> {
    return this.http.get<IPokemonTypeFilterResponse>(`${this.baseUrl}/type/${name}`);
  }

  fetchFromUrl(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
