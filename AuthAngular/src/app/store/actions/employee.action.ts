import { Employee } from "src/app/appInterface/emp.interface";

export class GetEmployee {
    static readonly type = '[Employee] Get'
}

export class AddEmployee {
    static readonly type = '[Emloyee] Add';
    constructor(public payload: Employee){}
}

export class GetSingleEmployee {
    static readonly type = '[Employee] GetOne'
    constructor(public id: string){}
}

export class UpdateEmployee {
    static readonly type = '[Employee] Update';
    constructor(public payload: Employee){}
}

export class DeleteEmployee {
    static readonly type = '[Employee] Delete';
    constructor(public id: string){}
}