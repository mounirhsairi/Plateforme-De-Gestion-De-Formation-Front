import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatriceDeCompetenceComponent } from './matrice-de-competence/matrice-de-competence.component';
import { FormationsComponent } from './formations/formations.component';
import { OperateursComponent } from './operateurs/operateurs.component';
import { CreationdemandeComponent } from './creationdemande/creationdemande.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { DemandesComponent } from './demandes/demandes.component';
import { FichesComponent } from './fiches/fiches.component';
import { CorbeilleComponent } from './corbeille/corbeille.component';

const routes: Routes = [
  {path:'',component:MatriceDeCompetenceComponent},
  {path:'Matrice',component:MatriceDeCompetenceComponent},
  {path:'Formations',component:FormationsComponent},
  {path:'Operateurs',component:OperateursComponent},
  {path:"Création d'une demande",component:CreationdemandeComponent},
  {path:'Evaluation de formation',component:EvaluationComponent},
  {path:'Demandes',component:DemandesComponent},
  {path:'Fiches de formations',component:FichesComponent},
  {path:'Corbeille',component:CorbeilleComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
