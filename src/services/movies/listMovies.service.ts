import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { TListMovies, TMovie, TMoviesPagination, TOrderParams, TSortParams } from "../../interfaces/movies.interfaces";
import { Repository } from "typeorm";
import { listMoviesSchema } from "../../schemas/movies.schemas";
import { number } from "yargs";


export const listMoviesService = async (page: any, perPage: any, sort: TSortParams, order: any): Promise<any> => {
	const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

	let numPerPage = Math.abs(parseInt(perPage)) || 5

	let numPage = Math.abs(parseInt(page)) || 1

	let textSort = sort?sort: 'id' 

	let textOrder = order&&sort? order: 'asc'

	let skip: number = numPage > 1 ? (numPage - 1) * numPerPage : 1 || 1
	let take: number = numPerPage > 5 ? 5 : numPerPage || 5

	let orderObj = {}

	let totalMovies = await movieRepository.count()

	let prevPage = numPage > 1? `http://localhost:3000/movies?page=${numPage - 1}&perPage=${numPerPage}` :null;


	let nextPage = skip + numPerPage < totalMovies? `http://localhost:3000/movies?page=${numPage + 1}&perPage=${numPerPage}` :null;


	let dataMovies = {}


	if (textSort == 'duration') {
		orderObj = {
			duration: order&&order=='asc'||order&&order=='desc'?textOrder:'asc'
		}

		dataMovies = await movieRepository.find({
			skip: skip,
			take: take,
			order: orderObj
		})

		return {
			prevPage: prevPage,
			nextPage: nextPage,
			count: totalMovies,
			data: dataMovies
		}
	} else if (textSort == 'price') {
		orderObj = {
			price: order&&order=='asc'||order&&order=='desc'?textOrder:'asc'
		}
		
		dataMovies = await movieRepository.find({
			skip: skip,
			take: take,
			order: orderObj
		})

		return {
			prevPage: prevPage,
			nextPage: nextPage,
			count: totalMovies,
			data: dataMovies
		}
	}

	dataMovies = await movieRepository.find({
		skip: skip,
		take: take,
		order: {id: order&&order=='asc'||order&&order=='desc'?textOrder:'asc'}
	})

return {
	prevPage: prevPage,
	nextPage: nextPage,
	count: totalMovies,
	data: dataMovies
}


}