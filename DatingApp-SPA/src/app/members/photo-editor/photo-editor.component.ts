import { Photo } from './../../_models/photo';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

    @Input() photos: Photo[];

  constructor() { }

  ngOnInit() {
  }

}
