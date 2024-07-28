import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BesoinPersonnel } from '../model/BesoinPersonnel.model';
import { DemandeService } from '../Service/demande.service';
import { LigneServiceService } from '../Service/ligne-service.service';
import { Ligne } from '../model/ligne.model';
import { OperationServiceService } from '../Service/operation-service.service';
import { Operation } from '../model/operation.model';
@Component({
  selector: 'app-dialog-besoin-personnel',
  templateUrl: './dialog-besoin-personnel.component.html',
  styleUrls: ['./dialog-besoin-personnel.component.css']
})
export class DialogBesoinPersonnelComponent implements OnInit {
  BesoinPersonnel!:FormGroup;
  demande!:BesoinPersonnel;
  ligne:Ligne[]=[]

  constructor(private build:FormBuilder,private operationService: OperationServiceService, private demandeService:DemandeService,private ligneService :LigneServiceService) { }
  
  ngOnInit(): void {
    this.getligne()

    this.BesoinPersonnel = this.build.group({
      nombre: [''],
      idOperation: [''],
      niveau: [''],
      dateDembaucheSouhaitee: [''],
      motif: [''],
      horaireDeTravail: [''], // Initialize as a string to hold the selected radio button value
      sexe: [''],
      age: [''],
      type:[''],
      etat:[''],

    });
    
  }
  Besoin(etat:string){
    this.BesoinPersonnel.get('etat')?.setValue(etat)
    const model = this.BesoinPersonnel.value
    this.demande=model;
    console.log(model)
    console.log("demande:"+this.demande.sexe.toString)
    this.demandeService.JustCreateDemandeRecutement(model).subscribe((res) => {
      console.log("Données soumises avec succès:", res);
      // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
    },
    (error) => {
      console.error("Erreur lors de la soumission des données:", error);
      // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
    }
  );

  }
  Enregistreretenvoyer(etat:string){
    this.BesoinPersonnel.get('etat')?.setValue('Envoyé_Vers_RUAP')
    const model = this.BesoinPersonnel.value
    this.demande=model;
    console.log(model)
    console.log("demande:"+this.demande.sexe.toString)
    this.demandeService.CreateDemandeRecutement(model).subscribe((res) => {
      console.log("Données soumises avec succès:", res);
      // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
    },
    (error) => {
      console.error("Erreur lors de la soumission des données:", error);
      // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
    }
  );
  }
 /* saveHoraireDetravail() {
    const horaireDetravailForm = this.BesoinPersonnel.get('horaireDetravail');
    const checkedValues: string[] = [];
  
    if (horaireDetravailForm instanceof FormGroup) {
      Object.entries(horaireDetravailForm.controls).forEach(([key, control]) => {
        if (control.value) {
          checkedValues.push(control.value); // Push the label text instead of the key
        }
      });
    }
  
    // Set the value of horaireDetravail to the checked values (checkbox label texts)
    this.BesoinPersonnel.get('horaireDetravail')?.setValue(checkedValues);
  }*/
  getligne(){
    this.ligneService.getLignes().subscribe((data)=>{
      this.ligne=data as Ligne[]
      console.log(this.ligne)
    })
  }
  operation:Operation[]=[];

  getAllOperationByLigne(event:any){
    console.log(event.target.value)
    return this.operationService.getOperationByLigne(event.target.value).subscribe((data)=>{
       this.operation= data as Operation[]
       console.log(this.operation)
    })
    
 }
}
