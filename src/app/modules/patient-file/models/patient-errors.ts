import { PatientFile } from "../../client-dash/models/patient-file";

export class PatientErrors{
    patientId:boolean = false;
    height:boolean = false;
    weight:boolean = false;
    activityLevel:boolean = false;

    checkErrors(file:PatientFile):boolean{
        let hasErrors = false;

        this.patientId = file.patientId ? false : true;
        this.height = file.height ? false : true;
        this.weight = file.weight ? false : true;
        this.height = file.height ? false : true;
        this.activityLevel = file.activityLevel ? false : true;

        return hasErrors;
    }
}