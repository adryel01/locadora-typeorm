import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Movie } from "../../entities"
import { TMovie, TMovieRequest, TUpdateMovie } from "../../interfaces/movies.interfaces"
import { movieSchema } from "../../schemas/movies.schemas"

export const updateMoviesService = async (movieData: TUpdateMovie, movieId: number):Promise<TMovie> => {

	const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

	const oldMovieData: Movie | null = await movieRepository.findOneBy({
		id: movieId
	})

	const newMovieData: Movie = movieRepository.create({
		...oldMovieData,
		...movieData
	})

	await movieRepository.save(newMovieData)

	const returnMovie = movieSchema.parse(newMovieData)

	return returnMovie
}