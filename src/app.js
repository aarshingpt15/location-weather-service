const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000
//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
//setup  handlebars engine and views engine
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('/weather', (req,res) =>{

    if(!req.query.address){
        return res.send({
            error : "Please provide an address"
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location}= {})=>{
        if(error){
            return res.send({error : error})
        }  
        else forecast(latitude,longitude, (error,forecastResp) =>{
            if(error) return res.send(error)
            else res.send({
                forecast : forecastResp,
                location,
                address : req.query.address
            })
        })
    })
})


app.get('', (req,res)=>{
    res.render('index', {
        title:'Weather App',
        name: 'Aarshin gupta'
    })
})




app.get('/help', (req,res)=>{
    res.render('help',{
        title: "Help!",
        helpText: "I ll help you when needed",
        name: 'Aarshin gupta'
        }
    )

})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : "About Me",
        name: "Aarshin Gupta"
    })
})


app.get('/help/*',(req,res)=>{
   res.render('error',{
    title:"404",
    errorBody : 'The help page cannot be found',
    name: "Aarshin Gupta"
   })
})

app.get('*', (req,res)=>{
    res.render('error',{
        title:"404",
        errorBody : 'Fire in the hole',
        name: "Aarshin Gupta"
       })
})




app.listen(port,() => {
    console.log('server is up on the port '+ port)

})



