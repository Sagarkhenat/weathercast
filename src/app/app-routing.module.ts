import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.page').then( m => m.PrivacyPolicyPage)
  },
  {
    path: 'weather-radar',
    loadComponent: () => import('./pages/weather-radar/weather-radar.page').then( m => m.WeatherRadarPage)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
