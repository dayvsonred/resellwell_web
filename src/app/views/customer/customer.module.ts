import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CustomerRoutingModule,
    BsDropdownModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [ CustomerComponent ]
})
export class CustomerModule { }
