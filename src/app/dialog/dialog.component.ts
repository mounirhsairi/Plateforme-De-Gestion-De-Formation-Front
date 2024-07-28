import { Component, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OperateurServiceService } from '../Service/operateur-service.service';
import { Operator } from '../model/operator.model';
import { OperationServiceService } from '../Service/operation-service.service';
import { Operation } from '../model/operation.model';
import { LigneServiceService } from '../Service/ligne-service.service';
import { Ligne } from '../model/ligne.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  showForm: boolean = false;
  operation:Operation[]=[];
  ligne:Ligne[]=[];
  form!:FormGroup;
  file!: File | null;
  urlimg:string | ArrayBuffer ="";
    constructor(private build:FormBuilder,private operatorService: OperateurServiceService,private ngZone: NgZone,private operationService: OperationServiceService, private ligneService :LigneServiceService) { }

  ngOnInit(): void {
    this.getAllLignes()
    this.getAllOperations()
    this.form=this.build.group({
      telephone:'',

      chaine:'',
      etat: '',
      image: '',
      matriculeOperateur : '',

      nomOperateur : '',

      pdfFiles: '',

      assignments: '',

      uap: '',
      idOperation:''
    })
    
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }
  
 
  addoperator() {
    const model = this.form.value;
    const idOperation =this.form.get('idOperation')?.value
    console.log(idOperation)
  
    this.operatorService.postOperator(model).subscribe(
      (res) => {
        console.log("Données soumises avec succès:", res);
        // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
      },
      (error) => {
        console.error("Erreur lors de la soumission des données:", error);
        // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
      }
    );
  }
  onFileSelected(event: any) {
    this.ngZone.run(() => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const imageUrl = reader.result as string;
        console.log(imageUrl)
        // Set the data URL as the first element of the 'image' array
        this.form.get('image')?.setValue(reader.result as string);
      };
  
      reader.readAsDataURL(file); // Read the file as data URL
    } else {
      console.error('No files selected.');
    }
  
  });
}

getAllLignes(){
  return this.ligneService.getLignes().subscribe((data)=>{
    this.ligne = data as Ligne[]

  })
}
getAllOperations(){
return this.operationService.getOperations().subscribe((data)=>{
  this.operation=data as Operation[]
})
}
  
getAllOperationByLigne(event:any){
   console.log(event.target.value)
   return this.operationService.getOperationByLigne(event.target.value).subscribe((data)=>{
      this.operation= data as Operation[]
      console.log(this.operation)
   })
   
}
onFileSelected1(event: any): void {
  const file: File = event.target.files[0];
  const reader: FileReader = new FileReader();

  reader.onload = (e: any) => {
    const data: string = e.target.result;
    const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });

    workbook.SheetNames.forEach(sheetName => {
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log('Excel Data:', excelData);
      this.MiseAjourEtatAvecExcel(excelData)
    });
  };

 reader.readAsBinaryString(file);
}
MiseAjourEtatAvecExcel(model:any){
  this.operatorService.MiseAjourEtatAvecExcel(model).subscribe(
    (res) => {
      console.log("Données soumises avec succès:", res);
      // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
    },
    (error) => {
      console.error("Erreur lors de la soumission des données:", error);
      // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
    }
  );
}
}
