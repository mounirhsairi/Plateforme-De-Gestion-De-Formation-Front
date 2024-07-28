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
import { LoginComponent } from './login/login.component';
import { GestionDesLignesComponent } from './gestion-des-lignes/gestion-des-lignes.component';
import { GestionDesOperationsComponent } from './gestion-des-operations/gestion-des-operations.component';
import { GestionDesUtilisateursComponent } from './gestion-des-utilisateurs/gestion-des-utilisateurs.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProgrammeFormationComponent } from './programme-formation/programme-formation.component';
import { ProgramformationConducteurMachineComponent } from './programformation-conducteur-machine/programformation-conducteur-machine.component';
import { ProgrammeFormationConducteurCMSComponent } from './programme-formation-conducteur-cms/programme-formation-conducteur-cms.component';
import { InjectionplastiqueComponent } from './injectionplastique/injectionplastique.component';


const role = localStorage.getItem('Role');

// Tableau de routes de base
let routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'program', component: ProgramformationConducteurMachineComponent },
  { path: 'programConducteurCMS', component: ProgrammeFormationConducteurCMSComponent },
  { path: 'injection', component: InjectionplastiqueComponent },

  { path: 'SignUp', component: SignUpComponent },
  { path: 'Matrice', component: MatriceDeCompetenceComponent },
  { path: 'Formations', component: FormationsComponent },
  { path: 'Operateurs', component: OperateursComponent },
  { path: 'Fiches de formations', component: FichesComponent },
  { path: 'Corbeille', component: CorbeilleComponent },
  { path: "Création d'une demande", component: CreationdemandeComponent },
  { path: 'Demandes', component: DemandesComponent },
  { path: 'Evaluation de formation', component: EvaluationComponent },
  { path: 'GestionDesLignes', component: GestionDesLignesComponent },
  { path: 'GestionDesOperations', component: GestionDesOperationsComponent },
  { path: 'GestionDesUtilisateurs', component: GestionDesUtilisateursComponent }


];






@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
