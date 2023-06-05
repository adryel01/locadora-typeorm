import 'reflect-metadata'
import 'express-async-errors'
import express, { Application } from 'express'
import { handleErrors } from './error'
import { moviesRouter } from './routes/movies.routes'

const app: Application = express()
app.use(express.json())
app.use('/movies', moviesRouter)
app.use(handleErrors) 

export default app