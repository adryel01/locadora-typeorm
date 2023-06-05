import { Request, Response, NextFunction } from "express"
import { TMovie } from "../interfaces/movies.interfaces"
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const ensureMovieNotExistsMiddleware = async (request: Request, response:Response, next: NextFunction): Promise<TMovie|void> => {
	const movieId: number = parseInt(request.params.id)

	const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

	const movie: Movie | null = await movieRepository.findOne({
		where: {
			id: movieId
		}
	})

	if(movie == null){
		throw new AppError('Movie not found', 404)
	}

	return next()

}