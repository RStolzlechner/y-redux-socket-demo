import { Component } from "@angular/core";

@Component({
    selector: 'app-test',
    template: `
        <div>
            <h3>Test</h3>
            <button (click)="buttonClicked()">Click me</button>
            <div>{{ serverResponse }}</div>
        </div>
    `,
    standalone: true
})
export class TestComponent {
    protected serverResponse = 'No server response yet';

    protected buttonClicked() {
        this.serverResponse = 'Server response mocked';
    }
}