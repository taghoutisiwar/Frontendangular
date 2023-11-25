import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import {Team} from '../model/team.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-recherche-par-team',
  templateUrl: './recherche-par-team.component.html',
  styleUrls: ['./recherche-par-team.component.css']
})
export class RechercheParTeamComponent implements OnInit {
  employees!: Employee[]; 
  idTeam!:number;
  team!:Team[];
 

  constructor(private employeeService : EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.listeTeam().
      subscribe(te => {this.team = te._embedded.teams;
      console.log(te);
    });

  }

  onChange() {
    this.employeeService.rechercherParTeam(this.idTeam).subscribe(empl =>{this.employees=empl});
  }

}