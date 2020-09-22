import { Component } from '@angular/core';
import { SharedService } from './serveices/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(
    public shared: SharedService,
    public router: Router
  ) {
    console.log("const")
    console.log(localStorage.getItem("token"))
    this.shared.user_token = localStorage.getItem("token")
    this.shared.user_id = localStorage.getItem("user_id")
    if (localStorage.getItem("token") != null) {
      console.log(this.shared.user_id)
      console.log(this.shared.user_token)
      this.router.navigateByUrl("/dashboard/home")

    } else {
      this.router.navigateByUrl("/")
    }
  }
  ngOnInit(): void {
    console.log("this.ngOnInit")
  }
}
