import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isCollapsed = true;

  constructor(private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private router: Router,
              public authService: AuthService) { }

  ngOnInit(): void {
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();

  }

  logout(): void {
    localStorage.removeItem('token');
    this.toastr.show('Log Out');
    this.router.navigate(['/user/login']);
  }

  entrar(): void {
    this.router.navigate(['/user/login']);
  }

}
