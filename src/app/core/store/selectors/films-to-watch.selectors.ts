import { createSelector, MemoizedSelector, DefaultProjectorFn } from '@ngrx/store';

import { FilmsToWatchState, AppState } from '../reducers/index';
import { MovieWithCast } from '../../models/index';

export const selectFilmsToWatchState: (state: AppState) => Array<MovieWithCast> = (
    state: AppState
): Array<MovieWithCast> => state.filmsToWatch;
export const selectFilmsToWatchList: MemoizedSelector<
    AppState,
    Array<MovieWithCast>,
    DefaultProjectorFn<Array<MovieWithCast>>
> = createSelector(
    selectFilmsToWatchState,
    (state: FilmsToWatchState) => state
);
