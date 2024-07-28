import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/Service/login-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  showInputs = false;
  name=localStorage.getItem('user_name');
  imagesrc=localStorage.getItem('imageSrc');

  constructor(private authService: LoginServiceService) { }

  ngOnInit(): void {
    const name=localStorage.getItem('user_name');
    //const imagesrc=localStorage.getItem('imageSrc');

    //console.log(imagesrc)
  }
  toggleInputs() {
    this.showInputs = !this.showInputs;
  }
  logout(){
    const token = localStorage.getItem('access_token'); // Replace with your actual access token
    console.log(localStorage.getItem('access_token'))
    console.log(localStorage.getItem('expired'))
    if (!token) {
      console.error('No access token found');
      return;
    }
    
    this.authService.logout(token).subscribe(
      () => {
        console.log('Logout successful');
        // Additional logic after successful logout
      },
      (error) => {
        console.error('Logout failed:', error);
        // Handle error
      }
    );
    localStorage.setItem('expired', "true");
    //localStorage.setItem('Role',"");


  }
}
