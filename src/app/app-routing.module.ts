import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StarredComponent } from './components/starred/starred.component';
import { RepositorioService } from './services/repositorio.service';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { InfosComponent } from './components/infos/infos.component';

export const routerConfig: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: InfosComponent,
        outlet: 'sidedata'
      },
      {
        path: 'repos',
        component: RepositoriesComponent,
        outlet: 'sidedata'
      },
      {
        path: 'starred',
        component: StarredComponent,
        outlet: 'sidedata'
      }
    ]

  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
