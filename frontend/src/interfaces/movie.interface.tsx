export interface GenreInterface {
    id?: number;
    name: string;
}

export interface ActorInterface {
    id?: number;
    firstname: string;
    lastname: string;
}

export interface DirectorInterface {
    id?: number;
    firstname: string;
    lastname: string;
}

export interface MovieInterface {
    id?: number;
    name: string;
    year: number|null;
    rating: number|null;
    genres: GenreInterface[];
    actors: Array<ActorInterface>;
    director?: DirectorInterface|null;
    synopsis: string;
    ageLimit: number|null;
}
