import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LinkListService } from 'src/app/common/services/link-list.service';
import { ILinkList } from 'src/app/models/link-list.model';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit {
  collection = new Observable<ILinkList>();
  listView = true;
  constructor(private router: Router, private linkService: LinkListService) { }

  ngOnInit(): void {
    const title = this.router.url.substring(1);
    console.log(title);

    this.collection = this.linkService.getCollection$(title)
      .pipe(
        catchError((error) =>{
          this.router.navigate(['s/edit'])
          
          return throwError(`ERROR DESDE VIEWLIST: ${error}`);
        }),
        // finalize(()=> this.router.navigate(['/',title]))
      )
  }
  setView(val:boolean){
    this.listView = val;
  }
  getHref(url: string) {
    const href = /^https?/.test(url)? url:`//${url}`;
    return href;
  }

  getCurrentRoute = () => window.location.href;

}
