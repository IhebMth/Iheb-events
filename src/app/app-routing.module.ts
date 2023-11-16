import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { EventsComponent } from './events/events.component';
import { ServiceComponent } from './service/service.component';
import { ListingComponent } from './listing/listing.component';
import { ContactComponent } from './contact/contact.component';
import { CreateServiceComponent } from './create-service/create-service.component';

import { AuthGuard } from './auth.guard';
import { AuthinGuard } from './auth.inguard';
import { AdminComponent } from './admin/admin.component';
import { CategoryAdminComponent } from './category-admin/category-admin.component';
import { UsersComponent } from './users/users.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NotificationsComponent } from './app-notifications/app-notifications.component';
import { AvisComponent } from './avis/avis.component';
import { AvisAdminComponent } from './avis-admin/avis-admin.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { CommandeComponent } from './commande/commande.component';
import { ReservationinfoAdminComponent } from './reservationinfo-admin/reservationinfo-admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/accueil',
    pathMatch: 'full',
  },
  {
    path: 'accueil',
    component: AccueilComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'avis/:reservationId/:userId', component: AvisComponent },

  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [AuthinGuard],
  },

  {
    path: 'inscription',
    component: SignupComponent,
    canActivate: [AuthinGuard],
  },
  {
    path: 'commande',
    component: CommandeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'commande',
    component: CommandeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reserver',
    component: CreateReservationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'service',
    component: ServiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notfication',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'services',
    component: ListingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'create-service',
    component: CreateServiceComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: '', // Empty path denotes the default child route
        redirectTo: 'calendar',
        pathMatch: 'full',
      },
      { path: 'category', component: CategoryAdminComponent },
      { path: 'Users', component: UsersComponent },
      { path: 'reservation', component: ReservationComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'reservtionifo', component: ReservationinfoAdminComponent },
      { path: 'avis', component: AvisAdminComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
