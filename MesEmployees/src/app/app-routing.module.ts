import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { RechercheParTeamComponent } from './recherche-par-team/recherche-par-team.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeTeamComponent } from './liste-team/liste-team.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { EmployeeGuard } from './employee.guard';


const routes: Routes = [
  {path : "employees", component: EmployeesComponent},
  {path : "add-employee", component:AddEmployeeComponent},
  {path : "updateEmployee/:id", component:UpdateEmployeeComponent},
  { path: "", redirectTo: "employees", pathMatch: "full" },
  {path: "rechercheParTeam", component : RechercheParTeamComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "listeTeam", component : ListeTeamComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path : "add-employee", component : AddEmployeeComponent, canActivate:[EmployeeGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }