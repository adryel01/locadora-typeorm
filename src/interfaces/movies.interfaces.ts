import {z} from 'zod'
import { listMoviesSchema, movieSchema, movieSchemaRequest, updateMovieSchema } from '../schemas/movies.schemas';
import { DeepPartial } from 'typeorm';

export type TMovie = z.infer<typeof movieSchema>
export type TMovieRequest = z.infer<typeof movieSchemaRequest>
export type TListMovies = z.infer<typeof listMoviesSchema>
export type TUpdateMovie = DeepPartial<TMovieRequest>
export type TSortParams = 'duration' | 'price' | 'id' | undefined
export type TOrderParams = 'asc' | 'desc' | undefined

export type TMoviesPagination = {
	prevPage: string | null | undefined;
	nextPage: string | null | undefined;
	count: number;
	data: TListMovies
}