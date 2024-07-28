import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormationService } from 'src/app/Service/formation.service';
import { Formation } from 'src/app/model/formation.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  searchControl = new FormControl();
  filteredFormation: Formation[] = [];
  formation: Formation[] = [];
  OriginalFormation: Formation[] = [];
  options: string[] = []; // Ensure options is populated correctly
  filteredOptions: Observable<string[]> | undefined;

  @Output() searchResultsFormation = new EventEmitter<Formation[]>();
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  constructor(private formationService: FormationService) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnInit(): void {
    this.getFormations();
  }

  getFormations() {
    this.formationService.getAllFormations().subscribe((data) => {
      this.formation = data as Formation[];
      this.OriginalFormation = this.formation; // Ensure OriginalFormation is initialized
      this.options = this.getUniqueOperationNames(this.formation); // Populate options array with unique operation names
      console.log('Formations:', this.formation);
      console.log('Options:', this.options);
    });
  }

  private getUniqueOperationNames(formations: Formation[]): string[] {
    const operationNames = formations.map(f => f.operationName);
    // Create a Set to filter out duplicates and convert it back to an array
   // return Array.from(new Set(operationNames));
   return []
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log('Filter Value:', filterValue);
    this.filteredFormation = this.OriginalFormation.filter(formation => 
      formation.operationName && formation.operationName.toLowerCase().includes(filterValue)
    );
    this.searchResultsFormation.emit(this.filteredFormation);
    const filteredOptions = this.options.filter(option => option.toLowerCase().includes(filterValue));
    console.log('Filtered Options:', filteredOptions);
    return filteredOptions;
  }
}
