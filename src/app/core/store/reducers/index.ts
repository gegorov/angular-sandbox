import { ActionReducerMap, MetaReducer } from '@ngrx/store';
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

export { FilmsToWatchState } from './films-to-watch.reducers';
