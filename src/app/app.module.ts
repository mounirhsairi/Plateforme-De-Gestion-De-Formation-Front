import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { MatriceDeCompetenceComponent } from './matrice-de-competence/matrice-de-competence.component';
import { FormationsComponent } from './formations/formations.component';
import { OperateursComponent } from './operateurs/operateurs.component';
import { CreationdemandeComponent } from './creationdemande/creationdemande.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { DemandesComponent } from './demandes/demandes.component';
import { FichesComponent } from './fiches/fiches.component';
import { CorbeilleComponent } from './corbeille/corbeille.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { DiaolgDemandeCodeComponent } from './diaolg-demande-code/diaolg-demande-code.component';
import { SearchComponent } from './search/search.component';
import { DialogBesoinPersonnelComponent } from './dialog-besoin-personnel/dialog-besoin-personnel.component';
import { DialogPolyvalenceComponent } from './dialog-polyvalence/dialog-polyvalence.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DialogFIFComponent } from './dialog-fif/dialog-fif.component';
import { DialogEvaluationComponent } from './dialog-evaluation/dialog-evaluation.component';
import {MatRadioModule} from '@angular/material/radio';
import { DialogEvaluationParAgentFormationComponent } from './dialog-evaluation-par-agent-formation/dialog-evaluation-par-agent-formation.component';
import { DialogEvaluationParChefDeLigneComponent } from './dialog-evaluation-par-chef-de-ligne/dialog-evaluation-par-chef-de-ligne.component';
import { DialogEvaluationMaintenanceComponent } from './dialog-evaluation-maintenance/dialog-evaluation-maintenance.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './TokenInterceptor';
import { DialogListOperateursInFormationComponent } from './dialog-list-operateurs-in-formation/dialog-list-operateurs-in-formation.component';
import { GestionDesLignesComponent } from './gestion-des-lignes/gestion-des-lignes.component';
import { GestionDesOperationsComponent } from './gestion-des-operations/gestion-des-operations.component';
import { GestionDesUtilisateursComponent } from './gestion-des-utilisateurs/gestion-des-utilisateurs.component';
import {MatChipsModule} from '@angular/material/chips';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DialogDemandeDetailsComponent } from './dialog-demande-details/dialog-demande-details.component';
import { DialogAjoutUserComponent } from './dialog-ajout-user/dialog-ajout-user.component';
import { DemandePolyDetailsDialogComponent } from './demande-poly-details-dialog/demande-poly-details-dialog.component';
import { SearchEvaluationComponent } from './search-evaluation/search-evaluation.component';
import { SearchMatriceComponent } from './search-matrice/search-matrice.component';
import { DialogupdateOperationComponent } from './dialogupdate-operation/dialogupdate-operation.component';
import { DialogQualificationComponent } from './dialog-qualification/dialog-qualification.component';
import { ProgrammeFormationComponent } from './programme-formation/programme-formation.component';
import { ProgramformationConducteurMachineComponent } from './programformation-conducteur-machine/programformation-conducteur-machine.component';
import { ProgrammeFormationConducteurCMSComponent } from './programme-formation-conducteur-cms/programme-formation-conducteur-cms.component';
import { InjectionplastiqueComponent } from './injectionplastique/injectionplastique.component';
import { DialogAlldemandesComponent } from './dialog-alldemandes/dialog-alldemandes.component';
@NgModule({
  declarations: [
    AppComponent,
    MatriceDeCompetenceComponent,
    FormationsComponent,
    OperateursComponent,
    CreationdemandeComponent,
    EvaluationComponent,
    DemandesComponent,
    FichesComponent,
    CorbeilleComponent,
    DialogComponent,
    DiaolgDemandeCodeComponent,
    SearchComponent,
    DialogBesoinPersonnelComponent,
    DialogPolyvalenceComponent,
    DialogFIFComponent,
    DialogEvaluationComponent,
    DialogEvaluationParAgentFormationComponent,
    DialogEvaluationParChefDeLigneComponent,
    DialogEvaluationMaintenanceComponent,
    LoginComponent,
    DialogListOperateursInFormationComponent,
    GestionDesLignesComponent,
    GestionDesOperationsComponent,
    GestionDesUtilisateursComponent,
    SignUpComponent,
    DialogDemandeDetailsComponent,
    DialogAjoutUserComponent,
    DemandePolyDetailsDialogComponent,
    SearchEvaluationComponent,
    SearchMatriceComponent,
    DialogupdateOperationComponent,
    DialogQualificationComponent,
    ProgrammeFormationComponent,
    ProgramformationConducteurMachineComponent,
    ProgrammeFormationConducteurCMSComponent,
    InjectionplastiqueComponent,
    DialogAlldemandesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatPaginatorModule, MatChipsModule


    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
