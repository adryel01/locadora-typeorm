import { Router } from "express";
import { createMoviesController, deleteMoviesController, listMoviesController, updateMoviesController } from "../controllers/movies.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { movieSchemaRequest, updateMovieSchema } from "../schemas/movies.schemas";
import { ensureMovieNotExistsMiddleware } from "../middlewares/ensureMovieNotExists.middleware";
import { ensureNameNotExistsMiddleware } from "../middlewares/ensureNameNotExists.middleware";

export const moviesRouter: Router = Router()

moviesRouter.post('', ensureNameNotExistsMiddleware,ensureDataIsValidMiddleware(movieSchemaRequest), createMoviesController)

moviesRouter.get('', listMoviesController)

moviesRouter.patch('/:id', ensureDataIsValidMiddleware(updateMovieSchema), ensureMovieNotExistsMiddleware, ensureNameNotExistsMiddleware, updateMoviesController)

moviesRouter.delete('/:id', ensureMovieNotExistsMiddleware,deleteMoviesController)