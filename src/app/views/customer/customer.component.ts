import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { CustomerList } from '../../models/customerList.model';
import { CustomerService } from './customer.service'; 
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public customers: any;
  private element: any;
  modalRef?: BsModalRef;

  title = 'appBootstrap';
  
  closeResult: string;

  constructor( private customerService: CustomerService, private modalService: BsModalService  ) { 
 

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


  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }
 

 
 

}