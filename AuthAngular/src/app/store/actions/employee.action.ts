import { Employee } from "src/app/appInterface/emp.interface";

export class GetEmployee {
    static readonly type = '[Employee] Get'
}

export class SetSelectedEmployee {
    static readonly type = '[Employee] Set'
    constructor(public id: string){}
}


// export class AddEmployee {
//     static readonly type = '[Emloyee] Add';
//     constructor(public payload: Employee){}
// }

// export class UpdateEmployee {
//     static readonly type = '[Employee] Update';
//     constructor(public payload: Employee){}
// }

// export class DeleteEmployee {
//     static readonly type = '[Employee] Delete';
//     constructor(public id: string){}
// }