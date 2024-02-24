import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { testActions } from "../ng-rx-store/test/test.actions";
import { testSelectors } from "../ng-rx-store/test/test.selectors";
import { TestState } from "../ng-rx-store/test/test.state";
import { RootState } from "../ng-rx-store/state";

@Component({
    selector: 'app-test',
    imports: [CommonModule],
    template: `
        <div>
            <h3>Test</h3>
            <button (click)="buttonClicked()">Click me</button>
            <div>Resp: {{ serverResponse$ | async }}</div>
        </div>
    `,
    standalone: true
})
export class TestComponent {
    protected serverResponse$ = this.store.select(testSelectors.selectServerResponse);

    constructor(private store: Store<RootState>) {}

    protected buttonClicked() {
        this.store.dispatch(testActions.testCallServer());
    }
}