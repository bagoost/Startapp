export interface ActionInterface {
  type: 'START_LOADING' | 'FINISH_LOADING';
  data?: {
    token?: string;
  };
}
