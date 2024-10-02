import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { InteractableGraphComponent } from './interactable-graph/interactable-graph.component';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        InteractableGraphComponent,
    ],
    imports: [
        CommonModule,
    ],
    providers: [provideHttpClient()],
    bootstrap: [AppComponent]
})
export class AppModule { }