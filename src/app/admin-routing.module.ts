import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const routes: Routes = [

    { path: 'dashboard', component: DashboardComponent},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'}, //default route //pathMatch: 'full' -> concerns the entire path
    { path: '**', redirectTo: 'dashboard'}
    
    
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AdminRoutingModule{ }