import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CustomerList } from '../../models/customerList.model';
import { PersonNew } from '../../models/personNew.model';
import { CustomerService } from './customer.service'; 
import { BsModalService, BsModalRef, ModalOptions  } from 'ngx-bootstrap/modal';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  @ViewChild('staticModal') public staticModal: ModalDirective;

  public customers: any; 
  modalRef?: BsModalRef;
  public personNew: PersonNew;
  public selectRow?: string[];
  public customerSelect: any; 
  public bsmodal: any;

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
    this.openModal(template, false);
  }

  clickEdit(){
    console.log("clickEdit"); 
  }

  clickDell(templateDell, templateDellEmpty){
    console.log("clickDell");
    
    console.log(this.customerSelect);
    if(this.customerSelect!= undefined ){
      this.openModal(templateDell, true); 
    }else{
      this.openModal(templateDellEmpty, false);
    }
    
    
  } 

  openModal(template: any, closeOnClick: boolean) { 
    this.modalService.config = new ModalOptions;
    if(closeOnClick) this.modalService.config.backdrop = 'static'; 
    this.modalRef = this.modalService.show(template ,Object.assign({}, { class: 'gray modal-lg', ...this.modalService.config }));
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