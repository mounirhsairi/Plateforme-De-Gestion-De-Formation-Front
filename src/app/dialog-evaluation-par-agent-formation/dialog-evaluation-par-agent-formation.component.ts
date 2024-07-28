import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EvaluationServiceService } from '../Service/evaluation-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-evaluation-par-agent-formation',
  templateUrl: './dialog-evaluation-par-agent-formation.component.html',
  styleUrls: ['./dialog-evaluation-par-agent-formation.component.css']
})
export class DialogEvaluationParAgentFormationComponent implements OnInit {
  form!: FormGroup;
  total: number = 0;

  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<DialogEvaluationParAgentFormationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private evaluationService:EvaluationServiceService) { }

  ngOnInit(): void {
    console.log(this.data)
    this.form = this.fb.group({
      testESD: [''],
      testFormationDeBase: [''],
      testEnvironnement: ['']
    });
    this.form.valueChanges.subscribe(values => {
      this.calculateTotal(values);
    });
  }
  calculateTotal(values: any) {
    this.total = Object.values(values).reduce((acc: number, value: any) => {
      return acc + (parseFloat(value) || 0);
    }, 0);
  }
 /* calculateTotalPercentage(): number {
    const checkedCheckboxes = this.data.checkboxData.filter((item: { checked: any; }) => item.checked);
    const total = checkedCheckboxes.reduce((accumulator: number, checkbox: { percentage: any; }) => accumulator + checkbox.percentage, 0);
    return total;
}*/

updateEvaluation() {
    this.evaluationService.updateEvaluationAgentFormation(this.data.id, (this.total/3).toString()).subscribe(
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
