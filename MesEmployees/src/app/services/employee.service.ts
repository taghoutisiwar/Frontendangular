import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';
import { Team } from '../model/team.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { teamWrapper } from '../model/teamWrapped.model';
import { AuthService } from './auth.service';
import { Image } from '../model/Image.model';
import { apiURL } from '../config';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiURLte: string = "http://localhost:8083/employees/te";

  employees!: Employee[];

  constructor(private http : HttpClient , 
              private authService : AuthService) {
   }

 
  listEmployee(): Observable<Employee[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
   
     return this.http.get<Employee[]>(apiURL+"/all",{headers:httpHeaders});
  }
    
  ajouterEmployee( empl: Employee):Observable<Employee>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post<Employee>(apiURL+"/addempl", empl, {headers:httpHeaders});
  }


  supprimerEmployee(id:number){
    const url = `${apiURL}/delempl/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.delete(url, {headers:httpHeaders});
  }

  consulterEmployee(id: number): Observable<Employee> {
    const url = `${apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get<Employee>(url,{headers:httpHeaders});
  }
 
  updateEmployee(e:Employee) : Observable<Employee>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.put<Employee>(apiURL+"/updateempl", e, {headers:httpHeaders});
  }

  trierEmployees(){
    this.employees = this.employees.sort((n1,n2) => {
    if(n1 .id > n2.id) {
    return 1;
    }
    if (n1.id < n2.id) {
    return -1;
    }
    return 0;
    });
  }
 
  listeTeam():Observable<teamWrapper>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.get<teamWrapper>(this.apiURLte,{headers:httpHeaders});
  }
     
        
  rechercherParTeam(idTeam: number):Observable< Employee[]> {
    const url = `${apiURL}/emplscat/${idTeam}`;
    return this.http.get<Employee[]>(url);
  }

  
  rechercherParNom(nom: string):Observable< Employee[]> {
    const url = `${apiURL}/empmlsByName/${nom}`;
  return this.http.get<Employee[]>(url);
  } 

  ajouterTeam(te: Team):Observable<Team>{
    return this.http.post<Team>(this.apiURLte, te, httpOptions);
  }

  uploadImage(file: File, filename: string): Observable<Image>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);

  }
  
  loadImage(id: number): Observable<Image> {
    const url = `${apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  
  uploadImageEmpl(file: File, filename: string, id:number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/uplaodImageProd'}/${id}`;
    return this.http.post(url, imageFormData);
 }
    
 supprimerImage(id : number) {
  const url = `${apiURL}/image/delete/${id}`;
  return this.http.delete(url, httpOptions);
  }
  

  uploadImageFS(file: File, filename: string, id : number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/uploadFS'}/${id}`;
    return this.http.post(url, imageFormData);
  }


}