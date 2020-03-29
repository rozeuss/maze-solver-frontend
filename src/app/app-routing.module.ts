import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MazeListComponent} from './maze/maze-list.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'mazes', component: MazeListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
