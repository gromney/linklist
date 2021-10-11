import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, finalize, retry, tap, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class ApiRequestInterceptor implements HttpInterceptor,OnInit {

    constructor(private loadingService: LoadingService) { }
    ngOnInit(){

        this.loadingService.show();
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (req.url.startsWith(environment.apiUrl)) {

            let apiReq = req.clone();
            this.loadingService.show();
            return next.handle(apiReq)
                .pipe(
                    finalize(() => this.loadingService.hide())
                );
        }

        return next.handle(req)
            .pipe(
                tap(() => console.log(req.url.toString())),
                finalize(() => this.loadingService.hide())
            );
    }

}