import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OperateurServiceService } from '../Service/operateur-service.service';
import { Operator } from '../model/operator.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dialog-list-operateurs-in-formation',
  templateUrl: './dialog-list-operateurs-in-formation.component.html',
  styleUrls: ['./dialog-list-operateurs-in-formation.component.css']
})
export class DialogListOperateursInFormationComponent implements OnInit {
  operator!: Operator;
  operatorList:Operator[]=[];
  role = localStorage.getItem('Role')
  constructor(public dialogRef: MatDialogRef<DialogListOperateursInFormationComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,private operateurService :OperateurServiceService) { }

  ngOnInit(): void {
    console.log(this.data.polyDataList)
    this.getOperateurByMatricule()
  }
  getOperateurByMatricule(){
    this.data.polyDataList.forEach((matricule: any) => {
      this.operateurService.getOperatorByMatricule(matricule).subscribe((data)=>{
        this.operator = data as Operator
        this.operatorList.push(this.operator)
        
    });
  });
  
  
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
            const mappedData = this.mapExcelData(excelData);
            console.log('Mapped Data:', mappedData);
            this.MiseAjourAvecExcel(mappedData);
        });
    };

    reader.readAsBinaryString(file);
}

mapExcelData(excelData: any[]): any[] {
    return excelData.map(row => {
        return {
            matricule: row['Matricule'],
            nomOperateur:  row['Nom,prenom'],
            date: row['Date'],
            nomLigne: row['Chaine'],
            opération: row['operation']
        };
    });
}

  MiseAjourAvecExcel(model:any){
    this.operateurService.MiseAjourAvecExcel(model , this.data.idDemandeRecrutement).subscribe(
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
