import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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



@NgModule({
  declarations: [
    HeaderComponent,
    SearchBarComponent,
    ArrayToStringPipe,
    TranslatePipe,
    DialogComponent
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
    MatButtonModule
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
    MatButtonModule
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
      ]
    };
  }
}

