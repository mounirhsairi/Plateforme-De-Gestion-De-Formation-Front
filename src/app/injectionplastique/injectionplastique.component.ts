import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-injectionplastique',
  templateUrl: './injectionplastique.component.html',
  styleUrls: ['./injectionplastique.component.css']
})
export class InjectionplastiqueComponent implements OnInit {

  trainingForm!: FormGroup;

  operations = [
    { controlName: 'injectionAutomatique', label: 'Injection automatique' },
    { controlName: 'sablage', label: 'Sablage' },
    { controlName: 'decoupage', label: 'Découpage' },
    { controlName: 'pesageEmballage', label: 'Pesage & Emballage' },
    { controlName: 'montageMoule', label: 'Montage moule' },
    { controlName: 'injectionManuelle', label: 'Injection manuelle' },
    { controlName: 'pesage', label: 'Pesage' },
    { controlName: 'controleQualiteVisuel', label: 'Contrôle qualité visuel' },
    { controlName: 'manipulationMatieresVierge', label: 'Manipulation matières vierge' },
    { controlName: 'manipulationMatieresBroyee', label: 'Manipulation matières broyée' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.trainingForm = this.fb.group({
      nomPrenom: [''],
      niveauInstruction: [''],
      dateEmbauche: [''],
      dateAffectation: [''],
      fonction: [{ value: 'Opérateur injection plastique', disabled: true }],
      affectation: [''],
      tuteur: [''],
      periodeFormation: [''],
      fonctionEncadrement: [''],
      nombreJours: [{ value: '20 jours', disabled: true }],
      // Add controls for operations
      injectionAutomatique: [false],
      sablage: [false],
      decoupage: [false],
      pesageEmballage: [false],
      montageMoule: [false],
      injectionManuelle: [false],
      pesage: [false],
      controleQualiteVisuel: [false],
      manipulationMatieresVierge: [false],
      manipulationMatieresBroyee: [false],
      // Add controls for integration
      integrationDate: [''],
      integrationHoraire: [''],
      integrationDuree: [''],
      integrationTheme: [''],
      integrationProgramme: [''],
      integrationType: [''],
      integrationResponsable: [''],
      integrationDocument: ['']
    });
  }

  onSubmit() {
    console.log(this.trainingForm.value);
  }

}
