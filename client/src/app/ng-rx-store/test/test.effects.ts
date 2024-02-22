import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { RootState } from "../state";
import { testActions } from "./test.actions";
import { delay, map, tap } from "rxjs";

@Injectable({ providedIn: "root" })
export class TestEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
  ) {}

  testCallServer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(testActions.testCallServer),
      delay(1000),
      map(() =>
        testActions.testCallServerSuccess({
          serverResponse: "Server response",
        }),
      ),
    ),
  );
}
