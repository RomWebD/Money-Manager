import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LoaderComponent } from './components/loader/loader.compontent';

@NgModule({
  declarations:[LoaderComponent],
  imports: [FormsModule, ReactiveFormsModule,NgxChartsModule],
  exports: [FormsModule, 
    ReactiveFormsModule,
    NgxChartsModule,
    LoaderComponent],
})

export class SharedModule {}
