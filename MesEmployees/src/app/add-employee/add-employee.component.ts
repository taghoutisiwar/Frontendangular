import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../services/employee.service';
import { Team } from '../model/team.model';
import { Route, Router } from '@angular/router';
import { Image } from '../model/Image.model';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
 
})
export class AddEmployeeComponent implements OnInit{
  
  team!:Team[];
  newIdTeam!:number;
  newTeam!: Team;
  newEmployee =new Employee();
  message!: string;
  uploadedImage!: File;
  imagePath: any;
  teams: any;
  te:Team | undefined;

  constructor(private employeeService : EmployeeService,
    private router:Router){

  }
  
  ngOnInit():void{
    this.employeeService.listeTeam().
    subscribe(te => {this.team = te._embedded.teams;
    console.log(te);
    });
   
  }


  addEmployee():void{
    this.newEmployee.team = this.team.find(te => te.idTeam == this.newIdTeam)!;
    this.employeeService
      .ajouterEmployee(this.newEmployee)
      .subscribe((empl) => {
        this.employeeService
          .uploadImageFS(this.uploadedImage,this.uploadedImage.name,empl.id)
          .subscribe((response: any) => { }
          );
        this.router.navigate(['employees']);
      });
    
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    }

}