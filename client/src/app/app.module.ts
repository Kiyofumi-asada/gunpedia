import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

//Component
import { AppComponent } from './app.component';
import { ListComponent } from './component/list/list.component';
import { ListDetailComponent } from './component/list-detail/list-detail.component';
import { DataRegistrationComponent } from './component/data-registration/data-registration.component';
//Service
import { AjaxService } from './service/ajax.service';
import { HotToastModule } from '@ngneat/hot-toast';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListDetailComponent,
    DataRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HotToastModule.forRoot(),
  ],
  providers: [AjaxService],
  bootstrap: [AppComponent],
})
export class AppModule {}
