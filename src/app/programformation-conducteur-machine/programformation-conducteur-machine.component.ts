import { Component, Input, OnInit } from '@angular/core';
import { ProgramServiceService } from '../Service/program-service.service';
import { ProgramFormation } from '../model/TrainingItem.model';
import { MatDialog } from '@angular/material/dialog';
import { ProgrammeFormationComponent } from '../programme-formation/programme-formation.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as html2pdf from 'html2pdf.js';
import { ListProgramme } from '../model/ListProgramme.model';
import { LigneServiceService } from '../Service/ligne-service.service';
import { Ligne } from '../model/ligne.model';
import { OperationServiceService } from '../Service/operation-service.service';
import { Operation } from '../model/operation.model';
import { OperateurServiceService } from '../Service/operateur-service.service';
import { Operator } from '../model/operator.model';

@Component({
  selector: 'app-programformation-conducteur-machine',
  templateUrl: './programformation-conducteur-machine.component.html',
  styleUrls: ['./programformation-conducteur-machine.component.css']
})
export class ProgramformationConducteurMachineComponent implements OnInit {
  
  componentprogram:boolean=true
  programList:ListProgramme[]=[]
  program1!: ProgramFormation;
  @Input() operateur: any ='';
  @Input() add:boolean =true;
  constructor(private program :ProgramServiceService,private dialog :MatDialog ,private operateurservice :OperateurServiceService ,private ligneservice:LigneServiceService,private operationservice:OperationServiceService) {
    
   }

  ngOnInit(): void {
    this.getAllprogram()
    this.getoperateurs()
    this.getAlllignes()
    //this.getListProgrammeBysession(1)
  }
  
  
  programFormation:ProgramFormation[]=[]
  getAllprogram(){
    this.program.getAllProgram().subscribe((data)=>{
      this.programFormation =data as ProgramFormation[]
      console.log(this.programFormation)
    })
  }
  programsBySession: { [sessionId: number]: ListProgramme[] } = {};
  getListProgrammeBysession(id: any): void {
    this.program.getListProgrammeBysession(id).subscribe((data) => {
      this.programsBySession[id] = data as ListProgramme[];
    });
  }
  openDialog(): void {
    
        const dialogRef = this.dialog.open(ProgrammeFormationComponent, {
          width: '1000px',

          data: {id:this.program1.id}

        });
  
        dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed');
          console.log('Result:', result);
        });
      
    }
  
 /* createSesssion(model:any,id:any){
    this.program.creerSession(model,id).subscribe((res) => {
      console.log("Données soumises avec succès:", res);
      // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
    },
    (error) => {
      console.error("Erreur lors de la soumission des données:", error);
      // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
    })
  }*/
    inputValue: string = '';

  addtosession(id:any,model:any){
    
    this.program.addtosession(id,model).subscribe((res) => {
    console.log("Données soumises avec succès:", res);
    // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
  },
  (error) => {
    console.error("Erreur lors de la soumission des données:", error);
    // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
  })
}
nomProgram:any
onChipClick(event: Event) {
  const target = event.target as HTMLSelectElement;
  const selectedValue = target.value;
  this.nomProgram = selectedValue;
  // Vous pouvez ajouter ici toute logique supplémentaire
  console.log(selectedValue);
  this.getprogram(selectedValue)
}

getprogram(id:any)
  {
  this.program.getProgram(id).subscribe((data) => {
  this.program1 = data as ProgramFormation;
  console.log(this.program1)
  if (this.program1 && this.program1.sessionFormation) {
    this.program1.sessionFormation.forEach(session => {
      this.getListProgrammeBysession(session.id); // Adjust according to your actual session ID structure
    });
  }
});
}


generatePdf() {
  const element = document.getElementById('content');
  const options = {
    margin: [5, 0, 0, 5],
    filename: 'document.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'pt', format: 'a4' },
    pagebreak: { mode: [ 'css', 'legacy'] } // Prevents cutoff issues
  };

  html2pdf().from(element).set(options).save();
}


deleteprogramme(id:any){
  this.program.delete(id).subscribe(()=>{
    alert("delete successful");
  })
}
deletesession(id:any){
  this.program.deletesession(id).subscribe(()=>{
    alert("delete successful");
  })
}
lignes:Ligne[]=[]
getAlllignes(){
 this.ligneservice.getLignes().subscribe((data)=>{
  this.lignes=data as Ligne[]
 })
}
operation:Operation[]=[]
getoperationByLigne(event:any){

  this.operationservice.getOperationByLigne(event.target.value).subscribe((data)=>{
    this.operation =data as Operation[]
  })
}
operateurs:Operator[]=[]
getoperateurs(){

  this.operateurservice.getOperator().subscribe((data)=>{
    this.operateurs = data as Operator[]
    console.log(this.operateurs)
  })
}

filtered:Operator[]=[]
getOperateursByOperations(event: any): void {
  const idOperation = +event.target.value; // convert the value to a number
  this.filtered = this.operateurs.filter(operateur => 
    operateur.assignments.some(assign => 
      assign.idOperation === idOperation && 
      assign.evaluation.some(evaluation => evaluation.evaluationTotal === "100" && evaluation.idOperation ===idOperation)
    )
  );
  console.log(idOperation);
}


}
