import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkListService } from 'src/app/common/services/link-list.service';
import { ILinkList } from 'src/app/models/link-list.model';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  collections$ = new Observable<ILinkList[]>();
  constructor(private linkService: LinkListService) { }

  ngOnInit(): void {
    this.collections$ = this.linkService.getAll$;

  }

  onEdit(collection: ILinkList) {

  }

}
