import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperateurServiceService } from '../Service/operateur-service.service';

@Component({
  selector: 'app-dialog-qualification',
  templateUrl: './dialog-qualification.component.html',
  styleUrls: ['./dialog-qualification.component.css']
})
export class DialogQualificationComponent implements OnInit {
  UpdateQualification!: FormGroup; // Declare UpdateOperation as FormGroup

  constructor(private formBuilder: FormBuilder ,@Inject(MAT_DIALOG_DATA) public data: {id:number },private operateurService: OperateurServiceService,
) { 

    this.UpdateQualification = this.formBuilder.group({
      qualification: [''], // Initialize form controls
    });

  }

  ngOnInit(): void {
  }
  updateQualification() {
    const idoperateur = this.data.id;
    const qualification = this.UpdateQualification.get('qualification')?.value;
    this.operateurService.updateQualification(qualification ,idoperateur ).subscribe(
      (res) => {
        console.log('Données soumises avec succès:', res);
        // You can display a success message or perform other actions upon successful submission
      },
      (error) => {
        console.error('Erreur lors de la soumission des données:', error);
        // Handle error appropriately, e.g., display an error message to the user
      }
    );
  }
}
