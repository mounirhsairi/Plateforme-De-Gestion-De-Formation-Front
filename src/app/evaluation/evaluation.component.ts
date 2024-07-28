import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { DialogEvaluationComponent } from '../dialog-evaluation/dialog-evaluation.component';
import { DialogEvaluationParAgentFormationComponent } from '../dialog-evaluation-par-agent-formation/dialog-evaluation-par-agent-formation.component';
import { DialogEvaluationParChefDeLigneComponent } from '../dialog-evaluation-par-chef-de-ligne/dialog-evaluation-par-chef-de-ligne.component';
import { DialogEvaluationMaintenanceComponent } from '../dialog-evaluation-maintenance/dialog-evaluation-maintenance.component';
import { EvaluationServiceService } from '../Service/evaluation-service.service';
import { Evaluation } from '../model/Evaluation.model';
import { Operator } from '../model/operator.model';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  evaluation :Evaluation[]=[]
  role =localStorage.getItem('Role');

  ligneIds=localStorage.getItem('idLignes')
  checkboxData = [
    { checked: false, percentage: 10 },
    { checked: false, percentage: 20 },
    { checked: false, percentage: 50 },
    { checked: false, percentage: 20 }
  ];
  checkboxDataMaintenance = [
    { value:"l'employé applique correctement AUW" ,checked: false, percentage: 50 },
    { value:"l'employé applique correctement trouble shooting guide" ,checked: false, percentage: 20 },
   
  ];
  checkboxDataCL = [
    { value:"l'employé est fomré sur les 5S" ,checked: false, percentage: 50 },
    { value:"l'employé réalise 75% de l'objectif de la qualité" ,checked: false, percentage: 20 },
    { value:"l'employé sait remplir et lire les fiches de traail (Andon sheets ,fiche de nettoyage , temps d'arret" ,checked: false, percentage: 50 },
    { value:"l'employé respecte le test ESD" ,checked: false, percentage: 50 },
    { value:"l'employé met le tenus et les moyens de protecion ESD correctement" ,checked: false, percentage: 50 },

  ];
  checkboxDataQualité = [
    { value:"l'employé respecte et applique correctement la procédure de validation processus production" ,checked: false, percentage: 50 },
    { value:"l'employé applique la gestion d'escalade" ,checked: false, percentage: 20 },
    { value:"l'employé applique la gestion des produits non conforme (Procédure MD0018008) " ,checked: false, percentage: 20 },
    { value:"l'employé applique l'instruction de contole et sait remplir et lire les fiches de travail lier a la qualité ex:CSD ,Carte de mesure ,Carte de Controle Fiche" ,checked: false, percentage: 20 },
    { value:"l'employé est formé sur l'impact ESD sur le produit" ,checked: false, percentage: 20 },

  ];
  percentageResult!: number;
  percentageResult1!: number;
  percentageResult3!: number;
  percentageResult2!: number;
  operators: Operator[]=[];

  constructor(private dialog :MatDialog , private evaluationService:EvaluationServiceService) { }

  ngOnInit(): void {
    this.getAllEvaluation()
    console.log(this.ligneIds)
  }
 
  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogEvaluationParAgentFormationComponent, {
      width: '1000px',
      data: { id: id, checkboxData: this.checkboxData } // Correction ici
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('the dialog was closed');
      console.log('result:', result);
      if (typeof result === 'number') {
        this.percentageResult = result;
      }
    });
  }
    openDialog1(id: number):void{
      const dialogRef=this.dialog.open(DialogEvaluationParChefDeLigneComponent,{
        width:'1000px',
        data: { id: id, checkboxData: this.checkboxDataCL } // Correction ici
      }
        );
      dialogRef.afterClosed().subscribe((result)=>{
        console.log('the dialog was closed');
        console.log('result:',result);
        if (typeof result === 'number') {
          this.percentageResult1 = result;
        }
      })
      }
      openDialog2(id: number):void{
        const dialogRef=this.dialog.open(DialogEvaluationComponent,{
          width:'1000px',
          data: { id: id, checkboxData: this.checkboxDataQualité } // Correction ici
        }
          );
        dialogRef.afterClosed().subscribe((result)=>{
          console.log('the dialog was closed');
          console.log('result:',result);
          if (typeof result === 'number') {
            this.percentageResult2 = result;
          }
        })
        }
        openDialog3(id: number):void{
          const dialogRef=this.dialog.open(DialogEvaluationMaintenanceComponent,{
            width:'1000px',
            data: { id: id, checkboxData: this.checkboxDataMaintenance } // Correction ici
          }
            );
          dialogRef.afterClosed().subscribe((result)=>{
            console.log('the dialog was closed');
            console.log('result:',result);
            if (typeof result === 'number') {
              this.percentageResult3 = result;
            }
          })
          }

          Originalevaluation:Evaluation[]=[]
          getAllEvaluation(){
            this.evaluationService.getAllEvaluation().subscribe((data)=>{
              this.evaluation = data as Evaluation[]
              this.Originalevaluation = data as Evaluation[]

              console.log( this.evaluation)
            })
          }  
          onSearchResults(results: Evaluation[]): void {
    console.log(results);
    this.evaluation = results;

  
  }
}

          
         

