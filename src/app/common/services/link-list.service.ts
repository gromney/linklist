import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILinkList } from 'src/app/models/link-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LinkListService {
    constructor(private http: HttpClient) { }

    getAll$ = this.http.get<ILinkList[]>(`${environment.apiUrl}/linklist`);

    getCollection$ = (title: string) => this.http.get<ILinkList>(`${environment.apiUrl}/linklist/${title}`)

    available$ = (title: string) => this.http.get<boolean>(`${environment.apiUrl}/LinkList/available/${title}`);

    publish$ = (list: ILinkList) => this.http.post(`${environment.apiUrl}/LinkList`, list);

    update$ = (title:string,list: ILinkList) => this.http.put(`${environment.apiUrl}/LinkList/${title}`,list)
}