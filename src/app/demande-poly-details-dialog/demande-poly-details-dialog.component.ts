import { Component, Inject, OnInit } from '@angular/core';
import { demandePolyvalence } from '../model/DemandePolyvalence.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LigneServiceService } from '../Service/ligne-service.service';
import { OperateurServiceService } from '../Service/operateur-service.service';
import { Operator } from '../model/operator.model';
import { Ligne } from '../model/ligne.model';

@Component({
  selector: 'app-demande-poly-details-dialog',
  templateUrl: './demande-poly-details-dialog.component.html',
  styleUrls: ['./demande-poly-details-dialog.component.css']
})
export class DemandePolyDetailsDialogComponent implements OnInit {
  demande: demandePolyvalence; // Utilisez le type correct ici
  operators: Operator[]=[];
  ligne:Ligne[]=[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: demandePolyvalence,private ligneService :LigneServiceService,private operatorService: OperateurServiceService,) {
    this.demande = data;
    
   }

  ngOnInit(): void {
    this.getAllOperator()
    this.getligne()
    console.log(this.demande)
  }
  calculDifferenceDate(creationDate:string){
    const currentDate = new Date();
    const [datePart, timePart] = creationDate.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hour, minute] = timePart.split(':');
    const creationDateObject = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));

    const diffYears = currentDate.getFullYear() - creationDateObject.getFullYear();
    const diffMonths = (diffYears * 12) + (currentDate.getMonth() - creationDateObject.getMonth());
    //console.log("now :"+currentDate.getMonth())
    //console.log("creationmonth:"+creationDateOfThirdItem.getMonth())
    return diffMonths ;
  }
  getAllOperator(){
    this.operatorService.getOperator().subscribe((data:any): any => {
      this.operators = data.filter((operator: { creationDate: string; }) => this.calculDifferenceDate(operator.creationDate) < 9);
      console.log(this.operators);
      console.log(this.calculDifferenceDate(this.operators[5].creationDate))
    })
  }
  getligne(){
    this.ligneService.getLignes().subscribe((data)=>{
      this.ligne=data as Ligne[]
      console.log(this.ligne)
    })
  }

}
