import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/Image.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',

})
export class EmployeesComponent implements OnInit{
  
  employees!: Employee[]; 

constructor(private employeeService : EmployeeService, public authService: AuthService,public router:Router){

}

ngOnInit(): void {
  this.chargerEmployees();
}

chargerEmployees(){
  this.employeeService.listEmployee().subscribe(empls => {
  this.employees = empls;

  this.employees.forEach((empls) => {
    this.employeeService
    .loadImage(empls.image.idImage)
    .subscribe((img: Image) => {
    empls.imageStr = 'data:' + img.type + ';base64,' + img.image;
    });
    });
  });
}

supprimerEmployee(e: Employee)
{
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
  this.employeeService.supprimerEmployee(e.id).subscribe(() => {
  console.log("Employee supprimé");
  this.chargerEmployees();
  });
} 

}