import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
const history = require('connect-history-api-fallback');

const app = express();
const uri = 'mongodb://127.0.0.1:27017/appnodemisa';

const options = {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
}

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(history());
app.use(express.static(path.join(__dirname,'public')));
app.use('/api', require('./routes/nota'));

mongoose.connect(uri, options).then(
    ()=>{
        console.log('Conectado a mongozzz');
    },
    err =>{
        console.log('mamaste por pendejo');
    }
)

app.get('/', function(req, res){
    res.send('Hola Mundo');
});

app.set('puerto', process.env.PORT || 3000);

app.listen(app.get('puerto'), function(){
    console.log('Puerto Escuchando', app.get('puerto'));
});