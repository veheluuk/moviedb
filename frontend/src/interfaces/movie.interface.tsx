interface GenreInterface {
    name: string;
}

interface ActorInterface {
    id?: number;
    firstname: string;
    lastname: string;
}

interface DirectorInterface {
    id?: number;
    firstname: string;
    lastname: string;
}

export default interface MovieInterface {
    id?: number;
    name: string;
    year: number|null;
    rating: number|null;
    genres: string[];
    actors?: Array<ActorInterface>;
    director?: DirectorInterface;
    synopsis: string;
    ageLimit: number|null;
}
