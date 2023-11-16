import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { reducer } from './reduiser/auth.reducer';
import { reducerService } from './reduiser/service.reducer';

import { localStorageSync } from 'ngrx-store-localstorage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { AvisComponent } from './avis/avis.component';
import { ConavComponent } from './conav/conav.component';
import { EventsComponent } from './events/events.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { FormsModule } from '@angular/forms';
import { ServiceComponent } from './service/service.component';
import { ListingComponent } from './listing/listing.component';
import { ContactComponent } from './contact/contact.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { AdminComponent } from './admin/admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CategoryAdminComponent } from './category-admin/category-admin.component';
import { CalendarComponent } from './calendar/calendar.component';
import { UsersComponent } from './users/users.component';
import { ServiceAdminComponent } from './service-admin/service-admin.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from './app-notifications/app-notifications.component';
import { DonneAvisComponent } from './donne-avis/donne-avis.component';
import { AvisAdminComponent } from './avis-admin/avis-admin.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { CommandeComponent } from './commande/commande.component';
import { ReservationinfoAdminComponent } from './reservationinfo-admin/reservationinfo-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    NavbarComponent,
    FooterComponent,
    ProfileComponent,
    AvisComponent,
    ConavComponent,
    EventsComponent,
    AccueilComponent,
    ServiceComponent,
    ListingComponent,
    ContactComponent,
    CreateServiceComponent,
    AdminComponent,
    SidebarComponent,
    CategoryAdminComponent,
    CalendarComponent,
    UsersComponent,
    ServiceAdminComponent,
    ReservationComponent,
    NotificationsComponent,
    DonneAvisComponent,
    AvisAdminComponent,
    CreateReservationComponent,
    CommandeComponent,
    ReservationinfoAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(
      { user: reducer, service: reducerService },
      {
        metaReducers: [localStorageSyncReducer],
      }
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['user'], rehydrate: true })(reducer);
}
