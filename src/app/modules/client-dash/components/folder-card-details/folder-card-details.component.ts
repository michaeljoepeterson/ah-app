import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientFile } from '../../models/patient-file';
import { FolderItem } from '../../models/folder-item';
import { FolderNavService } from '../../services/folder-nav.service';
import { FormService } from '../../../custom-forms/services/form.service';
import { CustomForm } from '../../../custom-forms/models/custom-form';

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

  constructor(
    private ref:ChangeDetectorRef,
    private folderNavService:FolderNavService,
    private formService:FormService
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

    let formSub = this.formService.selectedForm.subscribe(form => {
      this.selectedForm = form;
      console.log(this.selectedForm);
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
