import { Component, NgZone, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {MatMenuTrigger, MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { OperateurServiceService } from '../Service/operateur-service.service';
import { Operator } from '../model/operator.model';
import { OperationServiceService } from '../Service/operation-service.service';
import { LigneServiceService } from '../Service/ligne-service.service';
import { Ligne } from '../model/ligne.model';
import { SearchComponent } from '../search/search.component';
import { DialogupdateOperationComponent } from '../dialogupdate-operation/dialogupdate-operation.component';
import { DialogQualificationComponent } from '../dialog-qualification/dialog-qualification.component';
@Component({
  selector: 'app-operateurs',
  templateUrl: './operateurs.component.html',
  styleUrls: ['./operateurs.component.css'],
  providers:[OperateurServiceService]
})
export class OperateursComponent implements OnInit {
  panelOpenState = false;
  operators: Operator[]=[];
  filtredoperators: Operator[]=[];
  //urlimg="assets/mounir.jpeg";
  ligne:Ligne[]=[];

  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  //@ViewChild('SearchComponent') searchComponent!: SearchComponent;

  constructor(private dialog :MatDialog,private ligneService :LigneServiceService,private operatorService: OperateurServiceService,private operationService: OperationServiceService,private ngZone: NgZone) { }

  ngOnInit() {
    this.getAllOperator()
    this.getligne()
    this.getMatricule()
    //this.findOperatorByMatricule("mat12")
  }
  getImageSrc(base64String: string): string {
    const a='data:image/jpeg;base64,' + base64String;
    console.log("image==="+ a)
    return a;

    
  }
  openDialog():void{
    const dialogRef=this.dialog.open(DialogComponent,{
      width:'1000px',
      data: {name:'john',aniaml:'dog'},
    }
      );
    dialogRef.afterClosed().subscribe((result)=>{
      console.log('the dialod was closed');
      console.log('result:',result);
    })
    }
    closeMenu() {
      this.menuTrigger.closeMenu();
    }
    calculDifferenceDate(creationDate:string){
      const currentDate = new Date();
      const [datePart, timePart] = creationDate.split(' ');
      const [day, month, year] = datePart.split('/');
      const [hour, minute] = timePart.split(':');
      const creationDateObject = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));

      const diffYears = currentDate.getFullYear() - creationDateObject.getFullYear();
      const diffMonths = (diffYears * 12) + (currentDate.getMonth() - creationDateObject.getMonth());
      //console.log("now :"+currentDate.getMonth())
      //console.log("creationmonth:"+creationDateOfThirdItem.getMonth())
      return diffMonths ;
    }
    getAllOperator(){
      this.operatorService.getOperator().subscribe((data:any): any => {
        this.operators = data.filter((operator: { creationDate: string; }) => this.calculDifferenceDate(operator.creationDate) < 9);
        console.log(this.operators);
        console.log(this.calculDifferenceDate(this.operators[5].creationDate))
      })
    }
    
    deleteOperatorById(idOperateur: number) {
      this.operatorService.deleteOperator(idOperateur).subscribe(() => {
        // Remove the deleted operator from the local array
        this.operators = this.operators.filter(operator => operator.id !== idOperateur);
        alert("delete successful");
      });
    }
    
    
   // Déclarez une nouvelle variable pour conserver la liste complète des opérateurs d'origine
originalOperators: Operator[] = [];

// Modifiez la fonction findOperatorByMatricule
findOperatorByMatricule(event: any) {
  const matricule = event.value;
  console.log("matricule: " + matricule);
  
  // Si la liste d'opérateurs d'origine n'a pas encore été sauvegardée, sauvegardez-la
  if (!this.originalOperators.length) {
    this.originalOperators = [...this.operators];
  }
  
  // Si une matricule est sélectionnée
  if (matricule && matricule !== "all") {
    // Filtrer les opérateurs basés sur la matricule sélectionnée
    this.operators = this.originalOperators.filter(operator => operator.matriculeOperateur === matricule && this.calculDifferenceDate(operator.creationDate) < 12);
  } else {
    // Si "all" est sélectionné ou aucune matricule n'est sélectionnée, afficher tous les opérateurs d'origine
    this.operators = [...this.originalOperators];
  }
}

    
  getMatricule(){
    this.operatorService.getOperator().subscribe((data:any): any=>{
        this.filtredoperators= data.filter((operator: { creationDate: string; }) => this.calculDifferenceDate(operator.creationDate) < 12)
        //this.filtredoperators= data as Operator[]
    })
  }  
    
  getligne(){
    this.ligneService.getLignes().subscribe((data)=>{
      this.ligne=data as Ligne[]
      console.log(this.ligne)
    })
  }
  getOperatorByLigne(event:any){
    //let value = event.target.value
    console.log("idligne"+event.value)
    this.operationService.FilterOperatorByLigne(event.value).subscribe((data:any): any =>{
      this.operators = data.filter((operator: { creationDate: string; }) => this.calculDifferenceDate(operator.creationDate) < 12)
      //this.filtredoperators= data as Operator[]
      this.filtredoperators=data.filter((operator: { creationDate: string; }) => this.calculDifferenceDate(operator.creationDate) < 12);

    })
    console.log(this.operators)
    //console.log(value)*/
  }
 /* filterName() {
    const searchValue = this.searchComponent.searchControl.value;
    console.log(searchValue)
    this.searchComponent._filter(searchValue);
  }*/
  onFileSelected(event: any,id:any) {
    this.ngZone.run(() => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const imageUrl = reader.result as string;
        console.log(imageUrl)
        // Set the data URL as the first element of the 'image' array
        //this.form.get('image')?.setValue(reader.result as string);
        this.MiseAjourImage(imageUrl,id);

      };
      reader.readAsDataURL(file); // Read the file as data URL
    } else {
      console.error('No files selected.');
    }
  
  });
}
MiseAjourImage(Image :string ,idOperateur:number){
  this.operatorService.MiseAjourImage(Image,idOperateur).subscribe(
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
openDialogOperation(id:any){
  const dialogRef = this.dialog.open(DialogupdateOperationComponent, {
    width: '1000px',
    data: { id: id} // Correction ici
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log('the dialog was closed');
    console.log('result:', result);
    
  });
}
openDialogQualification(id:any){
  const dialogRef = this.dialog.open(DialogQualificationComponent, {
    width: '300px',
    data: { id: id} // Correction ici
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log('the dialog was closed');
    console.log('result:', result);
    
  });
}

onSearchResults(results: Operator[]): void {
   //console.log(results)
  this.operators = results;
}


}


