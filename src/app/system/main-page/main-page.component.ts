import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserInfoService} from '../../shared/service/user-info.service';
import {forkJoin, Subscription} from 'rxjs';
import {BankAccountInterface} from '../../shared/interface/bankAccount.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit, OnDestroy {
  additionalData: string
  bankAccount: BankAccountInterface[]
  forkJoinSubscription:Subscription;
  allowShowing: boolean[] = [];
  allowBalance: boolean[] = [];
  constructor(private userInfoService: UserInfoService) {
  }

  ngOnInit(): void {

    this.getAllData();
  }
  getAllData() {
   this.forkJoinSubscription = forkJoin({
      additionalData: this.userInfoService.getAdditionalData(),
      transaction: this.userInfoService.getTransactions(),
      bankAccount: this.userInfoService.getBankAccounts(),
    }).subscribe(data => {
      this.additionalData = data.additionalData;
      this.bankAccount = data.bankAccount;
      this.allowShowing = Array(this.bankAccount.length).fill(false);
      this.allowBalance = Array(this.bankAccount.length).fill(false);
    })
  }

  ngOnDestroy():void {
    if (this.forkJoinSubscription) {
      this.forkJoinSubscription.unsubscribe();
    }
  }
}
