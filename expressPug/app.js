import express from 'express';
const app = express();
const server = app.listen(8080,()=>{
    console.log("Listening in port 8080");
})

app.set('views','./views');
app.set('view engine','pug');
app.use(express.static('public'));
app.get('/holaPug',(req,res)=>{
    res.render('hello',{message:'HOLA A TODOS LOS CODERS DEL UNIVERSO'})
})

const getAllFoods = () => [
    {
        id: "1",
        title: "Remera",
        price: 1500,
        pictureUrl: "https://i.postimg.cc/y6v9tygw/remera-gucci.jpg",
        stock: 23,
        resumen: 'Camisa de hilo Penteado 30.1 de color blanca. Camiseta con tejido suave y de calidad.',
        estado: 'nuevo',
        autor: "Gucci"

    },    
    {
        id: "2",
        title: "Pantalon",
        price: 4400,
        pictureUrl: "https://i.postimg.cc/vHT9sx5D/pantalon-gucci.jpg",
        stock: 12,
        resumen: 'Pantalón de chándal de chenilla con GG azul para hombre',
        estado: 'nuevo',
        autor: "Gucci"
    },
]
app.get('/datos',(req,res)=>{
    let {min,nivel,max,titulo} = req.query;
    res.render('progress',{min:min,nivel:nivel,max:max,title:titulo})
})
app.get('/products',(req,res)=>{
    let food = getAllFoods();
    res.render('restaurant',{"foodArray":food})
})