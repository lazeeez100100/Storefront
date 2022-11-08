import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import db from './database'
import config from './config';
import err from './mWare/error.mWare';
import routes from "./routes";


//app init

const server_port = config.server_port || 3000;
const app: express.Application = express();
const address = "127.0.0.1:" + server_port ;
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use(err);
app.use('/api', routes);

// app.get('/', function (req: Request, res: Response) {
//     res.send('hi from my world');
// });

//api root
app.get(('/'),(req: Request, res: Response) =>{
    res.status(200).json({
        message: `hi all`
    });
});

// if user went to wrong path throw error not found
app.use((req: Request, res: Response) =>{
    res.status(404).json({
        message: `not found valid endPoint`
    });
});

//connect to server
app.listen(server_port, function () {
    console.log(`starting app on: ${address}`);
});

//test database
db.connect().then((client) =>{
return client.query('SELECT NOW()').then((res)=>{client.release();console.log(res.rows);});});

export default app;