import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ClientGridComponent } from './client-grid/client-grid.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { ServerGridComponent } from './server-grid/server-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    DatePickerComponent,
    MultiSelectComponent,
    ClientGridComponent,
    ServerGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
