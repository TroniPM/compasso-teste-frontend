import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StarredComponent } from './components/starred/starred.component';
import { RepositorioService } from './services/repositorio.service';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { InfosComponent } from './components/infos/infos.component';
import { AboutComponent } from './components/about/about.component';

export const routerConfig: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: 'infos',
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
      },
      {
        path: '',
        component: InfosComponent,
        outlet: 'sidedata'
      },
    ]

  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
