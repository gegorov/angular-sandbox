export interface Movie {
    posterPath: string | null;
    adult: boolean;
    overview: string;
    releaseDate: string;
    genreIds: Array<string>;
    id: number;
    originalTitle: string;
    originalLanguage: string;
    title: string;
    backdropPath: string | null;
    popularity: number;
    voteCount: number;
    video: boolean;
    voteAverage: number;
}
