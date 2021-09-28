import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingService } from './common/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'link-list';
  isLoading$ = this.loadingService.isLoading$;
  constructor(private loadingService: LoadingService) { 
  }
  ngOnInit(): void {
    this.isLoading$ = this.loadingService.isLoading$;
  }
}
