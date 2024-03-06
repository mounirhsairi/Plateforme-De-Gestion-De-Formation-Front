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
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
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
    
    
  ],
  imports: [
    BrowserModule,
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
    ReactiveFormsModule


    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
