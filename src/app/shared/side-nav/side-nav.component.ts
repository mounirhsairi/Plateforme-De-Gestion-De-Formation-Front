import { Component, OnInit } from '@angular/core';
import { navbarData } from './nav-data';
import { DemandeService } from 'src/app/Service/demande.service';
import { demandeRecrutement } from 'src/app/model/DemandeRecrutement.model';
import { demandePolyvalence } from 'src/app/model/DemandePolyvalence.model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  collapsed=false;
  navData =navbarData;
  userRole=localStorage.getItem('Role');
    toggleCollapse():void{
    this.collapsed=!this.collapsed;
  }
  closeSidenav():void{
    this.collapsed=false;
  }
  constructor(private demandeService:DemandeService) { }
  
  demandeRecrutement : demandeRecrutement[]=[]
  demandePolyvalence: demandePolyvalence[]=[]
  
  ngOnInit(): void {
    this.getAllDemandePolyvalence();
    this.getAllDemandeRecrutement();
    const userRole=localStorage.getItem('Role');
    if(userRole){
    this.navData = navbarData.filter(item => {
      // Vérifie si l'élément de navigation ne nécessite aucun rôle ou si le rôle de l'utilisateur correspond à l'un des rôles requis
      return !item.requiredRoles || !item.requiredRoles.includes(userRole);
    });
  }
  }
  getAllDemandeRecrutement(){
    this.demandeService.getAllDemandeRecrutement().subscribe((data)=>{
      this.demandeRecrutement = data as demandeRecrutement[]
      console.log(this.demandeRecrutement.length)
      this.updateDemandesCount();

    })

  }
  getAllDemandePolyvalence(){
    this.demandeService.getAllDemandePolyvalence().subscribe((data)=>{
      this.demandePolyvalence= data as demandePolyvalence[]
      console.log(this.demandePolyvalence.length)
      this.updateDemandesCount();

    })
  }
  updateDemandesCount(): void {
    let totalDemandes = 0;
    const userRole=localStorage.getItem('Role');

    if (userRole === 'ResponssableUAP') {
      const filteredRecrutement = this.demandeRecrutement.filter(demande => demande.etat === 'Envoyé_Vers_RUAP');
      const filteredPolyvalence = this.demandePolyvalence.filter(demande => demande.etat === 'Envoyé_Vers_RUAP');
      totalDemandes = filteredRecrutement.length + filteredPolyvalence.length;
    } else if (userRole === 'DirecteurUAP') {
      const filteredRecrutement = this.demandeRecrutement.filter(demande => 
        demande.etat === 'VALIDER_PAR_RESPONSABLE_UAP');
      totalDemandes = filteredRecrutement.length;
    } else if (userRole === 'DirecteurDesOperations') {
      const filteredRecrutement = this.demandeRecrutement.filter(demande => 
        demande.etat === 'VALIDER_PAR_DIRECTEUR_UAP');
      totalDemandes = filteredRecrutement.length;
    }

    const demandesNavItem = this.navData.find(item => item.label === 'Demandes');
    if (demandesNavItem) {
      demandesNavItem.count = totalDemandes;
    }
  }
}

