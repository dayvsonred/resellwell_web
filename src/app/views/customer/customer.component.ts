import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { CustomerList } from '../../models/customerList.model';
import { PersonNew } from '../../models/personNew.model';
import { CustomerService } from './customer.service'; 
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public customers: any; 
  modalRef?: BsModalRef;
  public personNew: PersonNew;
  public selectRow?: string[];
  public customerSelect: any; 

  title = 'appBootstrap';
  
  closeResult: string;

  constructor( private customerService: CustomerService, private modalService: BsModalService  ) { 
 

  }

  
  ngOnInit() {
    console.log("iniciando ok ");
    this.startInitStage(); 
    this.iniPerson();
    this.actionSelectRow(null);
    //console.log(this.customerService.getTesteService());
     
  }

  startInitStage(){
    this.selectRow = null;
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


  clickRow(customer, lineClick){
    console.log("clickRow");
    console.log(customer);
    console.log(lineClick);
    this.customerSelect = customer;
    this.actionSelectRow(lineClick);
  }

  clickCreat(template){
    console.log("clickCreat");
    this.iniPerson();
    this.openModal(template);
  }

  clickEdit(){
    console.log("clickEdit"); 
  }

  clickDell(){
    console.log("clickDell");
    console.log(this.customerSelect);

    
  } 

  openModal(template: any) {
    this.modalRef = this.modalService.show(template ,Object.assign({}, { class: 'gray modal-lg' }));
  }

  closeModal() {
    this.modalRef.hide();
    this.modalRef = new BsModalRef;
  }

  addCreatPerson(){
    console.log("addCreatPerson");  
    this.closeModal(); 
    console.log(this.personNew);    

    this.customerService.addCreatPerson(this.personNew).subscribe({
      next: data => {
          console.log("res personNew");
          console.log(data);
          this.startInitStage();
      },
      error: error => {
          console.error('error in call addCreatPerson', error);
      }
    }); 


  }

  iniPerson(){
    this.personNew = new PersonNew('','','','');
  }

  actionSelectRow(index){
    this.selectRow = [];
    if(index!=null){
      this.selectRow[index] = "trSelectBackColor";
    }
  }
 
}