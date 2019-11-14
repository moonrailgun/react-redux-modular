export interface FluxStandardAction {
  type: string;
  payload?: {
    [key: string]: any;
  };
  error?: boolean;
  meta?: any;
}

export interface StandardState {
  [key: string]: any;
}
