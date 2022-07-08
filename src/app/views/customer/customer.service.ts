import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, throwError, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private getClients: String = `${environment.PERSON_customer_list}`;
  private urlBase: String = `${environment.baseUrlGateWay}${environment.baseUrlOauth}`;


  constructor( private http: HttpClient, private router: Router ) { }


  public getToken(){
    const token = localStorage.getItem('access_token');
    return `Bearer ${token}`;
  }


  public getClientes(): Observable<any> {

    const headers = { 'Authorization': this.getToken(), "Content-Type": "application/json" };
    const Params = new URLSearchParams();
    Params.set('grant_type', 'password');
    Params.set('username', 'nina@gmail.com');
    Params.set('password', '123456');

    let resp:any;

    return this.http.post<{resp:any}>(`${this.urlBase}${this.getClients}`, Params.toString(), { headers } ).pipe(
      map((res:any) => {
        console.log("no post lohging pegar token");
        console.log("__________________________");console.log("__________________________");console.log("__________________________");
        console.log(res)

        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', res.access_token);
        return this.router.navigate(['home']);
      }),
      catchError((e) => {
        if (e.error.message) return throwError(() => e.error.message);

        return throwError(
          () =>
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
  }
}
