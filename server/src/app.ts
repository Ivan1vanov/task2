import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import * as dotenv from 'dotenv'
import config from 'config'
import { messageRoutes } from './routes/routes';

const app = express()

dotenv.config({path: __dirname+'/.env'})

app.use(cors({origin: '*'}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
 
const PORT: number | string = process.env.PORT || 5000


mongoose.connect(config.get<string>('dbUrl')).then(() => {
    app.listen(PORT, () => {
        console.log(`server started on http://localhos:${PORT}`)
        messageRoutes(app)
    })
}).catch((e) => console.log(e))

