import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { OperateurServiceService } from '../Service/operateur-service.service';
import { Operator } from '../model/operator.model';
import { Operation } from '../model/operation.model';
import { EvaluationServiceService } from '../Service/evaluation-service.service';
import { Evaluation } from '../model/Evaluation.model';
import { FormationService } from '../Service/formation.service';
import { Formation } from '../model/formation.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl();
  filtredoperators: Operator[] = [];
  formation :Formation[]=[];
  OriginalFormation :Formation[]=[];
  originaloperators: Operator[] = [];
  options: string[] = [];
  optionsOperation: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  filteredFormation: Observable<string[]> | undefined;

  @Output() searchResults = new EventEmitter<Operator[]>();
  @Output() searchResultsFormation = new EventEmitter<Formation[]>();
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  constructor(private operatorService: OperateurServiceService , private formationService:FormationService) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.filteredFormation =this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOperation(value))
    );
  }

  ngOnInit(): void {
    this.getMatriculeOeprator();
  }

  getMatriculeOeprator(): void {
    this.operatorService.getOperator().subscribe((data) => {
      this.originaloperators = data as Operator[];
      this.options = this.originaloperators.map(operator => operator.nomOperateur);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.filtredoperators = this.originaloperators.filter(operator => operator.nomOperateur.toLowerCase().includes(filterValue));
    this.searchResults.emit(this.filtredoperators);
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filterOperation(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.formation = this.OriginalFormation.filter(formation => formation.operationName.toLowerCase().includes(filterValue));
    this.searchResultsFormation.emit(this.formation);
    return this.optionsOperation.filter(option => option.toLowerCase().includes(filterValue));
  }
}
