import express from 'express';
import cors from 'cors';
import {engine} from 'express-handlebars';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import ContenedorAdopcion from './classes/ContenedorAdopcion.js';
import petsRouter from './routes/pets.js';
import usersRouter from './routes/users.js';
import upload from './services/uploader.js';
const app = express();
const PORT = process.env.PORT || 8081;
const contenedor = new ContenedorAdopcion();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//Listening server
export const server = app.listen(PORT,()=>{
    console.log("Listening on port : ",PORT);
})
//Handlebars setup
app.engine('handlebars',engine());
app.set('view engine','handlebars');
app.set('views','./views');
//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use((req,res,next)=>{
    console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
    next();
})
app.use('/resources',express.static(__dirname+'/public'));
app.use('/api/pets',petsRouter);
app.use('/api/users',usersRouter);

//Other endpoints
app.post('/api/adoption',(req,res)=>{
    let userId = parseInt(req.body.uid);
    let petId = parseInt(req.body.pid);
    contenedor.adoptPet(userId,petId).then(result=>{
        res.send(result);
    })
})

app.post('/api/uploadfile',upload.fields([
    {
        name:'file', maxCount:1
    },
    {
        name:"documents", maxCount:3
    }
]),(req,res)=>{
    const files = req.files;
    if(!files||files.length===0){
        res.status(500).send({messsage:"No se subió archivo"})
    }
    res.send(files);
})
app.get('/view/pets',(req,res)=>{
    let specieParser={
        dog:'perro',
        cat:'gato',
        horse:'caballo',
        fish:'pez',
        rabbit:'conejo'
    }
    contenedor.getAllPets().then(result=>{
        let exist=false;
        if(result.status==='success'){
            exist=true;
        }
        let pets = result.payload.map(pet=>{
            pet.specie=specieParser[pet.specie];
            return pet;
        })
        res.render('pets',{
            title:'Pets',
            pets: pets,
            exist:exist
        })
    })
})

