import { Component, NgZone, OnInit } from '@angular/core';
import { LoginServiceService } from '../Service/login-service.service';
import { user } from '../model/user.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAjoutUserComponent } from '../dialog-ajout-user/dialog-ajout-user.component';

@Component({
  selector: 'app-gestion-des-utilisateurs',
  templateUrl: './gestion-des-utilisateurs.component.html',
  styleUrls: ['./gestion-des-utilisateurs.component.css']
})
export class GestionDesUtilisateursComponent implements OnInit {
  user :user[]=[];
  constructor(private dialog :MatDialog, private loginService :LoginServiceService,private ngZone: NgZone, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers(){
    this.loginService.GetAllUsers().subscribe((data)=>{
      this.user =data as user[];
      console.log(this.user)
    })
  }
  onFileSelected(event: any,id:any) {
    this.ngZone.run(() => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const imageUrl = reader.result as string;
        console.log(imageUrl)
        // Set the data URL as the first element of the 'image' array
        //this.form.get('image')?.setValue(reader.result as string);
        //this.MiseAjourImage(imageUrl,id);

      };
      reader.readAsDataURL(file); // Read the file as data URL
    } else {
      console.error('No files selected.');
    }
  
  });
}
navigate(){
  this.router.navigate(['/SignUp'])
}


openDialogAjoutUser():void{
  const dialogRef=this.dialog.open(DialogAjoutUserComponent,{
    width:'1000px',
    data: {name:'john',aniaml:'dog'},
  }
    );
  dialogRef.afterClosed().subscribe((result)=>{
    console.log('the dialod was closed');
    console.log('result:',result);
  })
  }
  deleteUser(id:any){
    this.loginService.deleteUser(id).subscribe(()=>{
      alert("Continuer la suppression");

    })
  }


}
