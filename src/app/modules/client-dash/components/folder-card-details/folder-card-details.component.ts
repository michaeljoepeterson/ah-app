import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientFile } from '../../models/patient-file';
import { FolderItem } from '../../models/folder-item';
import { FolderNavService } from '../../services/folder-nav.service';
import { FormService } from '../../../custom-forms/services/form.service';
import { CustomForm } from '../../../custom-forms/models/custom-form';
import { PatientFileService } from '../../../patient-file/services/patient-file.service';

@Component({
  selector: 'app-folder-card-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './folder-card-details.component.html',
  styleUrls: ['./folder-card-details.component.css']
})
export class FolderCardDetailsComponent implements OnInit {
  subs:Subscription[] = [];
  selectedItem:(FolderItem|PatientFile);
  selectedFolder:FolderItem;
  selectedForm:CustomForm;
  selectedFile:PatientFile;
  isEditing:boolean = false;
  isUpdationg:boolean = false;

  constructor(
    private ref:ChangeDetectorRef,
    private folderNavService:FolderNavService,
    private formService:FormService,
    private patientFileService:PatientFileService
  ) { }

  ngOnInit(): void {
    let itemSub = this.folderNavService.selectedItem.subscribe(item => {
      this.selectedItem = item;
      if(this.selectedItem instanceof PatientFile){
        this.selectedFile = item as PatientFile;
      }
      else{
        this.selectedFile = null;
      }
      this.ref.markForCheck();
    });

    let formSub = this.patientFileService.patientForm.subscribe(form => {
      this.selectedForm = form;
      this.ref.markForCheck();
    });

    this.subs = [itemSub,formSub];
  }

  ngOnDestroy(){
    try{
      this.subs.forEach(sub => sub.unsubscribe());
    }
    catch(e){
      console.warn('Error cleaning up folder details:',e)
    }
  }
}
