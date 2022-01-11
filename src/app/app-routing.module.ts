import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { DetailsComponent } from './details/details.component';
import { FaultMachineComponent } from './fault-machine/fault-machine.component';
import { LoginComponent } from './login/login.component';
import { MachinesComponent } from './machines/machines.component';
import { NextProductComponent } from './next-product/next-product.component';


const routes: Routes = [ 
  
   {path: '',component:  MachinesComponent,canActivate: [AuthGuard]},
  {path: 'login',component: LoginComponent},
  {path: 'Machines',component: MachinesComponent,canActivate: [AuthGuard]},
  {path: 'Details',component: DetailsComponent,canActivate: [AuthGuard]},
  {path: 'NextProduct',component: NextProductComponent,canActivate: [AuthGuard]},
  {path: 'FaultMachine',component: FaultMachineComponent,canActivate: [AuthGuard]},
 
  
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
