import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, throwError, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Customer } from '../../models/customer.model';
import { CustomerGet } from '../../models/customerGet.model';
import { CustomerList } from '../../models/customerList.model';
import { PersonNew } from '../../models/personNew.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private getClients: String = `${environment.PERSON_customer_list}`;
  private urlBase: String = `${environment.baseUrlGateWay}`;
  private urlCustomerList: String = `${environment.person.path}${environment.person.customer.list}`;
  private urlCustomerAdd: String = `${environment.person.path}${environment.person.customer.add}`;
  private urlCustomerDell: String = `${environment.person.path}${environment.person.customer.dell}`;


  constructor(private http: HttpClient, private router: Router) { }


  public getToken() {
    const token = localStorage.getItem('access_token');
    return `Bearer ${token}`;
  }


  public getTesteService() {
    return "this.customer service ok";
  }

  public getCustomer(): Observable<HttpResponse<CustomerList[]>> {
    let body = new CustomerGet("1");
    console.log("go");
    const headers = { 'Authorization': this.getToken() };
    console.log(`${this.urlBase}${this.urlCustomerList}`);
    return this.http.post<HttpResponse<CustomerList[]>>(`${this.urlBase}${this.urlCustomerList}`, body, { headers })
  }


  public addCreatPerson(Person: PersonNew): Observable<HttpResponse<Customer>> {
    let body = Person;
    console.log("go");
    const headers = { 'Authorization': this.getToken() };
    return this.http.post<HttpResponse<Customer>>(`${this.urlBase}${this.urlCustomerAdd}`, body, { headers });
  }

  public dellCustomer(customerId: number): Observable<HttpResponse<Customer>> {
    console.log("go  dellCustomer");
    console.log("customerId " + customerId);
    const headers = { 'Authorization': this.getToken(), "Content-Type": "application/json;charset=UTF-8", };
    return this.http.delete<HttpResponse<Customer>>(`${this.urlBase}${this.urlCustomerDell}${customerId}`, { headers });
  }



  //   updateAddress(address: Address): Observable<HttpResponse<Address>> {
  //     const url = this.wsUrl + this.addressPath;
  //     return this.http.put<Address>(url, address, { observe: 'response' })
  //         .pipe(
  //             retry(2),
  //             catchError(this.handleError)
  //         );
  // }

  //   public getCustomer(): Observable<CustomerList> {
  //     let body = new CustomerGet("1");
  //     console.log("go");
  //     const headers = { 'Authorization': this.getToken() }; 
  //    return this.http.post<CustomerList>(`${this.urlBase}${this.urlCustomerList}`, body, { headers }).pipe(
  //      map((res:any) => { 
  //        console.log("res ************")
  //        console.log(res) 
  //        return res;
  //      }),
  //      catchError((e) => {
  //        if (e.error.message) return throwError(() => e.error.message);
  //        return throwError( () => 'ERROR');
  //      })
  //    );
  //  }


  // public searchAddressByZipCode(zipCode: string): Observable<Address> {
  //   return this.http.get<Address>(
  //   )
  //     .pipe(share());
  // }

  // public searchCountryByInitials(countryInitials: string): Observable<Country> {
  //   return this.http.get<Country>(countryInitials)
  //     .pipe(map(country => {
  //       return country;
  //     }),
  //       share()
  //     );
  // }


  // public dellCustomer(customerId: number): Observable<HttpResponse<Customer>> { 
  //   console.log("go  dellCustomer");
  //   console.log("customerId " + customerId);
  //   const headers = { 'Authorization': this.getToken() };   
  //   const params =  new HttpParams().append('customerId', customerId.toString());
  //  return this.http.delete<HttpResponse<Customer>>(`${this.urlBase}${this.urlCustomerDell}/`, { params });
  // }

  // deleteSpecialNeeds(
  //   specialNeeds: Array<SiuSpecialNeed>
  // ): Observable<Array<SiuSpecialNeed>> {
  //   return this.http.request<Array<SiuSpecialNeed>>('delete', this.getAllPermanentNeedsUrl(), {
  //     headers: new HttpHeaders().append('Siu-token', APP_CONSTANTS.siu.siuToken),
  //     body: specialNeeds
  //   });
  // }



  public getClientes(): Observable<any> {

    const headers = { 'Authorization': this.getToken(), "Content-Type": "application/json" };
    const Params = new URLSearchParams();
    Params.set('grant_type', 'password');
    Params.set('username', 'nina@gmail.com');
    Params.set('password', '123456');

    let resp: any;

    return this.http.post<{ resp: any }>(`${this.urlBase}${this.getClients}`, Params.toString(), { headers }).pipe(
      map((res: any) => {
        console.log("no post lohging pegar token");
        console.log("__________________________"); console.log("__________________________"); console.log("__________________________");
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
