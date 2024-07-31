import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Employee } from "src/app/appInterface/emp.interface";
import { AddEmployee, DeleteEmployee, GetEmployee, SetSelectedEmployee, UpdateEmployee } from "../actions/employee.action";
import { DesignUtilityService } from "src/app/appServices/design-utility.service";
import { of, tap } from "rxjs";

// State Model

export class EmployeeStateModel {
    employees!: Employee[];
    employeesLoaded!: boolean;
    selectedEmployee!: Employee | null
}

// State

@State<EmployeeStateModel>({
    name: 'employees',
    defaults: {
        employees: [],
        employeesLoaded: false,
        selectedEmployee: null
    }
})

@Injectable()
export class EmployeeState {
    constructor(private _du: DesignUtilityService) { }

    // Selectors has logic to get state data

    // Get Employee list from state
    @Selector()
    static getEmployeeList(state: EmployeeStateModel) {
        return state.employees
    }

    // Get loaded employee from state
    @Selector()
    static employeeLoaded(state: EmployeeStateModel) {
        return state.employeesLoaded
    }

    // Get Selected Employee from state
    @Selector()
    static selectedEmployee(state: EmployeeStateModel) {
        return state.selectedEmployee
    }

    // Get Employees to State
    @Action(GetEmployee)
    getEmployees({ getState, setState }: StateContext<EmployeeStateModel>) {
        return this._du.getEmployeeList().pipe(
            tap((res: Employee[]) => {
                const state = getState();
                setState({
                    ...state,
                    employees: res,
                    employeesLoaded: true
                })
            })
        )
    }

    // Get Single Employee to State
    @Action(SetSelectedEmployee)
    setSelectedEmployee({ getState, setState }: StateContext<EmployeeStateModel>, { id }: SetSelectedEmployee) {
        const state = getState();
        const empList = state.employees;
        const index = empList.findIndex(emp => emp._id === id);

        if (empList.length > 0) {
            setState({
                ...state,
                selectedEmployee: empList[index]
            });
            return of();
        } else {
            return this._du.getEmployeeById(id).pipe(tap((res: Employee) => {
                const state = getState();
                const empList = [res]

                setState({
                    ...state,
                    employees: empList,
                    selectedEmployee: empList[0]
                })
            }))
        }
    }

    // Add Employee to State
    @Action(AddEmployee)
    addEmployee({ getState, patchState }: StateContext<EmployeeStateModel>, { payload }: AddEmployee) {
        return this._du.addEmployee(payload).pipe(tap((res: Employee) => {
            const state = getState();
            patchState({
                employees: [...state.employees, res]
            })
        }))
    }

    // Delete Employee to State
    @Action(DeleteEmployee)
    deleteEmployee({ getState, setState }: StateContext<EmployeeStateModel>, { id }: DeleteEmployee) {
        return this._du.deleteEmployee(id).pipe(tap((res: any) => {
            const state = getState();
            const filteredEmployees = state.employees.filter(emp => emp._id !== id)
            setState({
                ...state,
                employees: filteredEmployees
            })
        }))
    }

    // Update Employee in State
    @Action(UpdateEmployee)
    updateEmployee({ getState, patchState }: StateContext<EmployeeStateModel>, { payload }: UpdateEmployee) {
        const state = getState();
        const employeeId = payload._id; 

        return this._du.updateEmployee(employeeId, payload).pipe(
            tap((res: Employee) => {
                const empList = state.employees;
                const index = empList.findIndex(emp => emp._id === employeeId);

                if (index !== -1) {
                    empList[index] = res;
                    patchState({ employees: empList });
                }
            })
        );
    }
}