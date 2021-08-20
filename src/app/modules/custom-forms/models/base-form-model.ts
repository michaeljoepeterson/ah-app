import { BaseModel } from "../../../models/baseModel";
import { fieldTypes } from "../constants";
import { CustomField } from "./custom-field";

export class BaseFormModel extends BaseModel{
    sections:any[] = [];
    fields:CustomField[] = [];
    combinedChildren:any[] = [];
    
    combineChildren(){
        let combinedChildren = [...this.fields,...this.sections];
        combinedChildren = combinedChildren.sort((fieldA, fieldB) => {
            if(fieldA.sortOrder < fieldB.sortOrder){
                return -1;
            }
            else if(fieldA.sortOrder > fieldB.sortOrder){
                return  1;
            }
            else{
                return 0;
            }
        });
        this.combinedChildren = combinedChildren;
    }

    addNewField(){
        let newCombinedSections = [...this.combinedChildren];
        let newField = new CustomField();
        newField.name = 'New Field';
        newField.fieldType = fieldTypes.text;
        newCombinedSections.push(newField);
        this.combinedChildren = newCombinedSections;
    }

    removeNewItems(){
        this.combinedChildren = this.combinedChildren.filter(child => child.id);
    }

    addSection(section:any){
        this.combinedChildren.push(section);
    }
}