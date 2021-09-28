import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class LoadingService{
    private loading = new BehaviorSubject<boolean>(false);
    public readonly isLoading$ = this.loading.asObservable();

    constructor(){}

    show() {
        this.loading.next(true);
    }
    hide(){
        this.loading.next(false);
    }
}