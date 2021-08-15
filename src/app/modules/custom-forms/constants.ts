export interface FieldType{
    name:string;
    displayName:string;
}

/**
 * model for the possible field types
 */
export class FieldTypes{
    dropdown:string = 'dropdown'
    number:string = 'number';
    radio:string = 'radio';
    checkbox:string = 'checkbox';
    file:string = 'file';
    date:string = 'date';
    image:string = 'image';
    text:string = 'text'
    types:FieldType[] = [
        {
            name:this.text,
            displayName:'Text'
        },
        {
            name:this.number,
            displayName:'Number'
        },
        {
            name:this.dropdown,
            displayName:'Dropdown'
        },
        {
            name:this.radio,
            displayName:'Radio Buttons'
        },
        {
            name:this.checkbox,
            displayName:'Checkboxes'
        },
        {
            name:this.date,
            displayName:'Date'
        },
        {
            name:this.file,
            displayName:'File'
        },
        {
            name:this.image,
            displayName:'Image'
        }
    ];
}

export const fieldTypes = new FieldTypes();