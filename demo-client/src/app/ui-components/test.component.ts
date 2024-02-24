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
            <h3>HTTP Request - Response</h3>
            <button (click)="httpRequestResponseClicked()">click me</button>
            <div>Resp: {{ httpRequestResponse$ | async }}</div>
        </div>
    `,
    standalone: true
})
export class TestComponent {
    protected httpRequestResponse$ = this.store.select(testSelectors.selectHttpRequestResponse);

    constructor(private store: Store<RootState>) {}

    protected httpRequestResponseClicked() {
        this.store.dispatch(testActions.httpRequestResponse());
    }
}
