import { ActionReducerMap, MetaReducer, createSelector } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { filmsToWatchReducer, FilmsToWatchState } from './films-to-watch.reducers';

export const stateFeatureKey: string = 'state';

export interface AppState {
    filmsToWatch: FilmsToWatchState;
}

export const reducers: ActionReducerMap<AppState> = {
    filmsToWatch: filmsToWatchReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectFilmsToWatchState = (state: AppState) => state.filmsToWatch;
export const selectFilmsToWatchList = createSelector(
    selectFilmsToWatchState,
    (state: FilmsToWatchState) => state
);
