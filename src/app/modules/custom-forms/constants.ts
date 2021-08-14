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
    types:FieldType[] = [
        {
            name:this.dropdown,
            displayName:'Dropdown'
        },
        {
            name:this.number,
            displayName:'Number'
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
            name:this.file,
            displayName:'File'
        },
        {
            name:this.date,
            displayName:'Date'
        },
        {
            name:this.image,
            displayName:'Image'
        }
    ];
}

export const fieldTypes = new FieldTypes();