import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OperationServiceService } from '../Service/operation-service.service';
import { LigneServiceService } from '../Service/ligne-service.service';
import { Ligne } from '../model/ligne.model';
import { Operation } from '../model/operation.model';

@Component({
  selector: 'app-gestion-des-operations',
  templateUrl: './gestion-des-operations.component.html',
  styleUrls: ['./gestion-des-operations.component.css']
})
export class GestionDesOperationsComponent implements OnInit {
  form!:FormGroup;
  ligne:Ligne[]=[];
  operation:Operation[]=[];
  operationsMap: { [key: number]: Operation[] } = {};

  constructor(private build:FormBuilder,private operationService:OperationServiceService, private ligneService :LigneServiceService) { }

  ngOnInit(): void {
    this.form=this.build.group({
      operationName:'',
      idLigne:""
  });
  this.getLigne()
  }
  createOperation(){
    const model = this.form.value
    console.log(model)
    this.operationService.createOperation(model,model.idLigne).subscribe(
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
  getLigne() {
    this.ligneService.getLignes().subscribe((data) => {
      this.ligne = data as Ligne[];
      console.log(this.ligne);

      // Fetch operations for each ligne
      this.ligne.forEach((ligne) => {
        this.getOperationsByLigne(ligne.id);
      });
    });
  }

  getOperationsByLigne(idLigne: number) {
    this.operationService.getOperationByLigne(idLigne).subscribe((data) => {
      const operations = data as Operation[];
      console.log(operations);
      this.operationsMap[idLigne] = operations;
    });
  }
  deleteOperation(id:any){
    this.operationService.DeleteOperation(id).subscribe(()=>{
      alert("Successful delete")
    })
  }
}


