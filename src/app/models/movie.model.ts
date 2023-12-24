export interface Movie {
    id: number,
    title: string,
    description: string,
    pPath: string,
    releaseYear: number,
    budget: number,
    rating: number,
    tagline: string,
    genres: Genre[],
}

interface Genre {
    id: number,
    name: string
}