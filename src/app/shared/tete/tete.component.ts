import { Component, OnInit } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-tete',
  templateUrl: './tete.component.html',
  styleUrls: ['./tete.component.css']
})
export class TeteComponent implements OnInit {
  titres=['Matrice de compétences','Formations','Operateurs',"Création d'une demande",'Evaluation de formation','Demandes','Fiches de formations']
  constructor() { }

  ngOnInit(): void {
  }

}
