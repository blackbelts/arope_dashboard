import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OdooService } from 'app/serveices/odoo.service';
import { SharedService } from 'app/serveices/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public odoo: OdooService,
    public shared: SharedService,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    })
  }

  ngOnInit(): void {
  }
  login() {
    /* console.log("login")
    console.log(this.loginForm.value) */
    if (this.loginForm.valid) {
      this.odoo.login(this.loginForm.value)
        .then(res => {
          /*  console.log(JSON.stringify(res)) */
          let user = JSON.parse(JSON.stringify(res))
          this.shared.user_id = user.user.id
          this.shared.user_token = user.token
          if (this.loginForm.get("remember").value) {
            localStorage.setItem("token", user.token)
            localStorage.setItem("user_id", user.user.id)
          }
          this.router.navigateByUrl("/dashboard/home")
          console.log(this.shared.user_token, this.shared.user_id)
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
