import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InteractableGraphComponent } from './interactable-graph/interactable-graph.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InteractableGraphComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SP500';
}
