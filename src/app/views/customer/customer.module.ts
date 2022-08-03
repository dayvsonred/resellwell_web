import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CustomerRoutingModule,
    BsDropdownModule,
    CommonModule,
  ],
  declarations: [ CustomerComponent ]
})
export class CustomerModule { }
