import {Component, OnInit} from '@angular/core';
import {LoadingService} from '../shared/service/loading.service';
import {delay, Observable} from 'rxjs';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss'
})
export class SystemComponent implements OnInit {
  loading$: Observable<boolean>

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loading$ = this.loadingService.loading$.pipe(delay(0))
  }
}
