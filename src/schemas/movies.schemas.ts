import {z} from 'zod'

export const movieSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string().nullish(),
	duration: z.number(),
	price: z.number()
})

export const movieSchemaRequest = movieSchema.omit({id: true})

export const listMoviesSchema = z.array(movieSchema)

export const updateMovieSchema = movieSchemaRequest.partial()
