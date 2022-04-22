export interface ICountry {
        country: string;
    }

export interface IGenre {
        genre: string;
    }

export interface IMovieData {
        filmId: number;
        nameRu: string;
        nameEn: string;
        webUrl: string;
        posterUrl: string;
        posterUrlPreview: string;
        year: number;
        filmLength: string;
        slogan: string;
        description: string;
        type: string;
        ratingMpaa: string;
        ratingAgeLimits: number;
        premiereRu: string;
        distributors: string;
        premiereWorld: string;
        premiereDigital?: any;
        premiereWorldCountry: string;
        premiereDvd: string;
        premiereBluRay?: any;
        distributorRelease: string;
        countries: ICountry[];
        genres: IGenre[];
        facts: string[];
        seasons: any[];
    }

export interface IExternalId {
        imdbId: string;
    }

export interface IRating {
        rating: number;
        ratingVoteCount: number;
        ratingImdb: number;
        ratingImdbVoteCount: number;
        ratingFilmCritics: string;
        ratingFilmCriticsVoteCount: number;
        ratingAwait: string;
        ratingAwaitCount: number;
        ratingRfCritics: string;
        ratingRfCriticsVoteCount: number;
    }

export interface IBudget {
        grossRu: number;
        grossUsa: number;
        grossWorld: number;
        budget: string;
        marketing?: any;
    }

export interface IMovieInformation {
        data: IMovieData;
        externalId: IExternalId;
        rating: IRating;
        budget: IBudget;
    }

export interface IMovieListItem {
        kinopoiskId: number;
        imdbId: string;
        nameRu: string;
        nameEn?: any;
        nameOriginal: string;
        countries: ICountry[];
        genres: IGenre[];
        ratingKinopoisk: number;
        ratingImdb: number;
        year: number;
        type: string;
        posterUrl: string;
        posterUrlPreview: string;
    }

export interface IMainMovieInfo {
        filmId: number;
        nameRu: string;
        nameEn: string;
        nameOriginal: string;
        posterUrl: string;
        posterUrlPreview: string;
        relationType: string;
    }

export interface IStaffItem {
    staffId: number;
    nameRu: string;
    nameEn: string;
    description: string;
    posterUrl: string;
    professionText: string;
    professionKey: string;
}

export interface ITorrentItem {
        author: string;
        category: string;
        id: string;
        leeches: number;
        seeds: number;
        size: any;
        state: string;
        title: string;
        downloads: number;
        registered: Date;
        host: string;
    }
