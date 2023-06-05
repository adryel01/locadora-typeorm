import { DeleteResult, Repository } from "typeorm"
import { Movie } from "../../entities"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../error"

export const deleteMoviesService = async (movieId: number): Promise<void> => {

	const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

	if(!await movieRepository.findOneBy({id: movieId})){
		throw new AppError('Movie not found', 404)
	}

	await movieRepository.delete(movieId)

}