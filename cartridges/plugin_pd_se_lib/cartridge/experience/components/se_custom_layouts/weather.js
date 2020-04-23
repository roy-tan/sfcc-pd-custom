'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var HTTPClient = require('dw/net/HTTPClient');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the storefront weather layout
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;    
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    setWeatherAttributes(model);
    model.isInEditMode = PageRenderHelper.isInEditMode();    
    var output;  
    if (isInRange(model.weatherTemperature, context.content.temperature, context.content.range))
        output = new Template('experience/components/se_custom_layouts/weather').render(model).text;
    return output;    
};

function isInRange(weatherTemperature, celsius, range)
{
    if (weatherTemperature >= (celsius - range) && weatherTemperature <= (celsius + range))
        return true;    
    else    
        return false;    
}

/**
 * Get Weather Data
 *
 * @returns {Object} weather parameters
 */
function setWeatherAttributes(model) {
    // start weather demo related code
    //
    // By: Marcel van Espen
    // Date: April 2020
    //
    // Note: in the homePage.isml there are a few environment variables set at the top of the page that are accessible in other isml templates in case that you want this data elsewhere
    // Note: Below in the res.Render sections a few variables are passed on to the homePage template. If you need more data from here please pass it on in the arguments

    //
    // Get some relevant information from the session to determine location
    //
    //var currentCustomer = request.currentCustomer.raw;
    var latitude = request.geolocation.latitude;
    var longitude = request.geolocation.longitude;

    //
    // Define weather related variables that will be used
    //
    var weather: string;
    var mainWeather: string;
    var weatherDescription: string;
    var temperature: num;
    var iconCode: string;
    var iconUrl: string;
    var city: string;

    //
    // WeatherService information - configure your own api key if you have set this up on OpenWeatherMap.org
    //
    var openWeatherMapApiKey: string = "f9e21ea09f1c172c595a22b1185348bd";
    var openWeatherMapUrl = "https://api.openweathermap.org/data/2.5/weather?";
    var openWeatherMapUnits: string = "metric";
    var openWeatherMapLanguage: string = "en";

    //
    // If you would like to use the weather information in the user experience, hence having a localised description (a few words), below is some code to enable this
    // Just uncomment the 2 lines below. The weatherDescription variable will be filled with the localised short summary of the weather
    //
    //var Locale = require('dw/util/Locale');
    //openWeatherMapLanguage = Locale.getLocale(req.locale.id).getCountry();


    //
    // Building the URL for the REST API call
    //
    var weatherURL = openWeatherMapUrl + 'lat=' + latitude + '&lon=' + longitude + '&appid=' + openWeatherMapApiKey + '&units=' + openWeatherMapUnits + '&lang='+ openWeatherMapLanguage;

    //
    // Executing the REST API call and capturing the response in the weather variable
    //
    var httpClient: HTTPClient = new HTTPClient();
    httpClient.open('GET', weatherURL);
    httpClient.send();
    weather = httpClient.text;

    //
    // retrieving some of the weather components from the JSON data
    //
    var conditions : string = JSON.parse(weather);
    temperature = conditions.main.temp;
    var temperatureFixed: num = temperature.toFixed(0);
    mainWeather = conditions.weather[0].main;
    weatherDescription = conditions.weather[0].description;
    iconCode = conditions.weather[0].icon;


    // creating a link to a slighly bigger icon to use - hence the @2x below
    iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';

    city = conditions.name;

    //
    //end weather demo related code (Note - there are some parameters below in the res.render arguments that are passed on to the Homepage template
    //
    model.weatherTemperature = temperatureFixed;
    model.mainWeather = mainWeather;
    model.weatherDescription = weatherDescription;
    model.iconUrl = iconUrl;
    model.city = city;
}