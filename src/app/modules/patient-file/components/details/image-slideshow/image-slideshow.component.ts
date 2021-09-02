import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { fieldTypes, FieldTypes } from '../../../../custom-forms/constants';
import { CustomFieldValue } from '../../../../custom-forms/models/custom-field-value';
import { UploadService } from '../../../../../services/upload.service';
import { PatientFileService } from '../../../services/patient-file.service';
import { PatientFile } from 'src/app/modules/client-dash/models/patient-file';

@Component({
  selector: 'app-image-slideshow',
  templateUrl: './image-slideshow.component.html',
  styleUrls: ['./image-slideshow.component.css']
})
export class ImageSlideshowComponent implements OnInit {
  @Input() file:PatientFile;
  imageUrls:string[] = [];
  customValues:CustomFieldValue[] = [];
  subs:Subscription[];
  fieldTypes:FieldTypes = fieldTypes

  constructor(
    private patientFileService:PatientFileService,
    private uploadService:UploadService
  ) { }

  ngOnInit(): void {
    let valSub = this.patientFileService.currentCustomValues.subscribe(values => {
      console.log('images: ',values);
      if(values){
        this.getImageValues(values);
        this.getImageUrls(this.customValues);
      }
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

  getImageValues(values:CustomFieldValue[]){
    this.customValues = values.filter(value => value.fieldType === this.fieldTypes.image);
  }

  async getImageUrls(values:CustomFieldValue[]){
    let requests:Promise<string>[] = [];
    values.forEach(val => {
      requests.push(this.uploadService.getImage(val.value.filePath,this.file.id));
    });
    this.imageUrls = await Promise.all(requests);
    console.log(this.imageUrls);
  }
}
