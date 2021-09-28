import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ILinkList } from 'src/app/models/link-list.model';

const urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';


@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  linkLstFrm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: Router, private el: ElementRef) {
    this.linkLstFrm = this.fb.group({
      title: ['',[Validators.required,Validators.pattern('^[A-Za-z0-9_-]*($|\\s)')]],
      description: [''],
      url_input: ['', Validators.pattern(urlRegex)],
      links: this.fb.array([], Validators.required)
    });

    let collection = this.route.getCurrentNavigation()?.extras.state as ILinkList;
    if (collection) {
      
      let links = collection.links ? collection.links : [];
      
      this.linkLstFrm.controls.title.setValue(collection.title);
      this.linkLstFrm.controls.description.setValue(collection.description);
      
      this.linkLstFrm.setControl('links', this.fb.array(links));
    }

  }

  ngOnInit(): void {

  }

  addLink(target: any) {
    if (this.linkLstFrm.controls['url_input'].invalid) {
      this.linkLstFrm.controls['url_input'].markAsTouched();
      return;
    }

    const newLink = this.newLink(target.value);

    this.linkList.push(newLink);
    this.linkLstFrm.controls['url_input'].reset();
  }

  removeLink(i: number) {
    this.linkList.removeAt(i)
  }

  onPublish() {
    console.log(this.linkLstFrm.value);
    this.http.post('https://localhost:5001/api/linklist', this.linkLstFrm.value)
      .pipe(
        finalize(() => this.clearForm())
      )
      .subscribe(
        res => console.log('RESPONSE:', res),
        err => console.log('ERROR:', err),
        () => console.log('COMPLETE')
      );
  }

  


  showControlError(name: string): boolean {
    const control = this.linkLstFrm.get(name) as FormControl;
    return control.invalid && control.dirty && control.touched;
  }

  public get linkList(): FormArray {
    return this.linkLstFrm.get('links') as FormArray;
  }

  private newLink(url: string): FormGroup {

    const control = this.fb.group({
      url: url
    })

    return control;
  }

  private clearForm() {
    this.linkLstFrm.setControl('links', this.fb.array([]));

    const control = this.el.nativeElement.querySelector('[formcontrolname="url_input"');
    control.focus();
  }

}

