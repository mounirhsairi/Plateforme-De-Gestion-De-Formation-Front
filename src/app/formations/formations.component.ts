import { Component, OnInit } from '@angular/core';
import { FormationService } from '../Service/formation.service';
import { Formation } from '../model/formation.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogListOperateursInFormationComponent } from '../dialog-list-operateurs-in-formation/dialog-list-operateurs-in-formation.component';
import { LigneServiceService } from '../Service/ligne-service.service';
import { Ligne } from '../model/ligne.model';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {
  formation:Formation[]=[]
  filteredFormations:Formation[]=[]
  ligne:Ligne[]=[];
  originalFormations: Formation[] = [];

  constructor(private formationService :FormationService,private dialog :MatDialog,private ligneService :LigneServiceService) { }

  ngOnInit(): void {
    this.getFormations()
    this.getligne()
    

  }
  getFormations(){
    this.formationService.getAllFormations().subscribe((data)=>{
      this.formation=data as Formation[]
      this.filteredFormations=data as Formation[]
      this.originalFormations=data as Formation[]
      console.log(this.formation)
    })
  }
  openDialog(polyDataList:any , idDemandeRecrutement:any):void{
    const dialogRef=this.dialog.open(DialogListOperateursInFormationComponent,{
      width:'1000px',
      data: {polyDataList ,idDemandeRecrutement},
    }
      );
    dialogRef.afterClosed().subscribe((result)=>{
      console.log('the dialod was closed');
      console.log('result:',result);
    })
    }
    onSearchResults(results: Formation[]): void {
      console.log(results)
     this.formation = results;
   }
   getligne(){
    this.ligneService.getLignes().subscribe((data)=>{
      this.ligne=data as Ligne[]
      console.log(this.ligne)
    })
  }
  getFormationByLigne(event: any) {
    if (event && event.value) {
      console.log(event.value); // Vérifiez la valeur d'event.value
  
      if (event.value === "All") {
        // Si event.value est "All", retourner toutes les formations originales
        this.formation =this.originalFormations
      } else {
        // Sinon, filtrer en fonction de la valeur de event.value
        this.formation = this.filteredFormations.filter(f => f.ligneName === event.value);
      }
  
      console.log(this.formation); // Affichez le résultat filtré dans la console
      return this.formation;
    } else {
      // Gérez le cas où event ou event.value est indéfini
      console.error('Erreur : event ou event.value est indéfini');
      return []; // Retournez un tableau vide ou ajustez en fonction de votre logique
    }
  }
  

}
