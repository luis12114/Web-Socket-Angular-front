import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
const routes:Routes=[
  {
    path:'',
    children:[
      {
        path:'chatOne/:userId',
        //path:'chatOne',
        component:ChatComponent
      },
      {
        path:'**',
        redirectTo:'/'
      }
    ]
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ComponentsRoutingModule { }
