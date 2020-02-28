const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWFyc2hpbmdwdDE1IiwiYSI6ImNrNnE1OXczNTF0YWozbG5xNnlpaTBnYjEifQ.p442q1sC4xtLWunFjy94hg'
    
    request({url,json: true},(error,{body})=>{
    if(error) callback('Unable to connect to location services!', undefined)
    else if(body.error) callback('We are facing an issue!', undefined)
    else if(body.features.length===0) callback('Unable to find location!Search another location', undefined)
    else{
        const latitude = body.features[0].center[1]
        const longitude = body.features[0].center[0]
        const location = body.features[0].place_name
        const geoJSON = {
            latitude: latitude,
            longitude: longitude,
            location: location 
        }
        callback(undefined, geoJSON)
}
    
})
}

module.exports = geocode;
