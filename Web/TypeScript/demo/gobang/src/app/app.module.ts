import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { ElModule } from 'element-angular';

@NgModule({
    declarations: [
        AppComponent,
        BoardComponent
    ],
    imports: [
        BrowserModule,
        ElModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
