import { Routes, RouterModule } from '@angular/router';


import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './pages/footer/footer.component';
import { ShopDetailsComponent } from './pages/shop_details/shop_details.component';
import { TiendaComponent } from './pages/tienda/tienda.component';

export const routes: Routes = [

  /* {
    path: '', redirectTo: '/', pathMatch: 'full'
  }, */
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'footer',
    component: FooterComponent
  },
  {
    path: 'details',
    component: ShopDetailsComponent
  },
  {
    path: 'tienda',
    component: TiendaComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },

];


