import express, {Application, Request, Response} from 'express';
import router from './router';

const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req:Request, res:Response) => {
    res.sendFile(__dirname+'/index.html')
})

app.use('/api', router);

app.listen('8080', () => {
    console.log('App is listening on port 8080');
})