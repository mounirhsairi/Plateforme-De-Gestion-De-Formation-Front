import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EvaluationServiceService } from '../Service/evaluation-service.service';

@Component({
  selector: 'app-dialog-evaluation',
  templateUrl: './dialog-evaluation.component.html',
  styleUrls: ['./dialog-evaluation.component.css']
})
export class DialogEvaluationComponent implements OnInit {
   qualite!:number
  constructor(public dialogRef: MatDialogRef<DialogEvaluationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private evaluationService:EvaluationServiceService) { }


  ngOnInit(): void {

    
  }
  calculateTotalPercentage(): number {
    const checkedCheckboxes = this.data.checkboxData.filter((item: { checked: any; }) => item.checked);
    const total = checkedCheckboxes.reduce((accumulator: number, checkbox: { percentage: any; }) => accumulator + checkbox.percentage, 0);
    return total;
}
  updateEvaluation() {
    //const total = this.calculateTotalPercentage().toString();
    this.evaluationService.updateEvaluationQualite(this.data.id, this.qualite.toString()).subscribe(
        (res) => {
            console.log("Données mises à jour avec succès:", res);
            alert("Données mises à jour avec succès");

            // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
        },
        (error) => {
            console.error("Erreur lors de la mise à jour des données:", error);
            // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
        }
    );
}
openPdf() {
  window.open('assets/guide.pdf', '_blank');
}
}

