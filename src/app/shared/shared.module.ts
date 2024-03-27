import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { ArrayToStringPipe } from './pipes/array-to-string.pipe';
import { TranslationService } from './services/translate.service';
import { TranslatePipe } from './pipes/translate.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    HeaderComponent,
    SearchBarComponent,
    ArrayToStringPipe,
    TranslatePipe,
    DialogComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ],
  exports: [
    HeaderComponent,
    SearchBarComponent,
    ArrayToStringPipe,
    TranslatePipe,
    DialogComponent,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LoaderComponent,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
    ArrayToStringPipe,
    TranslatePipe
  ]
})
export class SharedModule {
  constructor() { }
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        TranslationService,
        DatePipe,
        CurrencyPipe
      ]
    };
  }
}

