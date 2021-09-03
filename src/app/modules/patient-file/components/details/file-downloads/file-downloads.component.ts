import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { fieldTypes, FieldTypes } from '../../../../custom-forms/constants';
import { CustomFieldValue } from '../../../../custom-forms/models/custom-field-value';
import { UploadService } from '../../../../../services/upload.service';
import { PatientFileService } from '../../../services/patient-file.service';
import { PatientFile } from '../../../../client-dash/models/patient-file';
@Component({
  selector: 'app-file-downloads',
  templateUrl: './file-downloads.component.html',
  styleUrls: ['./file-downloads.component.css']
})
export class FileDownloadsComponent implements OnInit {
  @Input() file:PatientFile;
  customValues:CustomFieldValue[] = [];
  fileUrls:string[] = [];
  subs:Subscription[];
  fieldTypes:FieldTypes = fieldTypes;

  constructor(
    private patientFileService:PatientFileService,
    private uploadService:UploadService,
    private ref:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    let valSub = this.patientFileService.currentCustomValues.subscribe(values => {
      if(values){
        this.getFileValues(values);
        this.getFileUrls(this.customValues);
      }
    });

    this.subs = [valSub];
  }

  getFileValues(values:CustomFieldValue[]){
    this.customValues = values.filter(val => val.fieldType === this.fieldTypes.file);
  }

  async getFileUrls(values:CustomFieldValue[]){
    let requests = [];
    values.forEach(val => {
      requests.push(this.uploadService.getFile(val.value.filePath,this.file.id));
    });
    this.fileUrls = await Promise.all(requests);
    console.log(this.fileUrls);
    this.ref.detectChanges();
  }
}
