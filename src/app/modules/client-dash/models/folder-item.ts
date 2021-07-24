import { FileItem, IfileItem } from "./file-item";
import { DateEvent, IDateEvent } from "./date-event"; 
import { DynamicFormData } from "../../notifications/models/dynamic-form-models";

export const folderType = 'folder';

export interface IFolderItem{
    name:string;
    files?:(FileItem|IfileItem)[];
    subFolders?:(FolderItem|IFolderItem)[];
    sortOrder?:number;
    customSort?:boolean;
    dateEvents?:IDateEvent[];
    details?:string;
    id?:string;
}

export class FolderItem implements IFolderItem{
    name:string = null;
    files?:FileItem[] = [];
    subFolders?:FolderItem[] = [];
    type:string = folderType;
    sortOrder?:number = null;
    customSort?:boolean = false;
    dateEvents?:DateEvent[] = [];
    details?:string = null;
    id?:string = null;
    ancestors?:string[] = [];
    parent?:string = null;

    constructor(data?:any){
        if(data){
            this.init(data);
        }
    }

    init(data:any){
        let subFolders = "subFolders";
        let dates = "dateEvents";
        let files = "files";
        let keys = Object.keys(this);
        if(data[dates]){
            this.dateEvents = data[dates].map(date => new DateEvent(date));
        }
        keys.forEach(key => {
            if(key !== dates){
                if((data[key] || data[key] === 0) && key !== subFolders && key !== files){
                    this[key] = data[key];
                }
                else if(data[key] &&  key === subFolders){
                    let folders = data.subFolders.map(folder => new FolderItem(folder));
                    this.subFolders = folders;
                }
                else if(data[key] &&  key === files){
                    let files = data.files.map(file => new FileItem(file));
                    this.files = files;
                }
            }
        });
    }
    
    flattenItems():(FolderItem|FileItem)[]{
        let items = [];
        if(this.customSort){
            items = this.getCustomSortedItems();
        }
        else{
            items = [...this.subFolders,...this.files];
        }

        return items;
    }

    getCustomSortedItems():(FolderItem|FileItem)[]{
        let combinedItems = [];

        let length = this.files.length + this.subFolders.length;
        for(let i = 0;i < length;i++){
          combinedItems.push({});
        }
        this.files.forEach(file => {
          let {sortOrder} = file;
          combinedItems[sortOrder] = new FileItem(file);
        });
        this.subFolders.forEach(folder => {
          let {sortOrder} = folder;
          combinedItems[sortOrder] = new FolderItem(folder);
        });

        return combinedItems;
    }

    getStatuses():string[]{
        let statuses = this.dateEvents.map(event => event.status);
        return statuses;
    }

}

export let baseFolderFormData:DynamicFormData ={
    formTitle:'Create a New Folder',
    fields:[
      {
        label:'Folder Name'
      }
    ]
}
