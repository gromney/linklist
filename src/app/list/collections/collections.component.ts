import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ILinkList } from 'src/app/models/link-list.model';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  collections$ = new Observable<ILinkList[]>();
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.collections$ = this.http.get<ILinkList[]>('https://localhost:5001/api/linklist');

  }

  onEdit(collection:ILinkList){
    
  }

}
