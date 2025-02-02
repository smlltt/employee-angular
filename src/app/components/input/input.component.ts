import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() id = '';
  @Input() control = new FormControl();
  @Input() label = '';

  errorMessages: Record<string, string> = {
    required: 'This field is required',
  };

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  ngOnInit() {
    console.log('InputComponent cintroi', this.control); // Now this will work correctly
  }
}
