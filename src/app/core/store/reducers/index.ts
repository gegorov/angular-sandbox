import { ActionReducerMap, MetaReducer, createSelector } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { filmsToWatchReducer, FilmsToWatchState } from './films-to-watch.reducers';

export const stateFeatureKey: string = 'state';

export interface State {
    filmsToWatch: FilmsToWatchState;
}

export const reducers: ActionReducerMap<State> = {
    filmsToWatch: filmsToWatchReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectFilmsToWatchState = (state: State) => state.filmsToWatch;
export const selectFilmsToWatchList = createSelector(
    selectFilmsToWatchState,
    (state: FilmsToWatchState) => state.filmsToWatch
);
