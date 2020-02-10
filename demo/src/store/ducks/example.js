// example - delete later
import { combineEpics } from 'redux-observable';
import { switchMap, distinctUntilChanged, map, catchError } from 'rxjs/operators';
import { mockService } from '../../shared/services/exempleService';

export const Types = {
  // @@domain
  DOMAIN_ACTION: '@@domain/ACTION',
  DOMAIN_ACTION_RESPONSE: '@@domain/ACTION_RESPONSE',
  DOMAIN_ACTION_ERROR: '@@domain/ACTION_ERROR',
};

// Reducer
const domainReducer = (
  state = {
    error: false,
    success: false,
    data: {
      title: 'domainDataReducer',
    },
  },
  { type, payload },
) => {
  switch (type) {
    case Types.DOMAIN_ACTION:
      return { ...state, ...payload, load: true };
    case Types.DOMAIN_ACTION_RESPONSE:
      return { ...state, ...payload, success: true };
    case Types.DOMAIN_ACTION_ERROR:
      return { ...state, ...payload, error: true };
    default:
      return state;
  }
};

// Action Creators
export const domainAction = (payload) => ({ type: Types.DOMAIN_ACTION, payload });
export const domainActionResponse = (payload) => ({ type: Types.DOMAIN_ACTION_RESPONSE, payload });
export const domainActionError = (payload) => ({ type: Types.DOMAIN_ACTION_ERROR, payload });

// Epics
const domainEpic = (action$) =>
  action$
    .ofType(Types.DOMAIN_ACTION)
    .pipe(
      switchMap(() =>
        mockService().pipe(
          distinctUntilChanged(),
          map(domainActionResponse),
          catchError(domainActionError),
        ),
      ),
    );

export const exampleEpic = combineEpics(domainEpic);

export const exampleReducers = {
  domainState: domainReducer,
};
