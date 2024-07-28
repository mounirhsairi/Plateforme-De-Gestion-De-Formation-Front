import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogFIFComponent } from '../dialog-fif/dialog-fif.component';
import { FiFServiceService } from '../Service/fifservice.service';
import { FiF } from '../model/FIF.model';
import { OperateurServiceService } from '../Service/operateur-service.service';
import { Operator } from '../model/operator.model';
import { Ligne } from '../model/ligne.model';
import { OperationServiceService } from '../Service/operation-service.service';
import { LigneServiceService } from '../Service/ligne-service.service';

@Component({
  selector: 'app-fiches',
  templateUrl: './fiches.component.html',
  styleUrls: ['./fiches.component.css']
})
export class FichesComponent implements OnInit {
  files:FiF[]=[];
  ligne:Ligne[]=[];

  filtredoperators: Operator[]=[];

  operators: Operator[]=[];

  constructor(private dialog :MatDialog ,private FiFService:FiFServiceService,private operatorService: OperateurServiceService ,private ligneService :LigneServiceService,private operationService: OperationServiceService) { }

  ngOnInit(): void {

    //this.getAllFiF()
    this.getMatricule()
    this.getAllOperator()
    this.getligne()
  }
  openDialog(operatorId: number): void {
    this.FiFService.getFiFByOperator(operatorId).subscribe((data) => {
        const dialogRef = this.dialog.open(DialogFIFComponent, {
          width: '3000px',

          data: { files: data as FiF[] ,id:operatorId}
        });
  
        dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed');
          console.log('Result:', result);
        });
      
    });
  }
  

   
    getAllOperator(){
      this.operatorService.getOperator().subscribe((data)=>{
        this.operators=data as Operator[] ;
        console.log(this.operators);
        
      })
    }
    /*getFiFsByOperator(){
       this.FiFService.getFiFByOperator().subscribe((data)=>{
          this.files =data as FiF[]
        })
    }*/
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
    getOperatorByLigne(event:any){
      //let value = event.target.value
      console.log("idligne"+event.value)
      this.operationService.FilterOperatorByLigne(event.value).subscribe((data:any): any =>{
        this.operators = data.filter((operator: { creationDate: string; }) => this.calculDifferenceDate(operator.creationDate) < 12)
        //this.filtredoperators= data as Operator[]
        this.filtredoperators=data.filter((operator: { creationDate: string; }) => this.calculDifferenceDate(operator.creationDate) < 12);
  
      })
      console.log(this.operators)
      //console.log(value)*/
    }
    originalOperators: Operator[] = [];

    findOperatorByMatricule(event: any) {
      const matricule = event.value;
      console.log("matricule: " + matricule);
      
      // Si la liste d'opérateurs d'origine n'a pas encore été sauvegardée, sauvegardez-la
      if (!this.originalOperators.length) {
        this.originalOperators = [...this.operators];
      }
      
      // Si une matricule est sélectionnée
      if (matricule && matricule !== "all") {
        // Filtrer les opérateurs basés sur la matricule sélectionnée
        this.operators = this.originalOperators.filter(operator => operator.matriculeOperateur === matricule && this.calculDifferenceDate(operator.creationDate) < 12);
      } else {
        // Si "all" est sélectionné ou aucune matricule n'est sélectionnée, afficher tous les opérateurs d'origine
        this.operators = [...this.originalOperators];
      }
    }
    getMatricule(){
      this.operatorService.getOperator().subscribe((data:any): any=>{
          this.filtredoperators= data.filter((operator: { creationDate: string; }) => this.calculDifferenceDate(operator.creationDate) < 12)
          //this.filtredoperators= data as Operator[]
      })
    }
    getligne(){
      this.ligneService.getLignes().subscribe((data)=>{
        this.ligne=data as Ligne[]
        console.log(this.ligne)
      })
    }
    onSearchResults(results: Operator[]): void {
      //console.log(results)
     this.operators = results;
   }
    
}
