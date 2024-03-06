import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  showForm: boolean = false;
    constructor() { }

  ngOnInit(): void {
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }

}
