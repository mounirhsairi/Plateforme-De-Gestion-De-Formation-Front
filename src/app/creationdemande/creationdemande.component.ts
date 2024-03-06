import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-creationdemande',
  templateUrl: './creationdemande.component.html',
  styleUrls: ['./creationdemande.component.css']
})
export class CreationdemandeComponent implements OnInit {
  searchControl = new FormControl();
  options: string[] = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Thriller"
  ];
  filteredOptions: Observable<string[]>;
  constructor() {this.filteredOptions = this.searchControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    ); }

  ngOnInit(): void {
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}


