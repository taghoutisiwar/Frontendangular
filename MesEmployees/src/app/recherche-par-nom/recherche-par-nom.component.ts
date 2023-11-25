import { Component } from '@angular/core';
import { Employee } from '../model/employee.model';
import { Observable } from 'rxjs/internal/Observable';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: ['./recherche-par-nom.component.css']
})
export class RechercheParNomComponent {
  employees!: Employee[]; 
  nom!:string;
  allemployees! : Employee[];
  searchTerm!:string;

  constructor(private employeeService : EmployeeService){}
  
  ngOnInit():void{
    this.employeeService.listEmployee().subscribe(e => {
    console.log(e);
    this.employees = e;
    });
      
  }

  rechercherEmpls(){
    this.employeeService.rechercherParNom(this.nom).
    subscribe(e => {
    this.employees = e;
    console.log(e)});
        
  }
    
  onKeyUp(filterText : string){
    this.employees= this.allemployees.filter(item =>item.nom.toLowerCase().includes(filterText));
  }
}