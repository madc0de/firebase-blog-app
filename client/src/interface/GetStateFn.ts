import { AppState } from "./AppState";

export interface GetStateFn {
  (): AppState;
}
