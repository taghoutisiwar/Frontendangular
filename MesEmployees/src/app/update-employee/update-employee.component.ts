import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../model/employee.model';
import { Team } from '../model/team.model';
import { Image } from '../model/Image.model';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: []
})
export class UpdateEmployeeComponent implements OnInit{
  currentEmployee = new Employee();
  team! : Team[];
  updatedteId! : number;
  myImage! : string;
  uploadedImage!: File;
  isImageUpdated: Boolean=false;


  constructor(private activatedRoute :ActivatedRoute,
              private router :Router,
              private employeeService : EmployeeService){

  }

  ngOnInit() : void{
    this.employeeService.listeTeam().
    subscribe(tes => {this.team = tes._embedded.teams;
    });
    
    this.employeeService.consulterEmployee(this.activatedRoute.snapshot.params['id']).subscribe( e =>{ this.currentEmployee = e;
      this.updatedteId = this.currentEmployee.team.idTeam;
       });
  }
  
  updateEmployee(){
   this.currentEmployee.team = this.team.find(t => t.idTeam == this.updatedteId)!;
    this.employeeService
    .updateEmployee(this.currentEmployee)
    .subscribe((empl) => {
      this.router.navigate(['employees']);
    });

  }

  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
    this.uploadedImage = event.target.files[0];
    this.isImageUpdated =true;
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

  onAddImageProduit(){
    this.employeeService
    .uploadImageEmpl(this.uploadedImage,this.uploadedImage.name,this.currentEmployee.id)
        .subscribe( (img : Image) => {
              this.currentEmployee.images.push(img);
           });
  }

  supprimerImage(img: Image) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.employeeService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentEmployee.images 
        const index = this.currentEmployee.images.indexOf(img, 0);
        if (index > -1) {
          this.currentEmployee.images.splice(index, 1);
        }
      });
  }
}
