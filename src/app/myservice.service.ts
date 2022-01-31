import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { of, tap, Observable } from 'rxjs';
import { Produit } from '../../shared/model/produit';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(private httpClient: HttpClient) { }

  count: number = 0;
  public getCatalogue() : Observable<Produit[]> {
    return this.httpClient
      .get<Produit[]>(environment.baseUrl)
      .pipe(tap((v) => console.log(v)));
  }
  
  /*
  public getCatalogue() : Observable<Array<{ title: string, price: number }>> {
    return of([
      {title: "linux", price: 9.50},
      {title: "angular", price: 8.50},
      {title: "java", price: 6.50},
      {title: "windows", price: 8.00},
      {title: "docker", price: 7.50}
    ]);
  }
  */
  public getClient(): any {
    return [
      { name: 'francois', firstName: 'dupont'},
      { name: 'marc', firstName: 'freyeux'},
    ];
  }
  public postClient(): any {
    
  }
  public postLogin(): any {
    
  }

  public getCount(): number {
    this.count++;
    return this.count;
  }


}

