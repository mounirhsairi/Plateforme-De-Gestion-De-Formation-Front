import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LigneServiceService } from '../Service/ligne-service.service';
import { Ligne } from '../model/ligne.model';

@Component({
  selector: 'app-gestion-des-lignes',
  templateUrl: './gestion-des-lignes.component.html',
  styleUrls: ['./gestion-des-lignes.component.css']
})
export class GestionDesLignesComponent implements OnInit {
  form!:FormGroup;
  ligne:Ligne[]=[];

  constructor(private build:FormBuilder, private ligneService :LigneServiceService) { }

  ngOnInit(): void {
    this.form=this.build.group({
      nomLigne:[''],
  });
  this.getligne()
  }
  createLigne() {
    const model = this.form.value
    console.log(model)
    this.ligneService.createLigne(model).subscribe(
      (res) => {
        console.log("Données soumises avec succès:", res);
        // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
      },
      (error) => {
        console.error("Erreur lors de la soumission des données:", error);
        // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
      }
    );
  }
  getligne(){
    this.ligneService.getLignes().subscribe((data)=>{
      this.ligne=data as Ligne[]
      console.log(this.ligne)
    })
  }
  deleteligne(id:any){
    
    this.ligneService.deleteLigne(id).subscribe(()=>{
      alert("Successful delete")
    })
  }
}

