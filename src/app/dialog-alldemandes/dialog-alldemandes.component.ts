import { Component, OnInit } from '@angular/core';
import { demandeRecrutement } from '../model/DemandeRecrutement.model';
import { DemandeService } from '../Service/demande.service';

@Component({
  selector: 'app-dialog-alldemandes',
  templateUrl: './dialog-alldemandes.component.html',
  styleUrls: ['./dialog-alldemandes.component.css']
})
export class DialogAlldemandesComponent implements OnInit {
  demandeRecrutement:demandeRecrutement[]=[]
  totalNombre!: number;

  constructor(private demandeService: DemandeService) { }

  ngOnInit(): void {
    this.getAllDemandeRecrutement()
  }

  getAllDemandeRecrutement() {
    this.demandeService.getAllDemandeRecrutement().subscribe((data) => {
      this.demandeRecrutement = data as demandeRecrutement[];
      this.demandeRecrutement =this.demandeRecrutement.filter(demande => demande.etat === 'VALIDER_PAR_DIRECTEUR_OPERATIONS')
      this.calculateTotalNombre();
      console.log(this.demandeRecrutement);
    });
  }

  calculateTotalNombre() {
    this.totalNombre = this.demandeRecrutement
      .filter(demande => demande.etat === 'VALIDER_PAR_DIRECTEUR_OPERATIONS')
      .reduce((sum, demande) => sum + demande.nombre, 0);
  }

}
