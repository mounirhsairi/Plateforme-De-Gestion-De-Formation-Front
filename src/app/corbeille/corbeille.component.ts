import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FiFServiceService } from '../Service/fifservice.service';
import { Operator } from '../model/operator.model';
import { OperateurServiceService } from '../Service/operateur-service.service';
import * as XLSX from 'xlsx';
import { Ligne } from '../model/ligne.model';
import { LigneServiceService } from '../Service/ligne-service.service';
import { OperationServiceService } from '../Service/operation-service.service';

@Component({
  selector: 'app-corbeille',
  templateUrl: './corbeille.component.html',
  styleUrls: ['./corbeille.component.css']
})
export class CorbeilleComponent implements OnInit {
  selectedFile: File | null = null;
  excelData: any[][] = [];
  ligne:Ligne[]=[];
  filtredoperators: Operator[]=[];



  constructor(private http: HttpClient,private localStorageService: FiFServiceService,private operatorService: OperateurServiceService,private ligneService :LigneServiceService,private operationService: OperationServiceService) { }
  operators: Operator[]=[];

  ngOnInit(): void {
    this.getMatricule()
    this.getAllOperator()
    this.getligne()

  }
  getAllOperator(){
    this.operatorService.getOperator().subscribe((data:any): any => {
      this.operators = data.filter((operator: { creationDate: string; }) => this.calculDifferenceDate(operator.creationDate) > 12);
      console.log(this.operators);
    })
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
 /* onFileSelected1(event: any): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();
  
    reader.onload = (e: any) => {
      const data: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
  
      workbook.SheetNames.forEach(sheetName => {
        const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        console.log('Excel Data:', excelData);
        //this.MiseAjourAvecExcel(excelData);
      });
    };
  
    reader.readAsBinaryString(file);
    
    
    console.log(this.excelData)
  }
  /*MiseAjourAvecExcel(model:any){
    this.operatorService.MiseAjourAvecExcel(model).subscribe(
      (res) => {
        console.log("Données soumises avec succès:", res);
        // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
      },
      (error) => {
        console.error("Erreur lors de la soumission des données:", error);
        // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
      }
    );
  }*/
  getOperatorByLigne(event:any){
    //let value = event.target.value
    console.log("idligne"+event.value)
    this.operationService.FilterOperatorByLigne(event.value).subscribe((data:any): any =>{
      this.operators = data.filter((operator: { creationDate: string; }) => this.calculDifferenceDate(operator.creationDate) > 12)
      //this.filtredoperators= data as Operator[]
      this.filtredoperators=data.filter((operator: { creationDate: string; }) => this.calculDifferenceDate(operator.creationDate) > 12);

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
  deleteOperatorById(idOperateur: number) {
    this.operatorService.deleteOperator(idOperateur).subscribe(() => {
      // Remove the deleted operator from the local array
      this.operators = this.operators.filter(operator => operator.id !== idOperateur);
      alert("delete successful");
    });
  }
  

}
