import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @ViewChild('navBurger') navBurger!: ElementRef;
  @ViewChild('navMenu') navMenu!: ElementRef;

  isAboutActive = true;
  isAuthenticated$ = new Observable<boolean>();
  user$ = new Observable<any>()
  constructor(private auth: AuthService, @Inject(DOCUMENT) public doc: Document) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.auth.isAuthenticated$
    this.user$ = this.auth.user$;
  }

  logIn() {
    this.auth.loginWithRedirect();
  }

  logOut() {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }

  toggleAbout() {
    this.isAboutActive = !this.isAboutActive;
  }
}
