import { Component, OnInit } from '@angular/core';
import { OperateurServiceService } from '../Service/operateur-service.service';
import { Operator } from '../model/operator.model';
import { OperationServiceService } from '../Service/operation-service.service';
import { Operation } from '../model/operation.model';
import { LigneServiceService } from '../Service/ligne-service.service';
import { Ligne } from '../model/ligne.model';
import { EvaluationServiceService } from '../Service/evaluation-service.service';
import { Evaluation } from '../model/Evaluation.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: '/Matrice',
  templateUrl: './matrice-de-competence.component.html',
  styleUrls: ['./matrice-de-competence.component.css']
})
export class MatriceDeCompetenceComponent implements OnInit {
filtreLigne: any;
  originalOperation: Operation[] =[];
filterByLigne($event: MatSelectChange) {
throw new Error('Method not implemented.');
}
  operators: Operator[]=[];
  allOperator: Operator[]=[];
  filtredoperatorsbyLigne:Operator[]=[];
  operator!: Operator;
  ligne:Ligne[]=[];
  filtredoperators: Operator[]=[];
 Operations:Operation[]=[];
 effectifsFormes:number=5
 effectifsFormes1:number=5

 objectifs: number[] = [];
 objectifs1:number= 0
evaluation: Evaluation[]=[];

 
  constructor(private ligneService :LigneServiceService,private operatorService: OperateurServiceService,private operationService: OperationServiceService,private evaluationService :EvaluationServiceService) { }

  ngOnInit(): void {
    this.getAllOperator()
    this.getligne()
    this.getAllOperations1()
    //this.getAllEvaluation()
  }
  /*get besoin(): number {
    return this.objectifs - this.effectifsFormes;
  }*/
  get besoin1(): number {
    return this.objectifs1 - this.effectifsFormes1;
  }
  getAllOperator(){
    this.operatorService.getOperator().subscribe((data)=>{
      this.operators=data as Operator[] ;
      this.allOperator=data as Operator[] ;
      console.log(this.operators);
    })
  }
  getAllOperations1(){
    this.operationService.getOperations().subscribe((data)=>{
      this.originalOperation=data as Operation[]
      console.log(this.Operations)
    })
  }
  getAllOperations(id:number){
    this.operationService.getOperationByLigne(id).subscribe((data)=>{
      this.Operations=data as Operation[];
      this.originalOperation=data as Operation[]
      console.log(this.Operations)
    })
  }
  getligne(){
    this.ligneService.getLignes().subscribe((data)=>{
      this.ligne=data as Ligne[]
      console.log(this.ligne)
    })
  }
  affichebyLigne:boolean | undefined
  getOperatorByLigne(event:any){
    //let value = event.target.value
    console.log("idligne"+event.value)
    this.operationService.FilterOperatorByLigne(event.value).subscribe((data)=>{
      this.operators = data as Operator[]
      this.filtredoperators= data as Operator[]
      this.filtredoperatorsbyLigne= data as Operator[]

      this.affichebyLigne= true
      this.affichebyoperateur=false
      this.originalOperation.filter(operation => operation.idLigne === event.value)
      console.log(this.filtredoperators);      
    })
   
    console.log(this.filtredoperators)
    this.getAllOperations(event.value)
  }
  selectedOperation:any
  getOperatorByOperation(event:any){
    this.affichebyLigne=false;
    this.affichebyoperateur=false;
    this.selectedOperation = event.value;
    console.log(this.selectedOperation)
    this.operators = [...this.allOperator];

    this.operators = this.operators.filter(operator => 
      operator.assignments.some(assignment => assignment.idOperation === this.selectedOperation)
  );
  
  this.filtredoperators = this.filtredoperatorsbyLigne.filter(operator => 
    operator.assignments.some(assignment => assignment.idOperation === this.selectedOperation)
);

  console.log(this.filtredoperators);
  }
 /* getAllEvaluation(){
    return this.evaluationService.getAllEvaluation().subscribe((data)=>{
       this.evaluation= data as Evaluation[] ;
       console.log(this.evaluation)
    })
  }
  */
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
  getColor(evaluationTotal: string, creationDate: string): string {
    const total = parseInt(evaluationTotal);
    const dateDifference = this.calculDifferenceDate(creationDate);

    if (total < 75 || dateDifference > 6) {
        return 'red';
    } else {
        return 'green';
    }
}
  affichebyoperateur: boolean = false;
onSearchResults(results: Operator[]): void {
  console.log(results)
 this.operators = results;
 this.affichebyoperateur=true
 this.affichebyLigne= false

}
isUnique(originalOperation: any[], index:number) {
  const lineNames = originalOperation.slice(0, index).map(a => a.operationName);
  return !lineNames.includes(originalOperation[index].operationName);
}
}
