/**
 * base model for app data models
 */
 export class BaseModel{
    _id:string = null;
    get id():string{
        return this._id;
    }
    set id(idVal:string){
        this._id = idVal;
    }

    constructor(){

    }

    /**
     * base agnostic data initialization for all app models
     * @param any data 
     */
    init(data:any){
        let keys = Object.keys(this);
        let dataKeys = Object.keys(data);
        let keyLookup = {};
        dataKeys.forEach(key => {
            keyLookup[key] = key;
        });
        keys.forEach(key => {
            if(data[key]){
                this[key] = data[key];
            }
            else if(key === '_id'){
                this.id = data._id || data.id;
            }
        });
    }

    /**
     * base serialize props and values for saving to db and returning data
     * @returns 
     */
    serialize():any{
        let keys = Object.keys(this);
        let data = {};
        keys.forEach(key => {
            if(typeof this[key] !== 'function' && (this[key] || this[key] === 0)){
                data[key] = this[key];
            }
        });
        return data;
    }
}