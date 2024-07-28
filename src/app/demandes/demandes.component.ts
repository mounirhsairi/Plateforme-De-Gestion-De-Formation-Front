import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../Service/demande.service';
import { demandeRecrutement } from '../model/DemandeRecrutement.model';
import { demandePolyvalence } from '../model/DemandePolyvalence.model';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogDemandeDetailsComponent } from '../dialog-demande-details/dialog-demande-details.component';
import { FiFServiceService } from '../Service/fifservice.service';
import { FiF } from '../model/FIF.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DemandePolyDetailsDialogComponent } from '../demande-poly-details-dialog/demande-poly-details-dialog.component';
import { LigneServiceService } from '../Service/ligne-service.service';
import { Ligne } from '../model/ligne.model';
import { DialogAlldemandesComponent } from '../dialog-alldemandes/dialog-alldemandes.component';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit {
  showForm: boolean = false;
  BesoinPersonnel!:FormGroup;

  type:string ="Recrutement"
  demandeRecrutement : demandeRecrutement[]=[]
  demandePolyvalence: demandePolyvalence[]=[]
  role =localStorage.getItem('Role');
  originalDemandeDeRecrutement: demandeRecrutement[] = [];
  filteredDemandeDeRecrutement: demandeRecrutement[] = [];
  creationDatesRec: any[] = [];
  creationDatesPoly: any[] = [];

  originalDemandePoly: demandePolyvalence[] = [];
  filteredDemandePoly: demandePolyvalence[] = [];
  ligne: Ligne[] = [];
  constructor(private ligneService :LigneServiceService ,private build:FormBuilder,private dialog :MatDialog ,private demandeService:DemandeService,private FIFService:FiFServiceService) { }

  ngOnInit(): void {
    this.getAllDemandeRecrutement();
    this.getAllDemandePolyvalence();
    this.getligne();
    this.BesoinPersonnel = this.build.group({
      id: ['2'],
      nombre: ['11'],
      idOperation: ['1'],
      niveau: [''],
      dateDembaucheSouhaitee: [''],
      motif: [''],
      horaireDeTravail: [''],
      sexe: ['Masculin'],
      age: [''],
      type: [''],
    });
   
  }
  toggleForm() {
    this.showForm = !this.showForm;
    this.type = this.type === 'Recrutement' ? 'Polyvalence' : 'Recrutement';

  }
  getAllDemandeRecrutement(){
    this.demandeService.getAllDemandeRecrutement().subscribe((data)=>{
      this.demandeRecrutement = data as demandeRecrutement[]
      this.originalDemandeDeRecrutement=data as demandeRecrutement[]
      this.filteredDemandeDeRecrutement=data as demandeRecrutement[]
      this.getdatecreationDR()

      console.log(this.demandeRecrutement )
    })

  }
  getAllDemandePolyvalence(){
    this.demandeService.getAllDemandePolyvalence().subscribe((data)=>{
      this.demandePolyvalence= data as demandePolyvalence[]
      this.originalDemandePoly=data as demandePolyvalence[]
      this.filteredDemandePoly=data as demandePolyvalence[]
      this.getdatecreationPoly()
      console.log(this.demandePolyvalence )
    })
  }
  UpdateEtatDemande(idDemande:number ,etat:string){
    this.demandeService.UpdateEtatDemande(idDemande,etat).subscribe((res) => {
      console.log("Données mise a jour avec succès:", res);
      alert("Données mises à jour avec succès");

      // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
    },
    (error) => {
      console.error("Erreur lors de mise a jour des données:", error);
      // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
    }
  );
  }
  
  UpdateEtatDemandePoly(idDemande:number ,etat:string){
    this.demandeService.UpdateEtatDemandePoly(idDemande,etat).subscribe((res) => {
      console.log("Données mise a jour avec succès:", res);
      alert("Données mises à jour avec succès");

      // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
    },
    (error) => {
      console.error("Erreur lors de mise a jour des données:", error);
      // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
    }
  );
  }
  openDialog(demandeId: number): void {
    this.demandeService.getDemandeRecrutementById(demandeId).subscribe((data) => {
      const dialogRef = this.dialog.open(DialogDemandeDetailsComponent, {
        width: '800px',
        data:  data as demandeRecrutement // Pass the fetched files as data to the dialog

      });
      
      // Subscribe to the afterClosed event of the dialog
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        console.log('Result:', result);
      });
    });
  }
  deletedemandeRecrutement(id:any){
    this.demandeService.DeleteDemandeRecrutement(id).subscribe(()=>{
      alert("delete successful");

    })
  }
  UpdateDemandeRecrutement(id: any) {
    const model = this.BesoinPersonnel.value;
    console.log(model);
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
  DeleteDemandePoly(id:any){
    this.demandeService.DeleteDemandePoly(id).subscribe(()=>{
      alert("delete successful");

    })
  }
  openDialog1(demandeId: number): void {
    this.demandeService.getDemandePolyById(demandeId).subscribe((data) => {
      const dialogRef = this.dialog.open(DemandePolyDetailsDialogComponent, {
        width: '800px',
        data:  data as demandePolyvalence // Pass the fetched files as data to the dialog

      });
      
      // Subscribe to the afterClosed event of the dialog
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        console.log('Result:', result);
      });
    });
  }
  UpdateEtEnvoiDemandeRec(id:any){
    console.log(id)
    this.demandeService.UpdateEtEnvoiDemandeRecrutement(id).subscribe(
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
  UpdateEtEnvoiDemandePoly(id:any){
    console.log(id)
    this.demandeService.UpdateEtEnvoiDemandePoly(id).subscribe(
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
  getdemandeByDate(event :any){
    if (event && event.value) {
      console.log(event.value); // Vérifiez la valeur d'event.value
  
      if (event.value === "All") {
        // Si event.value est "All", retourner toutes les formations originales
        this.demandeRecrutement =this.originalDemandeDeRecrutement
      } else {
        // Sinon, filtrer en fonction de la valeur de event.value
        this.demandeRecrutement = this.filteredDemandeDeRecrutement.filter(f => f.creationDate === event.value);
      }
  
      console.log(this.demandeRecrutement); // Affichez le résultat filtré dans la console
      return this.demandeRecrutement;
    } else {
      // Gérez le cas où event ou event.value est indéfini
      console.error('Erreur : event ou event.value est indéfini');
      return []; // Retournez un tableau vide ou ajustez en fonction de votre logique
    }
  }
  getdatecreationDR() {
    // Assuming getAllDemandeRecrutement() returns an array of demandes
    
    // Assuming demande objects have a 'createdAt' property representing creation date
    this.creationDatesRec = this.demandeRecrutement.map((demande: { creationDate: any; }) => demande.creationDate);
    console.log(this.creationDatesRec)
    return this.creationDatesRec;
}
getdatecreationPoly() {
  // Assuming getAllDemandeRecrutement() returns an array of demandes
  
  // Assuming demande objects have a 'createdAt' property representing creation date
  this.creationDatesPoly = this.demandePolyvalence.map((demande: { creationDate: any; }) => demande.creationDate);
  console.log(this.creationDatesPoly)
  return this.creationDatesPoly;
}
getligne(){
  this.ligneService.getLignes().subscribe((data)=>{
    this.ligne=data as Ligne[]
    console.log(this.ligne)
  })
}
getdemandePolyByDate(event :any){
  if (event && event.value) {
    console.log(event.value); // Vérifiez la valeur d'event.value

    if (event.value === "All") {
      // Si event.value est "All", retourner toutes les formations originales
      this.demandePolyvalence =this.originalDemandePoly
    } else {
      // Sinon, filtrer en fonction de la valeur de event.value
      this.demandePolyvalence = this.filteredDemandePoly.filter(f => f.creationDate === event.value);
    }

    console.log(this.demandePolyvalence); // Affichez le résultat filtré dans la console
    return this.demandePolyvalence;
  } else {
    // Gérez le cas où event ou event.value est indéfini
    console.error('Erreur : event ou event.value est indéfini');
    return []; // Retournez un tableau vide ou ajustez en fonction de votre logique
  }
}
/*getdemandeByLigne(event :any){
  if (event && event.value) {
    console.log(event.value); // Vérifiez la valeur d'event.value

    if (event.value === "All") {
      // Si event.value est "All", retourner toutes les formations originales
      this.demandeRecrutement =this.originalDemandeDeRecrutement
    } else {
      // Sinon, filtrer en fonction de la valeur de event.value
      this.demandeRecrutement = this.filteredDemandeDeRecrutement.filter(f => f. === event.value);
    }

    console.log(this.demandePolyvalence); // Affichez le résultat filtré dans la console
    return this.demandePolyvalence;
  } else {
    // Gérez le cas où event ou event.value est indéfini
    console.error('Erreur : event ou event.value est indéfini');
    return []; // Retournez un tableau vide ou ajustez en fonction de votre logique
  }

}
getdemandePolyByLigne(event :any){
  if (event && event.value) {
    console.log(event.value); // Vérifiez la valeur d'event.value

    if (event.value === "All") {
      // Si event.value est "All", retourner toutes les formations originales
      this.demandePolyvalence =this.originalDemandePoly
    } else {
      // Sinon, filtrer en fonction de la valeur de event.value
      this.demandePolyvalence = this.filteredDemandePoly.filter(f => f.creationDate === event.value);
    }

    console.log(this.demandePolyvalence); // Affichez le résultat filtré dans la console
    return this.demandePolyvalence;
  } else {
    // Gérez le cas où event ou event.value est indéfini
    console.error('Erreur : event ou event.value est indéfini');
    return []; // Retournez un tableau vide ou ajustez en fonction de votre logique
  }

  }*/


  opendialogallDR(){
    const dialogRef = this.dialog.open(DialogAlldemandesComponent, {
      width: '1000px',
      data: { } // Correction ici
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('the dialog was closed');
      console.log('result:', result);
      
    });
  }
  }

