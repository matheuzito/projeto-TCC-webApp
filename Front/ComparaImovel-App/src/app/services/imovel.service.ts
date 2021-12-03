import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imovel } from '../models/Imovel';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {
  baseURL = environment.apiURL + 'api/Imoveis';

  tokenHeader: HttpHeaders;

  constructor(private http: HttpClient) {
    this.tokenHeader = new HttpHeaders({Authorization: `Bearer ${localStorage.getItem('token')}`});
   }

  public getImoveis(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(this.baseURL, {headers: this.tokenHeader})
    .pipe(take(1));
  }

  public getImoveisByNome(nome: string): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(`${this.baseURL}/${nome}/nome`, {headers: this.tokenHeader})
    .pipe(take(1));
  }

  public getImovelById(id: number): Observable<Imovel> {
    return this.http.get<Imovel>(`${this.baseURL}/${id}`, {headers: this.tokenHeader})
    .pipe(take(1));
  }

  // apenas para dashboard
  public getImovelDetalheById(id: number): Observable<Imovel> {
    return this.http.get<Imovel>(`${this.baseURL}/${id}`)
    .pipe(take(1));
  }

  public post(imovel: Imovel): Observable<Imovel> {
    return this.http.post<Imovel>(this.baseURL, imovel, {headers: this.tokenHeader})
    .pipe(take(1));
  }

  public put(imovel: Imovel): Observable<Imovel> {
    return this.http.put<Imovel>(`${this.baseURL}/${imovel.id}`, imovel, {headers: this.tokenHeader})
    .pipe(take(1));
  }

  public deleteImovel(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`, {headers: this.tokenHeader})
    .pipe(take(1));
  }

  postUpload(imovelId: number, file: File[] ): Observable<Imovel> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http.post<Imovel>(`${this.baseURL}/upload-image/${imovelId}`, formData, {headers: this.tokenHeader})
    .pipe(take(1));
  }



}
