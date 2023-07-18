import express, { urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import session from 'express-session';
import connectDB from './database/db.js';
const app = express();
import userRouter from './routes/user.js'
import adminRouter from './routes/admin.js'


app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000, 
    },
}));
app.use(urlencoded({ extended: false }))
app.use('/api', userRouter);
app.use('/api/admin', adminRouter);


app.listen(3000, () => {
    console.log('port is running on 3000')
})

connectDB()
export default app;