import { ResponseMovie, Movie, Cast, RawCast } from '../models';

/**
 * function that generates random alpha char to be used as a query parameter in lucy search
 */
export const generateRandomChar: () => string = (): string => {
  const dictionary: string = 'abcdefghijklmnopqrstuvwxyz';
  const index: number = Math.floor(Math.random() * (dictionary.length + 1));
  return dictionary[index];
};

/**
 * Mapper function that is used to transform objects from api responce that have
 * snake_case propreties to camelCase propreties
 */
export const transformMovieData: (response: ResponseMovie) => Movie = ({
  poster_path: posterPath,
  release_date: releaseDate,
  genre_ids: genreIds,
  original_title: originalTitle,
  original_language: originalLanguage,
  backdrop_path: backdropPath,
  vote_count: voteCount,
  vote_average: voteAverage,
  ...rest
}: ResponseMovie): Movie => ({
  posterPath,
  releaseDate,
  genreIds,
  originalTitle,
  originalLanguage,
  backdropPath,
  voteCount,
  voteAverage,
  ...rest
});

export const transformCastData: (response: RawCast) => Cast = ({
  cast_id: castId,
  credit_id: creditId,
  profile_path: profilePath,
  ...rest
}: RawCast): Cast => ({
  castId,
  creditId,
  profilePath,
  ...rest
});
