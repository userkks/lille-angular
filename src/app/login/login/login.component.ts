import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (environment.profile) {
      this.router.navigate(['home']);
    }
  }

  authenticateGoogle() {
    window.open(`${environment.BACKEND_URL}/utility/login/google`, "Login", "width=500, height=500");
  }

}
