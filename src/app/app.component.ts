import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pfeFront';

  isLoggedIn(): boolean {
    const expired = localStorage.getItem('expired');
    //console.log(expired)
    if (expired === "false") {
        return true;
    }
    return false; // Assuming any other value means the user is logged in
}

}
