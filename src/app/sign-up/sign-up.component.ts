import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginServiceService } from '../Service/login-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registrationForm!:FormGroup

  constructor(private ngZone: NgZone, private build:FormBuilder ,private loginService:LoginServiceService) { }

  ngOnInit(): void {
    this.registrationForm=this.build.group({
      email: [''],
      password: [''],
      name:[''],
      roleName:[''],
      image:['']
    });
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
registration(){
  const model = this.registrationForm.value
  console.log(model)
  this.loginService.registration(model).subscribe((res)=>{
    console.log("Data submitted successfully:", res);
    alert("création d'utilisateur avec succés")
  },
  (error) => {
    console.error("Error submitting data:", error);
    // Handle error - display error message to the user
  })
}
}
