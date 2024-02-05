import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { ChatComponent } from './pages/chat/chat.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule
  ]
})
export class ComponentsModule { }
