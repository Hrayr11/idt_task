import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserInfoService} from '../../shared/service/user-info.service';
import {UserDataInterface} from '../../shared/interface/userData.interface';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit ,OnDestroy {
  showPersonInfo = false;
  currentUser: UserDataInterface | null = null;
  userInfoSubscription: Subscription;
  constructor(private route: Router, private userInfoService: UserInfoService) {
  }

  toggleShowInfo() {
    this.showPersonInfo = !this.showPersonInfo;
  }

  logout() {
    localStorage.removeItem('token');
    this.route.navigate(["login"]);
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.userInfoSubscription = this.userInfoService.getUserData().subscribe(data => {
      this.currentUser = data
    })
  }
  ngOnDestroy():void {
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
  }
}
