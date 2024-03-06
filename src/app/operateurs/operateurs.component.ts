import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {MatMenuTrigger, MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-operateurs',
  templateUrl: './operateurs.component.html',
  styleUrls: ['./operateurs.component.css']
})
export class OperateursComponent implements OnInit {
  panelOpenState = false;
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

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
    closeMenu() {
      this.menuTrigger.closeMenu();
    }
}

