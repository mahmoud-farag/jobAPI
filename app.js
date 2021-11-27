import dotenv from 'dotenv';
import expressAsyncErrors from 'express-async-errors';
import express from 'express';

import {notFound} from './middleware/not-found.js';
import {errorHandlerMiddleware} from './middleware/error-handler.js';
import { startApp } from './middleware/startApp.js';
import {jobRouter} from './routes/jobs.js'
import { userRoute } from './routes/user.js';
import { checkAuthintection } from './middleware/auth.js';

// extra security packages
import helmet from 'helmet';
import cors from 'cors';
import  xss from 'xss-clean';
import  rateLimit from 'express-rate-limit';

const app = express();
dotenv.config();

// app security modules 
app.set('trust proxy', 1);
app.use(
    rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

// middleware

app.get('/', (req,res)=>{

    res.status(200).send('Helloooooooooooooo, your API  is ready for the Fire Works online ')
})
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/user',userRoute)
export{checkAuthintection }
app.use('/api/v1/jobs',checkAuthintection,jobRouter)
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;



startApp(app, port);