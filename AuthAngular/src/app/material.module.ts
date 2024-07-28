import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MatButtonModule, MatIconButton } from "@angular/material/button"
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';

const data : any =  [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
];

@NgModule({
    imports: data,
    exports: data,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MaterialModule {

}