import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';

@Component({
  templateUrl: 'customer.component.html'
})
export class CustomerComponent implements OnInit {

  constructor( private customerService: CustomerService ) { }

  
  ngOnInit() {
    console.log("iniciando ok ");


    console.log(this.customerService.getTesteService())


    this.customerService.getCustomer().subscribe({
      next: data => {
          console.log(" res data");
          console.log(data);
      },
      error: error => {
          console.error('There was an error!', error);
      }
  })

    // this.customerService.getCustomer().subscribe(data => {

    //   console.log("REEEEESSSSSSSSSSSSS")
    //   console.log(data)
   
    // }, (err) => {
    //   console.log("ERRRRRRRRRRRRRRROOOOOOOOOOOOOOOOOOO*************")
    // });


  }

}