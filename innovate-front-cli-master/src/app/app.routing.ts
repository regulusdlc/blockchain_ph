import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { CustRegisterComponent } from './custregister';
import { TransferCoinComponent } from './transfer-coin/transfer-coin.component';
import { DisplaybalComponent } from './displaybal/displaybal.component';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'custregister', component: CustRegisterComponent, canActivate: [AuthGuard] },
    { path: 'displaybal', component: DisplaybalComponent, canActivate: [AuthGuard] },
    { path: 'transfer-coin', component: TransferCoinComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);