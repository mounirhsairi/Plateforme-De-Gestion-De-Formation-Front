import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormArray} from '@angular/forms';
import { DemandeService } from '../Service/demande.service';
import { LigneServiceService } from '../Service/ligne-service.service';
import { Ligne } from '../model/ligne.model';
import { OperationServiceService } from '../Service/operation-service.service';
import { Operator } from '../model/operator.model';
import { Operation } from '../model/operation.model';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-polyvalence',
  templateUrl: './dialog-polyvalence.component.html',
  styleUrls: ['./dialog-polyvalence.component.css']
})
export class DialogPolyvalenceComponent implements OnInit {
  ligne:Ligne[]=[]
  renderedHtml: SafeHtml = ''; // Variable to store rendered HTML code

  filtredoperators:Operator[]=[]
  filtredoperations:Operation[]=[]
  firstFormGroup = new FormGroup({
    
        idLigneActuel: new FormControl(''),
        idOperateur: new FormControl(''),
        idNouvelleLigne: new FormControl(''),
        idNouvelleOperation: new FormControl(''),
        Objectifs: new FormControl(''),
        type: new FormControl('Polyvalence'),
        delaiLimite: new FormControl(''),
        cause: new FormControl('')
     
    });
    secondFormGroup: FormGroup;

    
    formDataList: any[] = [];
    
  isLinear = false;
  constructor(private _formBuilder: FormBuilder,private demandeService:DemandeService,private ligneService :LigneServiceService,private operationService: OperationServiceService) {
    this.secondFormGroup = this._formBuilder.group({
      etat:['En_Attente'],
      demandDataList: this._formBuilder.array([
        this.firstFormGroup
      ])
    });
   }
   

  ngOnInit(): void {
    this.getligne()
  }
  inputs: string[] = ['']; // Initial input
  get demandDataList() {
    return this.secondFormGroup.get('demandDataList') as FormArray;
  }
  addInput() {
    const newFormGroup = this.cloneFormGroup(this.firstFormGroup);
    (this.secondFormGroup.get('demandDataList') as FormArray).push(newFormGroup);
    console.log(this.secondFormGroup.value)
  }
  cloneFormGroup(sourceFormGroup: FormGroup): FormGroup {
    const formGroupClone = this._formBuilder.group({});
    Object.keys(sourceFormGroup.controls).forEach(key => {
      const control = sourceFormGroup.get(key);
      if (control instanceof FormControl) {
        formGroupClone.addControl(key, new FormControl(control.value));
      } else if (control instanceof FormGroup) {
        formGroupClone.addControl(key, this.cloneFormGroup(control));
      }
    });
    return formGroupClone;
  }
  
  cloneFormControl(control: FormControl): FormControl {
    return new FormControl(control.value, control.validator, control.asyncValidator);
  }
  CreateDemandePolyvalence(etat:string){
    const model = this.secondFormGroup.value
    this.secondFormGroup.get('etat')?.setValue(etat)

    this.demandeService.CreateDemandePolyvalence(model).subscribe((res) => {
      console.log("Données soumises avec succès:", res);
      // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
    },
    (error) => {
      console.error("Erreur lors de la soumission des données:", error);
      // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
    }
  );
}
JustCreateDemandePolyvalence(etat:string){
  const model = this.secondFormGroup.value
  this.secondFormGroup.get('etat')?.setValue(etat)

  this.demandeService.CreateDemandePolyvalence(model).subscribe((res) => {
    console.log("Données soumises avec succès:", res);
    // Vous pouvez afficher un message de succès ou effectuer d'autres actions après la soumission réussie
  },
  (error) => {
    console.error("Erreur lors de la soumission des données:", error);
    // Gérez l'erreur de manière appropriée, par exemple, affichez un message d'erreur à l'utilisateur
  }
);
}
  logFormData() {
    console.log(this.secondFormGroup.value); // Log the entire form data
  }
  getligne(){
    this.ligneService.getLignes().subscribe((data)=>{
      this.ligne=data as Ligne[]
      console.log(this.ligne)
    })
  }
  getOperatorByLigne(event:any){
    //let value = event.target.value
    console.log("idligne"+event.target.value)
    this.operationService.FilterOperatorByLigne(event.target.value).subscribe((data)=>{
      this.filtredoperators= data as Operator[]
    })
    //console.log(this.filtredoperators)
    //console.log(value)*/
  }
  getOperationByLigne(event:any){
    this.operationService.getOperationByLigne(event.target.value).subscribe((data)=>{
      this.filtredoperations= data as Operation[]
    })
  }
  
  
}
