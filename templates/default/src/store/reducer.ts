import { StateInterface, ActionInterface } from '../interfaces';

export const defaultState: StateInterface = {
  loading: 0,
};

export const reducer = (state: StateInterface, action: ActionInterface): StateInterface => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        loading: state.loading + 1,
      };
    case 'FINISH_LOADING':
      return {
        ...state,
        loading: state.loading - 1,
      };
    default:
      return state;
  }
};
