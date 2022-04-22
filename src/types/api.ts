import { IBudget, IExternalId, IMovieInformation, IRating } from './movies';

export interface User {
    id: number;
    name: string;
    imageUrl: string;
}

export interface Rate {
    id: number;
    rate: number;
    user: User;
}

export interface IGetMyRatesMovies {
    id: number;
    userId: number;
    rate: number;
    movieId: number;
    updateDate: Date;
    movie: {
        content: IMovieInformation
    };
}

export interface IGetMovieState {
    comments: any[];
    rates: Rate[];
    isWish: boolean;
}

export interface IGetWishMovies {
    id: number;
    movieId: number;
    userId: number;
    movie: {
        content: IMovieInformation
    };
}

export interface IGenre {
    id: number;
    genre: string;
}

export interface ICountry {
    id: number;
    country: string;
}
