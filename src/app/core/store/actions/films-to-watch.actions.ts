import { createAction, props, ActionCreator } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { MovieWithCast } from '../../models/index';

enum FilmsToWatchActionTypes {
    AddFilm = '[FilmsToWatch] Add Film',
    RemoveFilm = '[FilmsToWatch] Remove Film'
}

type FilmsToWatchActionFunction = ActionCreator<
    FilmsToWatchActionTypes,
    (props: {
        film: MovieWithCast;
    }) => {
        film: MovieWithCast;
    } & TypedAction<FilmsToWatchActionTypes>
>;

export const addFilm: FilmsToWatchActionFunction = createAction(
    FilmsToWatchActionTypes.AddFilm,
    props<{ film: MovieWithCast }>()
);
export const removeFilm: FilmsToWatchActionFunction = createAction(
    FilmsToWatchActionTypes.RemoveFilm,
    props<{ film: MovieWithCast }>()
);
