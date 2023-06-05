import { Repository } from "typeorm";
import { Movie } from "../../entities";
import { TMovieRequest } from "../../interfaces/movies.interfaces";
import { AppDataSource } from "../../data-source";
import { movieSchema } from "../../schemas/movies.schemas";

export const createMoviesService = async (movieData: TMovieRequest): Promise<Movie> => {

	const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

	const movie: Movie = movieRepository.create(movieData)
	await movieRepository.save(movie)

	const returnMovie = movieSchema.parse(movie)

	return returnMovie
}