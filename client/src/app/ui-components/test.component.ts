import { Component } from "@angular/core";
import { State, Store } from "@ngrx/store";
import { MyState } from "../ng-rx-store/state";
import { actions } from "../ng-rx-store/actions";
import { selectors } from "../ng-rx-store/selectors";
import { CommonModule } from "@angular/common";

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
    protected serverResponse$ = this.store.select(selectors.selectServerResponse);

    constructor(private store: Store<MyState>) {}

    protected buttonClicked() {
        this.store.dispatch(actions.testCallServer());
    }
}