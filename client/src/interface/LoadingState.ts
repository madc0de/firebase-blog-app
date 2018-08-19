import { LoadingStatus } from "./LoadingStatus";

export interface LoadingState {
  status: LoadingStatus;
  error: string;
}
