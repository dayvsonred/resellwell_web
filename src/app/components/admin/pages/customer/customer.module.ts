import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  imports: [
    CustomerRoutingModule,
    BsDropdownModule
  ],
  declarations: [ CustomerComponent ]
})
export class CustomerModule { }
