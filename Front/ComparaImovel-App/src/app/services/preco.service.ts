import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Preco } from '../models/Preco';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class PrecoService {

  // DESCOMENTE PARA O USO EM TESTES
  // baseURL = 'http://localhost:63678/api/precos';
   baseURL = 'COLOQUE O SEU SITE EM PRODUÇÃO AQUI!';

  // tokenHeader: HttpHeaders;

  constructor(private http: HttpClient) {
 }

  public getPrecosByImovelId(imovelId: number): Observable<Preco[]> {
    return this.http
    .get<Preco[]>(`${this.baseURL}/${imovelId}`)
    .pipe(take(1));
  }

  public savePreco(imovelId: number, precos: Preco[]): Observable<Preco[]> {
    return this.http
    .put<Preco[]>(`${this.baseURL}/${imovelId}`, precos)
    .pipe(take(1));
  }

  public deletePreco(imovelId: number, precoId: number): Observable<any> {
    return this.http
    .delete(`${this.baseURL}/${imovelId}/${precoId}`)
    .pipe(take(1));
  }


}
