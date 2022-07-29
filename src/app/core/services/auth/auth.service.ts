import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map, throwError, catchError } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authorization: String = `${environment.oauth_token}`;
  private urlBase: String = `${environment.baseUrlGateWay}${environment.baseUrlOauth}`;

  constructor(private http: HttpClient, private router: Router) { }


  /*** TESTE OK */
  public teste() {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic QVBJX05BTUVfQUNDRVNTOkFQSV9TRUNSRVRfQUNDRVNT");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    //myHeaders.append("Cookie", "JSESSIONID=173C972EF9B928E050EB6CEF181C6924");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", "nina@gmail.com");
    urlencoded.append("password", "123456");
    urlencoded.append("grant_type", "password");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://localhost:8765/resell-oauth/oauth/token", {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));


  }



  public sign(payload: { email: string; password: string }): Observable<any> {

    console.log(payload.email)
    console.log(payload.password)

    const headers = { 
      'Authorization': "Basic QVBJX05BTUVfQUNDRVNTOkFQSV9TRUNSRVRfQUNDRVNT", 
      "Content-Type": "application/x-www-form-urlencoded",
      'Access-Control-Allow-Origin': '*'
    };
    const Params = new URLSearchParams();
    Params.set('grant_type', 'password');
    //Params.set('username', 'nina@gmail.com');
    //Params.set('password', '123456');
    Params.set('username', payload.email);
    Params.set('password', payload.password);
    console.log("@@@@@@@@@@@__________________________");

    return this.http.post<{ access_token: string, expires_in: string, jti: string, token_type: string }>(`${this.urlBase}${this.authorization}`, Params.toString(), { headers } ).pipe(
      map((res) => {
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

  public logout() {
    localStorage.removeItem('access_token');
    return this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    if (!token) return false;

    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }

}
