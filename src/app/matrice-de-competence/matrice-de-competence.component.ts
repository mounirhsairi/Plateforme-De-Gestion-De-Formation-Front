import { Component, OnInit } from '@angular/core';

@Component({
  selector: '/Matrice',
  templateUrl: './matrice-de-competence.component.html',
  styleUrls: ['./matrice-de-competence.component.css']
})
export class MatriceDeCompetenceComponent implements OnInit {
 Operations=["operation1","operation2"]
 effectifsFormes:number=0
 objectifs:number= 0
 
  constructor() { }

  ngOnInit(): void {
  }
  get besoin(): number {
    return this.objectifs - this.effectifsFormes;
  }


}
