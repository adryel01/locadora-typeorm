import { Request, Response, NextFunction } from "express"
import { TMovie, TMovieRequest } from "../interfaces/movies.interfaces"
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const ensureNameNotExistsMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<TMovieRequest | void> => {
	const movieName: string = request.body.name

	const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

	const movie: Movie[] | null = await movieRepository.findBy({

		name: movieName

	})

	if (movie.length != 0) {
		throw new AppError('Movie already exists.', 409)
	}

	return next()

}