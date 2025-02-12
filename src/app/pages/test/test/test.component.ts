import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { routePaths } from '../../../app.routes';

@Component({
  selector: 'app-test',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  routePaths = routePaths;
}
