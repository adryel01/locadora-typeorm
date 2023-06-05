import { Request, Response } from "express"
import { TMovie, TMovieRequest, TMoviesPagination, TOrderParams, TSortParams, TUpdateMovie } from "../interfaces/movies.interfaces"
import { createMoviesService } from "../services/movies/createMovies.service"
import { listMoviesService } from "../services/movies/listMovies.service"
import { ParsedQs } from "qs"
import { updateMoviesService } from "../services/movies/updateMovie.service"
import { deleteMoviesService } from "../services/movies/deleteMovies.service"
// import { updateMoviesService } from "../services/movies/updateMovie.service"

export const createMoviesController = async (request: Request, response: Response): Promise<Response> => {

	const movieData: TMovieRequest = request.body

	const newMovie = await createMoviesService(movieData)
	console.log(newMovie)

	return response.status(201).json(newMovie)
}


export const listMoviesController = async (request: Request, response: Response): Promise<Response> => {

	const page: any | undefined = request.query.page
	const perPage: any | undefined = request.query.perPage
	const sort: any | undefined = request.query.sort
	const order: any | undefined = request.query.order

	const listMovies = await listMoviesService(page, perPage, sort, order)

	return response.json(listMovies)
}


export const updateMoviesController = async (request: Request, response: Response): Promise<Response> => {

	const movieData: TUpdateMovie = request.body
	const movieId: number = parseInt(request.params.id)

	const newMovieData: TMovie = await updateMoviesService(movieData, movieId)

	return response.json(newMovieData)
}


export const deleteMoviesController = async (request: Request, response: Response): Promise<Response> => {

	const movieId: number = parseInt(request.params.id)

	await deleteMoviesService(movieId)

	return response.status(204).send()
}