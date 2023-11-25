import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from '../model/team.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit{

  @Input()
  teams! : Team;
  
  @Output() 
  teamUpdated = new EventEmitter<Team>();
  
  @Input()
  ajout!:boolean;

  constructor(private employeeService : EmployeeService){

  }
  saveTeam(){
  this.teamUpdated.emit(this.teams);
  }

  ngOnInit(): void {
      console.log("ngOnInit du composant Updateteam ",this.teams);
  }
}