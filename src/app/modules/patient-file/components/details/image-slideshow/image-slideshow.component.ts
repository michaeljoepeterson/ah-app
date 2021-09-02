import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomFieldValue } from 'src/app/modules/custom-forms/models/custom-field-value';
import { PatientFileService } from '../../../services/patient-file.service';

@Component({
  selector: 'app-image-slideshow',
  templateUrl: './image-slideshow.component.html',
  styleUrls: ['./image-slideshow.component.css']
})
export class ImageSlideshowComponent implements OnInit {

  imageUrls:string[] = [];
  customValues:CustomFieldValue[] = [];
  subs:Subscription[];

  constructor(
    private patientFileService:PatientFileService
  ) { }

  ngOnInit(): void {
    let valSub = this.patientFileService.currentCustomValues.subscribe(values => {
      console.log('images: ',values);
    });

    this.subs = [valSub];
  }

  ngOnDestroy(){
    try{
      this.subs.forEach(sub => sub.unsubscribe());
    }
    catch(e){
      console.warn(e);
    }
  }
}
