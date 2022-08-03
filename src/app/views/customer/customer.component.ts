import { Component, ElementRef, OnInit } from '@angular/core';
import { CustomerList } from '../../models/customerList.model';
import { CustomerService } from './customer.service'; 

@Component({
  templateUrl: 'customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public customers: any;
  private element: any;

  title = 'appBootstrap';
  
  closeResult: string;

  constructor( private customerService: CustomerService,   ) { 
 

  }

  
  ngOnInit() {
    console.log("iniciando ok ");
    //this.customers = ["s","ss", "sss" ];

    console.log(this.customerService.getTesteService());

    this.customerService.getCustomer().subscribe({
      next: data => {
          console.log("res getCustomer");
          console.log(data);
          this.customers = data;
      },
      error: error => {
          console.error('There was an error!', error);
      }
    }); 

  

  }


  clickRow(customer){
    console.log("clickRow");
    console.log(customer);
    
  }


  clickCreat(){
    console.log("clickCreat");
    this.modalopen()
  }

  clickEdit(){
    console.log("clickEdit");
  }

  clickDell(){
    console.log("clickDell");
  }

  modalopen(){
    // var body = document.body;
    // body.classList.add('modal-open')
    // body.classList.add('modalOpenBody')
    var elemento = document.getElementById("exampleModal");
    console.log(elemento)
    elemento.style.display = 'block';
    elemento.classList.add("show");
    elemento.classList.add("jw-modal-open");
    //elemento.classList.add("modalOpenDiv");

  }
 

 
 

}