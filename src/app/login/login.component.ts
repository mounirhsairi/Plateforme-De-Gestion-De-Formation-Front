import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginServiceService } from '../Service/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  registrationForm!:FormGroup
  
  constructor(private ngZone: NgZone,private build:FormBuilder,private loginService:LoginServiceService, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm=this.build.group({
      email: [''],
      password: [''],
      name:[''],
      roleName:[''],
      image:['']
    });
    this.loginForm=this.build.group({
      email: [''],
      password: ['']
    });
  }
  login() {
    console.log(this.loginForm.value);
    const model = this.loginForm.value;
  
    this.loginService.login(model).subscribe(
      (res: any) => {
        console.log("Data submitted successfully:", res);
        // Check if authenticationResponse and user are returned from the server
        if (res && res.token && res.user) {
          // Set tokens and user name in local storage
          localStorage.setItem('access_token', res.token);
          console.log('access_token'+localStorage.getItem('access_token'))
          localStorage.setItem('expired', res.expired);

          //localStorage.setItem('refresh_token', res.authenticationResponse.refresh_token);
          localStorage.setItem('user_name', res.user.name);
          localStorage.setItem('imageSrc', res.user.image);
          localStorage.setItem('Role', res.user.role);
          
          var idLignes: any[] = [];

          // Iterate over userLigneAssignement array and collect idLigne values
          res.user.userLigneAssignement.forEach(function(assignment: { idLigne: any; }) {
              idLignes.push(assignment.idLigne);
          });
          
          // Storing idLignes in localStorage
          localStorage.setItem('idLignes', JSON.stringify(idLignes));
          console.log(localStorage.getItem('Role'))
          // Navigate to another page (e.g., home page)
          if(localStorage.getItem('Role')!='ADMIN'){
            this.router.navigate(['/Matrice']);
          }else{
            this.router.navigate(['/GestionDesUtilisateurs']);
          }
          
        } else {
          console.error("Tokens or user not found in response:", res);
          // Handle error - tokens or user not found in response
        }
      },
      (error) => {
        console.error("Error submitting data:", error);
        // Handle error - display error message to the user
        alert("mot de passe ou adresse incorrect")

      }
    );
  }
  togglePanel(isSignIn: boolean) {
   // if (!this.isAdmin()) {
        const container = document.getElementById('container');
        if (isSignIn) {
            container?.classList.remove('right-panel-active');
        } else {
            container?.classList.add('right-panel-active');
        }
    } /*else {
        // Display an alert when the user is not an admin
        alert('You need to be an admin to perform this action.');
    }
}*/

  
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

  },
  (error) => {
    console.error("Error submitting data:", error);
    // Handle error - display error message to the user
  })
}
isAdmin(){
  return localStorage.getItem('Role')!='ADMIN';
  
} 
}

