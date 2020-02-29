 const request = require('request')
const forecast = (latitude,longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/9e2836241d394d3b10f8c7e5d300ac4e/'+latitude+','+longitude+'?units=si'

    request({url, json: true},(error,{body})=> {
    
        if(error){
            callback('Unable to connect to network',undefined)
        } else if(body.error){
            callback('Unable to find the location',undefined)
        }
        else{
            
            callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature + ' degrees out. There is a '+ (body.currently.precipProbability)*100+'% chance of precitipation.')
        }
        //console.log(data.currently);
        
    })

}
module.exports = forecast
