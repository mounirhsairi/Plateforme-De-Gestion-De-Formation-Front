import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'; // Import FormBuilder
import { Operation } from '../model/operation.model';
import { OperationServiceService } from '../Service/operation-service.service';
import { LigneServiceService } from '../Service/ligne-service.service';
import { Ligne } from '../model/ligne.model';
import { OperateurServiceService } from '../Service/operateur-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogupdate-operation',
  templateUrl: './dialogupdate-operation.component.html',
  styleUrls: ['./dialogupdate-operation.component.css']
})
export class DialogupdateOperationComponent implements OnInit {
  filtredoperations: Operation[] = [];
  ligne: Ligne[] = [];
  UpdateOperation: FormGroup; // Declare UpdateOperation as FormGroup

  constructor(
    private operationService: OperationServiceService,
    private ligneService: LigneServiceService,
    private operateurService: OperateurServiceService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {id:number } // Inject FormBuilder
  ) {
    this.UpdateOperation = this.formBuilder.group({
      idNouvelleLigne: [''], // Initialize form controls
      idOperation: ['']
    });
  }

  ngOnInit(): void {
    this.getligne();
  }

  getligne() {
    this.ligneService.getLignes().subscribe((data) => {
      this.ligne = data as Ligne[];
    });
  }

  getOperationByLigne(event: any) {
    this.operationService.getOperationByLigne(event.target.value).subscribe((data) => {
      this.filtredoperations = data as Operation[];
    });
  }

  updateOperation() {
    const idoperateur = this.data.id;
    const idoperation = this.UpdateOperation.get('idOperation')?.value;
    this.operateurService.updateoperation(idoperation ,idoperateur ).subscribe(
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
