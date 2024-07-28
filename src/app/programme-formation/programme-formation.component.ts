import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProgramServiceService } from '../Service/program-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-programme-formation',
  templateUrl: './programme-formation.component.html',
  styleUrls: ['./programme-formation.component.css']
})
export class ProgrammeFormationComponent implements OnInit {

  

 

  integration = [
    { date: '', horaire: '8h30-9h30', duree: '1 Heure', theme: 'Sécurité', program: 'Présentation et définition des lieux de danger. Présentation de l’organisation générale et du système d’hygiène et de sécurité au travail. Les consignes de sécurité.', type: 'T', responsable: 'Secouriste', document: 'Support de formation', checked: false },
    { date: '', horaire: '9h30-10h30', duree: '1 Heure', theme: 'Règlement interne', program: 'Politique d’entreprise, Exigences clients conséquences et effet chez les clients général, Affichage et communication, Présentation du code de conduit, Règlement interne, Présentation service médicale.', type: 'T', responsable: 'Equipe RH', document: 'Support de formation', checked: false },
    { date: '', horaire: '10h30-11h30', duree: '1 Heure', theme: 'Environnement', program: 'Aspect et impact environnementaux.', type: 'T', responsable: 'Gestionnaire de déchet', document: 'Support de formation', checked: false },
    { date: '', horaire: '11h30-12h', duree: '30 minutes', theme: 'ESD', program: 'Les pratiques ESD.', type: 'T', responsable: 'Res ESD', document: 'Support de formation', checked: false }
  ];

  technicalTraining = [
    { from: '', to: '', horaire: '7h30-16h', duree: '2 heures', theme: 'Environnement', program: 'Instruction de Gestion de déchet AUW MD0002658 décrivant la maitrise du tri des différents types de déchets et leur enlèvement.', type: 'T', responsable: 'Gestionnaire de déchet', checked: false },
    { from: '', to: '', horaire: '7h30-16h', duree: 'Visite des lieux de production et les emplacements de déchet.', theme: 'Production', program: '', type: 'TP', responsable: 'Gestionnaire de déchet', checked: false },
    { from: '', to: '', horaire: '7h30-16h', duree: 'Assurer l’enlèvement quotidien des déchets des lieux de productions ainsi que les rebuts des chambres rouges vers la zone de déchet.', theme: 'Enlèvement de déchet', program: '', type: 'TP', responsable: 'Gestionnaire de déchet', checked: false },
    { from: '', to: '', horaire: '7h30-16h', duree: 'Assurer l’organisation et la propreté de la zone de déchet (identification, traçage, propreté...)', theme: 'Organisation de la zone de déchet', program: '', type: 'TP', responsable: 'Gestionnaire de déchet', checked: false },
    { from: '', to: '', horaire: '7h30-16h', duree: 'Remplissage du bilan hebdomadaire de déchet', theme: 'Documents', program: '', type: 'T', responsable: 'Gestionnaire de déchet', checked: false },
    { from: '', to: '', horaire: '7h30-16h', duree: 'Recevoir les collecteurs externes et les assister lors d’enlèvement des déchets. Préserver les contenants des collecteurs mis à notre disposition contre endommagement. Respecter le temps d’enlèvement.', theme: 'Relation avec les collecteurs', program: '', type: 'T', responsable: 'Gestionnaire de déchet', checked: false },
    { from: '', to: '', horaire: '7h30-16h', duree: 'Communication (passation de l’information avec les différents vis-à-vis : assistante transit, chef hiérarchique, douanier…). Communication entre les collègues (Respect, Collaboration). Principe 5S. MOS « Marquardt Operating System ».', theme: 'Communication', program: '', type: 'T', responsable: 'Gestionnaire de déchet', checked: false }
  ];

  evaluation = {
    evaluation1: '',
    evaluation2: ''
  };
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(    @Inject(MAT_DIALOG_DATA) public data: {id: number },
  private _formBuilder: FormBuilder,private program :ProgramServiceService) {
    this.firstFormGroup = this._formBuilder.group({
      dateDebut: [''],
      dateFin: [''],
      theme: [''],
     // programme: this._formBuilder.array([]),
      type: [''],
      etat: [''],
      duree: [''],
      partie: [''],
      doc: [''],
      resp: [''],
    });

    this.secondFormGroup = this._formBuilder.group({
      nom: [''],
      sessionFormation: this._formBuilder.array([
        this.firstFormGroup
      ])
    });
  }
  
  ngOnInit(): void {
    console.log(this.secondFormGroup.value)
  }
  addintegration(){
    const integration =this.integration[1]
    this.integration.push(integration)
  
  }
  createSesssion(){
    const model = this.firstFormGroup.value
    this.program.creerSession(model,this.data.id).subscribe((res) => {
      console.log("Données soumises avec succès:", res);
      // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
    },
    (error) => {
      console.error("Erreur lors de la soumission des données:", error);
      // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
    })
  }
  

}
