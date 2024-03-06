import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  constructor(private dialog :MatDialog) { }

  ngOnInit(): void {
  }
  openDialog():void{
    const dialogRef=this.dialog.open(DialogComponent,{
      width:'1000px',
      data: {name:'john',aniaml:'dog'},
    }
      );
    dialogRef.afterClosed().subscribe((result)=>{
      console.log('the dialod was closed');
      console.log('result:',result);
    })
    }
}
