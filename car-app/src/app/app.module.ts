import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';  // Importando HttpClientModule
import { AppComponent } from './app.component';
import { routes } from './app.routes'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Para animações

import { HomeComponent } from './car/home/home.component'; 
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // Adicionando HttpClientModule
    RouterModule.forRoot(routes), 
    HomeComponent,
    BrowserAnimationsModule, 
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
