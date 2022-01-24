import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { ShopComponent } from './shop/shop.component';


const routes: Routes = [
  {path: 'shop', component: ShopComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }