import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { demandeRecrutement } from '../model/DemandeRecrutement.model';
import { DemandeService } from '../Service/demande.service';

@Component({
  selector: 'app-dialog-demande-details',
  templateUrl: './dialog-demande-details.component.html',
  styleUrls: ['./dialog-demande-details.component.css']
})
export class DialogDemandeDetailsComponent implements OnInit {
  demande: demandeRecrutement; // Utilisez le type correct ici
  constructor(@Inject(MAT_DIALOG_DATA) public data: demandeRecrutement,private demandeService:DemandeService) {
    // Assigner les données à la propriété demande
    this.demande = data;
  }
  // Other methods and properties of the component


  ngOnInit(): void {
    console.log(this.data)
    this.demande = this.data;

  }
  onUpdateDemande(id: any ,model:any) {
   // const model = this.BesoinPersonnel.value;
    //console.log(model);
    this.demandeService.UpdateDemandeRecrutement(id, model).subscribe(
      (res) => {
        console.log("Données mise à jour avec succès:", res);
        alert("Données mises à jour avec succès");
        // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
      },
      (error) => {
        console.error("Erreur lors de mise à jour des données:", error);
        // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
      }
    );
  }

}
