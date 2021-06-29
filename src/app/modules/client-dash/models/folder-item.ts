import { FileItem, IfileItem } from "./file-item";

export const folderType = 'folder';

export interface IFolderItem{
    name:string;
    files?:(FileItem|IfileItem)[];
    subFolders?:(FolderItem|IFolderItem)[];
    sortOrder?:number;
    customSort?:boolean
}

export class FolderItem implements IFolderItem{
    name:string = null;
    files?:FileItem[] = [];
    subFolders?:FolderItem[] = [];
    type:string = folderType;
    sortOrder?:number = null;
    customSort?:boolean = false;

    constructor(data?:any){
        if(data){
            this.init(data);
        }
    }

    init(data:any){
        let subFolders = "subFolders";
        let files = "files";
        let keys = Object.keys(this);
        keys.forEach(key => {
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
        });
    }
}