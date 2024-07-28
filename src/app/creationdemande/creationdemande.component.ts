import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DiaolgDemandeCodeComponent } from '../diaolg-demande-code/diaolg-demande-code.component';
import { DialogBesoinPersonnelComponent } from '../dialog-besoin-personnel/dialog-besoin-personnel.component';
import { DialogPolyvalenceComponent } from '../dialog-polyvalence/dialog-polyvalence.component';

@Component({
  selector: 'app-creationdemande',
  templateUrl: './creationdemande.component.html',
  styleUrls: ['./creationdemande.component.css']
})
export class CreationdemandeComponent implements OnInit {
  
renderedHtml: any;
  constructor(private dialog :MatDialog) {}

  ngOnInit(): void {

  }
  openDialog():void{
    const dialogRef=this.dialog.open(DiaolgDemandeCodeComponent,{
      width:'1000px',
      data: {name:'john',aniaml:'dog'},
    }
      );
    dialogRef.afterClosed().subscribe((result)=>{
      console.log('the dialod was closed');
      console.log('result:',result);
    })
    }
    openDialogBesoin():void{
    const dialogRef=this.dialog.open(DialogBesoinPersonnelComponent,{
      width:'1000px',
      data: {name:'john',aniaml:'dog'},
    }
      );
    dialogRef.afterClosed().subscribe((result)=>{
      console.log('the dialod was closed');
      console.log('result:',result);
    })
    }
    openDialogPolyvalence():void{
      const dialogRef=this.dialog.open(DialogPolyvalenceComponent,{
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


