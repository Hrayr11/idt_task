import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  count: number = 0;

  constructor() {
  }

  enableLoading() {
    this.count++;
    if (this.count > 0) {
      this.loading$.next(true)
    }
  }

  disableLoading() {
    this.count--;
    if (this.count <= 0) {
      this.count = 0;
      this.loading$.next(false)
    }
  }

}
