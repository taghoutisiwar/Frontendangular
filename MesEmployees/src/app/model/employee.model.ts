import { Team } from "./team.model";
import { Image } from "./Image.model";

export class Employee {
    id! : number;
    nom! : string;
    prenom! : string;
    salaire! : number ;
    dateRec! : Date ; 
    team! : Team;
    image! : Image;
    imageStr!:string
    images!: Image[];
}