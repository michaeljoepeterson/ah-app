import { FileItem, IfileItem } from "./file-item";

export const folderType = 'folder';

export interface IFolderItem{
    name:string;
    files?:(FileItem|IfileItem)[];
    subFolders?:(FolderItem|IFolderItem)[];
}

export class FolderItem implements IFolderItem{
    name:string = null;
    files?:FileItem[] = null;
    subFolders?:FolderItem[] = [];
    type:string = folderType;

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
            if(data[key] && key !== subFolders && key !== files){
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