import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginServiceService } from '../Service/login-service.service';
import { LigneServiceService } from '../Service/ligne-service.service';
import { Ligne } from '../model/ligne.model';

@Component({
  selector: 'app-dialog-ajout-user',
  templateUrl: './dialog-ajout-user.component.html',
  styleUrls: ['./dialog-ajout-user.component.css']
})
export class DialogAjoutUserComponent implements OnInit {
  registrationForm!:FormGroup
  lignes:Ligne[]=[];
  constructor(private ligneService :LigneServiceService,private ngZone: NgZone, private build:FormBuilder ,private loginService:LoginServiceService) {
    
   }

  ngOnInit(): void {
    this.registrationForm = this.build.group({
      name: [''],
      email: [''],
      password: [''],
      roleName: [''],
      image: [''],
      idLigne: [[]] // Initialize as an empty array for multiple selection
    });
    this.getAllLignes()
  }
  
  onFileSelected(event: any) {
    this.ngZone.run(() => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const imageUrl = reader.result as string;
        console.log(imageUrl)
        // Set the data URL as the first element of the 'image' array
        this.registrationForm.get('image')?.setValue(reader.result as string);
      };
  
      reader.readAsDataURL(file); // Read the file as data URL
    } else {
      console.error('No files selected.');
    }
  
  });
}
registration() {
  const model = this.registrationForm.value;
  console.log(model);
  this.loginService.registration(model).subscribe(
    (res) => {
      console.log("Data submitted successfully:", res);
      alert("Création d'utilisateur avec succès");
    },
    (error) => {
      console.error("Error submitting data:", error);
      // Handle error - display error message to the user
    }
  );
}
getAllLignes(){
  return this.ligneService.getLignes().subscribe((data)=>{
    this.lignes = data as Ligne[]

  })
}
}
