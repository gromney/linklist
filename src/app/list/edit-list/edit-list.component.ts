import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, map } from 'rxjs/operators';
import { LinkListService } from 'src/app/common/services/link-list.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { ILinkList } from 'src/app/models/link-list.model';

const urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
const titleRegex = '^[A-Za-z0-9_-]*($|\\s)'

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  updateMode = false;
  editForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: Router, private el: ElementRef, private linkService: LinkListService, @Inject(DOCUMENT) public doc: Document, public loading: LoadingService) {

    this.buildForm();

  }

  private buildForm() {

    this.editForm = this.fb.group({
      id: [],
      title: ['', {
        validators: [Validators.required, Validators.pattern(titleRegex)
        ],
        asyncValidators: [avaliableValidator(this.linkService)],
        updateOn: 'blur'
      }],
      description: [''],
      url_input: ['', Validators.pattern(urlRegex)],
      links: this.fb.array([], Validators.required)
    });

    //update mode
    let collection = this.route.getCurrentNavigation()?.extras.state as ILinkList;
    if (collection) {
      this.updateMode = true;
      // this.editForm.setControl('editForm', this.fb.group(collection));
      this.editForm.setControl('id', this.fb.control(collection.id))
      this.editForm.setControl('title', this.fb.control({ value: collection.title, disabled: true }, []));

      let links = collection.links ? collection.links : [];

      this.editForm.controls.description.setValue(collection.description);

      this.editForm.setControl('links', this.fb.array(links));

    }

  }

  ngOnInit(): void {
  }

  addLink(target: any) {
    if (this.editForm.controls['url_input'].invalid) {
      this.editForm.controls['url_input'].markAsTouched();
      return;
    }

    const newLink = this.newLink(target.value);

    this.linkList.push(newLink);
    this.editForm.controls['url_input'].reset();
  }

  removeLink(i: number) {
    this.linkList.removeAt(i)
  }

  onPublish() {
    // I need the TITLE after the PUSH/PUT request
    const keepedTitle = this.editForm.controls.title.value;

    if (this.updateMode) {

      this.linkService.update$(keepedTitle, this.editForm.value)
        .pipe(
          finalize(() => {
            this.route.navigate(['/', keepedTitle]);
          })
        )
        .subscribe(
          res => console.log('RESPONSE UPDATE:', res),
          err => console.log('ERROR DESE UPDATE:', err),
          () => console.log('COMPLETE UPDATE'),

        )

    } else {

      this.linkService.publish$(this.editForm.value)
        .pipe(
          finalize(() => {
            this.route.navigate(['/', keepedTitle]);
            console.log('NAVEGAR A LA LISTA');
            // this.clearForm()
          })
        )
        .subscribe(
          res => console.log('RESPONSE PUBLISH:', res),
          err => console.log('ERROR DESDE PUBLISH:', err),
          () => console.log('COMPLETE PUBLISH')
        );
    }


  }

  drop(event:CdkDragDrop<string[]>){
    this.moveItemInFormArray(event.previousIndex,event.currentIndex)
  }
  private moveItemInFormArray(from:number,to:number){
    if(from === to)
      return;

    const prev = this.linkList.at(from);
    const curr = this.linkList.at(to);

    this.linkList.setControl(to,prev);
    this.linkList.setControl(from,curr);

  }
  public get linkList(): FormArray {
    return this.editForm.get('links') as FormArray;
  }

  private newLink(url: string): FormGroup {
    const control = this.fb.group({
      url: url
    })

    return control;
  }


  get title() {
    return this.editForm.controls['title'];
  }

  get show_url_input_error(): boolean {
    const control = this.editForm.get('url_input') as FormControl;
    return control.invalid && control.dirty && control.touched;
  }

}

export function avaliableValidator(service: LinkListService): AsyncValidatorFn {
  return (control: AbstractControl) => {

    return service.available$(control.value)
      .pipe(
        map((available) => {
          return available ? null : { avaliableValidator: 'That URL is already taken.' }
        })
      )
  }
}
