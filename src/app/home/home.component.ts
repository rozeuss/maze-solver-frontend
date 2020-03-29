import {Component, OnInit} from '@angular/core';
import {HttpEventType} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {MazeService} from '../maze/maze.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Solution} from '../maze/maze';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  uploadResponse: Solution;
  form: FormGroup;
  show: boolean;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private mazeService: MazeService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      maze: ['']
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('maze').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    this.errorMessage = undefined;
    formData.append('file', this.form.get('maze').value);
    this.mazeService.upload(formData).pipe(map(value => {
      switch (value.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * value.loaded / value.total);
          return {status: 'progress', message: progress};
        case HttpEventType.Response:
          return value.body;
        default:
          return `Unhandled event: ${value.type}`;
      }
    })).subscribe(
      (res) => this.uploadResponse = res,
      (err) => this.errorMessage = err,
      () => this.show = true
    );
  }
}
