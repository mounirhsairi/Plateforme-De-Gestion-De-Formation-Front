import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Evaluation } from '../model/Evaluation.model';
import { Observable, map, startWith } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import { EvaluationServiceService } from '../Service/evaluation-service.service';

@Component({
  selector: 'app-search-evaluation',
  templateUrl: './search-evaluation.component.html',
  styleUrls: ['./search-evaluation.component.css']
})
export class SearchEvaluationComponent implements OnInit {

  searchControl = new FormControl();
  filteredEvaluation: Evaluation[] = [];
  evaluation: Evaluation[] = [];
  OriginalEvaluation: Evaluation[] = [];
  options: string[] = []; // Ensure options is populated correctly
  filteredOptions: Observable<string[]> | undefined;

  @Output() searchResultsEvaluation = new EventEmitter<Evaluation[]>();
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  constructor(private evaluationService: EvaluationServiceService) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  ngOnInit(): void {
    this.getAllEvaluation();
  }

  getAllEvaluation() {
    this.evaluationService.getAllEvaluation().subscribe((data) => {
      this.evaluation = data as Evaluation[];
      this.OriginalEvaluation = [...this.evaluation]; // Make a copy of the original evaluations
      this.options = this.evaluation.map(e => e.nomOperateur); // Assuming Evaluation model has a name property
      this.filteredOptions = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      );
      console.log(this.evaluation);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredOptions = this.options.filter(option => option.toLowerCase().includes(filterValue));
    
    // Update filteredEvaluation based on filtered options
    this.filteredEvaluation = this.OriginalEvaluation.filter(evaluation =>
      filteredOptions.includes(evaluation.nomOperateur)
    );
    
    // Emit the filtered evaluations
    this.searchResultsEvaluation.emit(this.filteredEvaluation);

    return filteredOptions;
  }
}
