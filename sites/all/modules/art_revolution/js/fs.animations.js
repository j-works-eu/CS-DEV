

let openWeatherAPI = apiKeys.openWeatherAPI;
let IPinfo = apiKeys.IPinfo;


jQuery(document).ready(function ($) {

  if ($('body .weatherwidget').length) {
    /** LOAD WEATHER **/
    setTimeout(function () {  /** LOAD WEATHER WIDGET **/
    loadweather();
    }, 500);

    /** INTERVAL 10 MINUTES REFRESH / RENEW WEATHER WIDGET 144 REQUESTS A DAY PER USER **/
    /** 1,000,000 calls/month / 60 calls/minute openweathermap API **/

    setInterval(function () {
      loadweather();
    }, 600000);
  }

  function loadweather() {
    let apiId = openWeatherAPI;


    // Getting user Ip and location information from http://ipinfo.io JSON API
    $.getJSON("https://ipinfo.io?token="+IPinfo, function (location) {

      //let latLon = location.loc.split(","); // Longitute and Latitude
      //let lat = latLon[0];
      //let lon = latLon[1];

      let inputCity = $('#weercity').val();
      let inputCountry = $('#weercountry').val();
      let cityName = inputCity;

      let suffix = "°C"
      let datetime = ""; // Holds date for 5day forecast
      let dateCount = 0; // 5day forecast date index tracker
      let dateElement = ""; // 5day forecast html element name variable

      //Holds running sum of temperatures + number of temps summed up
      let forecastDayTemp = 0;
      let forecastDayCount = 0;

      let imgsrc = "https://openweathermap.org/img/w/"
      let data; // Holds response from OpenWeather
      // let country = inputCountry;

      let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + ',' + inputCountry + "&lang=nl&appid=" + apiId;
      let apiUrlForeCAstWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + ',' + inputCountry + "&lang=nl&appid=" + apiId;
      let apiUrlForeCast = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputCity + ',' + inputCountry + "&lang=nl&appid=" + apiId;

      let iconLink = {
        thunderStorm:
          "<div class='a-icon a-thunder-storm'>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-daytime '></div>" +
          "<div class='a-lightning'>" +
          "<div class='a-bolt'></div>" +
          "<div class='a-bolt'></div>" +
          "</div>" +
          "</div>",
        thunderStorm_evening:
          "<div class='a-icon a-thunder-storm cloudevening'>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-moon'></div>" +
          "<div class='night'>" +
          "<div class='shooting_star_night'></div>" +
          "</div>" +
          "<div class='a-lightning'>" +
          "<div class='a-bolt'></div>" +
          "<div class='a-bolt'></div>" +
          "</div>" +
          "</div>",
        drizzle:
          "<div class='a-icon a-rainy'>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-daytime '></div>" +
          "<div class='a-rain'></div>" +
          "</div>",
        drizzle_evening:
          "<div class='a-icon a-rainy cloudevening'>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-moon'></div>" +
          "<div class='night'>" +
          "<div class='shooting_star_night'></div>" +
          "</div>" +
          "<div class='a-rain'></div>" +
          "</div>",
        rain:
          "<div class='a-icon a-rainy'>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-daytime '></div>" +
          "<div class='a-rain'></div>" +
          "</div>",
        rain_evening:
          "<div class='a-icon a-rainy cloudevening'>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-moon'></div>" +
          "<div class='night'>" +
          "<div class='shooting_star_night'></div>" +
          "</div>" +
          "<div class='a-rain'></div>" +
          "</div>",
        snow:
          "<div class='a-icon a-sneeuw a-flurries'>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-daytime '></div>" +
          "<div class='a-snow'>" +
          "<div class='a-flake'></div>" +
          "<div class='a-flake'></div>" +
          "</div>" +
          "</div>",
        snow_evening:
          "<div class='a-icon a-sneeuw cloudevening'>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-moon'></div>" +
          "<div class='night'>" +
          "<div class='shooting_star_night'></div>" +
          "</div>" +
          "<div class='a-snow'>" +
          "<div class='a-flake'></div>" +
          "<div class='a-flake'></div>" +
          "</div>" +
          "</div>",
        mist:
          "<div class='a-icon a-mist'>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-daytime '></div>" +
          "<div class='a-mist'>" +
          "<div class='a-miststreep'></div>" +
          "<div class='a-miststreep1'></div>" +
          "<div class='a-miststreep2'></div>" +
          "</div>" +
          "</div>",
        mist_evening:
          "<div class='a-icon a-mist cloudevening'>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-moon'></div>" +
          "<div class='night'>" +
          "<div class='shooting_star_night'></div>" +
          "</div>" +
          "<div class='a-mist'>" +
          "<div class='a-miststreep'></div>" +
          "<div class='a-miststreep1'></div>" +
          "<div class='a-miststreep2'></div>" +
          "</div>" +
          "</div>",
        clear:
          "<div class='a-icon a-sunny'>" +
          "<div class='a-sun'></div>" +
          "<div class='a-sun2'></div>" +
          "</div>",
        clear_evening:   // Moet maan worden - sunray div eraf?
          "<div class='a-icon moon cloudevening'>" +
          "<div class='a-moon'></div>" +
          "<div class='night'>" +
          "<div class='shooting_star'></div>" +
          "<div class='shooting_star'></div>" +
          "<div class='shooting_star'></div>" +
          "<div class='shooting_star'></div>" +
          "<div class='shooting_star'></div>" +
          "</div>" +
          "</div>",
        cloud:
          "<div class='a-icon cloudy'>" +
          "<div class='a-daytime '></div>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-cloud'></div>" +
          "</div>",
        cloud_evening:
          "<div class='a-icon cloudy'>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-cloud'></div>" +
          "<div class='a-moon'></div>" +
          "<div class='night'>" +
          "<div class='shooting_star_night'></div>" +
          "</div>" +
          "</div>",

        oeps: "/sites/all/modules/art_revolution/images/weather/icons/sun_clouds.png",
        oeps_evening: "/sites/all/modules/art_revolution/images/weather/icons/moon_clouds.png",

      };

      let imageLink = {
        thunderStorm: "url(http://extrawall.net/images/wallpapers/529_1920x1080_thunderstorm_over_grand_canyon.jpg)",
        drizzle: "url(/sites/all/modules/art_revolution/images/weather/weather-cloudy-1.jpg)",
        mist: "url(https://iskin.co.uk/wallpapers/styles/1920x1080/public/snow_drifts.jpg)",
        mist_evening: "url(https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701709862.jpg)",
        clear: "url(http://xdesktopwallpapers.com/wp-content/uploads/2011/05/Clear-Sky-in-a-sunny-day.jpg)",
        oeps: "url(http://static5.businessinsider.com/image/5390bbeb6bb3f7407d6ba579/why-different-weather-apps-give-you-different-forecasts.jpg)",
      };


      // Getting weather information from openweathermap.org API
      $.getJSON(apiUrl, function (w) {
        let wId = w.weather[0].id;
        let wType = w.weather[0].description; // Type of weather
        let temp = w.main.temp;
        let celsius = temp - 273.15;
        let windSpeed = w.wind.speed; // wind speed
        let Winspeedkmh = windSpeed * 3.6;
        let compassSector = ["N", "NNO", "NO", "ONO", "O", "OZO", "ZO", "ZZO", "Z", "ZZW", "ZW", "WZW", "W", "WNW", "NW", "NNW", "N"];
        let windDirection = compassSector[(w.wind.deg / 22.5).toFixed(0)];


        let animationThunderstorm =
          "<i class='thunderstorm'></i>";

        let animationDrizzle =
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>";

        let animationRain =
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>" +
          "<i class='rain'></i>";

        let animationSnow =
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>" +
          "<i class='snow'></i>";

        let animationMist =
          "<div class='wrap'>" +
          "  <div class='container'>" +
          "  <div class='box'>" +
          "    <div class='mist'>" +
          "    </div>" +
          "  </div>" +
          "</div>" +
          "</div>";

        let animationClear =
          "<i class='Clear'></i>";

        let animationCloud =
          "<div class='wrap'>" +
          "  <div class='container'>" +
          "  <div class='box'>" +
          "    <div class='smoke'>" +
          "    </div>" +
          "  </div>" +
          "</div>" +
          "</div>";

        let animationOeps =
          "<i class='oeps'></i>";

        let thunderStorm = [
          "url(/sites/all/modules/art_revolution/images/weather/weather-thunderstorm-1.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-thunderstorm-2.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-thunderstorm-3.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-thunderstorm-4.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-thunderstorm-5.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-thunderstorm-6.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-thunderstorm-7.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-thunderstorm-8.jpg)"
        ];
        let thunderStormsize = thunderStorm.length;
        let thunderStormout = Math.floor(thunderStormsize * Math.random());

        let drizzle = [
          "url(/sites/all/modules/art_revolution/images/weather/weather-rainy-1.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-rainy-2.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-rainy-3.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-rainy-4.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-rainy-5.jpg)"
        ];
        let drizzlesize = drizzle.length;
        let drizzleout = Math.floor(drizzlesize * Math.random());

        let snow = [
          "url(/sites/all/modules/art_revolution/images/weather/weather-snow-1.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-snow-2.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-snow-3.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-snow-4.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-snow-5.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-snow-6.jpg)"
        ];
        let snowsize = snow.length;
        let snowout = Math.floor(snowsize * Math.random());

        let rain = [
          "url(/sites/all/modules/art_revolution/images/weather/weather-rainy-1.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-rainy-2.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-rainy-3.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-rainy-4.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-rainy-5.jpg)"
        ];
        let rainsize = rain.length;
        let rainout = Math.floor(rainsize * Math.random());

        let mist = [
          "url(/sites/all/modules/art_revolution/images/weather/weather-misty-1.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-misty-2.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-misty-3.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-misty-4.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-misty-5.jpg)"
        ];
        let mistsize = mist.length;
        let mistout = Math.floor(mistsize * Math.random());

        let clear = [
          "url(/sites/all/modules/art_revolution/images/weather/weather-clear-1.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-clear-2.jpg)"
        ];
        let clearsize = clear.length;
        let clearout = Math.floor(clearsize * Math.random());


        let clearnight = [
          "url(/sites/all/modules/art_revolution/images/weather/weather-clearN-1.jpg)",
        ];
        let clearNsize = clear.length;
        let clearNout = Math.floor(clearNsize * Math.random());


        let cloud = [
          "url(/sites/all/modules/art_revolution/images/weather/weather-cloudy-1.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-cloudy-2.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-cloudy-3.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-cloudy-4.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-cloudy-5.jpg)"
        ];
        let cloudnight = [
          "url(/sites/all/modules/art_revolution/images/weather/weather-cloudyN-1.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-cloudyN-2.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-cloudyN-3.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-cloudyN-4.jpg)",
          "url(/sites/all/modules/art_revolution/images/weather/weather-cloudyN-5.jpg)"
        ];
        let cloudsize = cloud.length;
        let cloudsizeN = cloudnight.length;
        let cloudout = Math.floor(cloudsize * Math.random());
        let cloudoutN = Math.floor(cloudsizeN * Math.random());

        let oeps = [
          "url(/sites/all/modules/art_revolution/images/weather/weather-clear-1.jpg)"
        ];
        let oepssize = oeps.length;
        let oepsout = Math.floor(oepssize * Math.random());



        function weatherimageTime(date, h1, m1, h2, m2) {

          let h = date.getHours();
          let m = date.getMinutes();
          return (h1 < h || h1 == h && m1 <= m) && (h < h2 || h == h2 && m <= m2);
        }

        function selectWImage(weatherId) {

          if (weatherimageTime(new Date(), 7, 30, 18, 0) == true) {   // Bereken tijd (tussen)
            if (weatherId >= 200 && weatherId < 300) weatherImage = thunderStorm[thunderStormout]; // onweer
            else if (weatherId >= 300 && weatherId < 500) weatherImage = rain[rainout]; // motregen
            else if (weatherId >= 500 && weatherId < 531) weatherImage = rain[rainout]; // regen
            else if (weatherId >= 600 && weatherId < 622) weatherImage = snow[snowout]; // sneeuw
            else if (weatherId >= 701 && weatherId < 781) weatherImage = mist[mistout]; // mist
            else if (weatherId === 800) weatherImage = clear[clearout]; // helder / zonnig
            else if (weatherId > 800 && weatherId < 900) weatherImage = cloud[cloudout]; // bewolkt
            else weatherImage = oeps[oepsout]; // anders
          } else {
            if (weatherId >= 200 && weatherId < 300) weatherImage = thunderStorm[thunderStormout]; // onweer
            else if (weatherId >= 300 && weatherId < 500) weatherImage = rain[rainout]; // motregen
            else if (weatherId >= 500 && weatherId < 531) weatherImage = rain[rainout]; // regen
            else if (weatherId >= 600 && weatherId < 622) weatherImage = snow[snowout]; // sneeuw
            else if (weatherId >= 701 && weatherId < 781) weatherImage = mist[mistout]; // mist
            else if (weatherId === 800) weatherImage = clearnight[clearNout]; // helder / zonnig
            else if (weatherId > 800 && weatherId < 900) weatherImage = cloudnight[cloudoutN]; // bewolkt
            else weatherImage = oeps[oepsout]; // anders
          }
        }


        ///////////////////
        // Weather icons
        ///////////////////

        function selectWIcon(weatherId) {

          if (weatherimageTime(new Date(), 7, 30, 18, 0) == true) {   // Bereken tijd (tussen)
            if (weatherId >= 200 && weatherId < 300) weatherIcon = iconLink.thunderStorm;
            else if (weatherId >= 300 && weatherId < 500) weatherIcon = iconLink.drizzle;
            else if (weatherId >= 500 && weatherId < 531) weatherIcon = iconLink.rain;
            else if (weatherId >= 600 && weatherId < 622) weatherIcon = iconLink.snow;
            else if (weatherId >= 701 && weatherId < 781) weatherIcon = iconLink.mist;
            else if (weatherId === 800) weatherIcon = iconLink.clear;
            else if (weatherId > 800 && weatherId < 900) weatherIcon = iconLink.cloud;
            else weatherIcon = iconLink.oeps;
          } else {
            if (weatherId >= 200 && weatherId < 300) weatherIcon = iconLink.thunderStorm_evening;
            else if (weatherId >= 300 && weatherId < 500) weatherIcon = iconLink.drizzle_evening;
            else if (weatherId >= 500 && weatherId < 531) weatherIcon = iconLink.rain_evening;
            else if (weatherId >= 531 && weatherId < 622) weatherIcon = iconLink.snow_evening;
            else if (weatherId >= 701 && weatherId < 781) weatherIcon = iconLink.mist_evening;
            else if (weatherId === 800) weatherIcon = iconLink.clear_evening;
            else if (weatherId > 800 && weatherId < 900) weatherIcon = iconLink.cloud_evening;
            else weatherIcon = iconLink.oeps_evening;
          }
        }

        function selectWAnimation(weatherId) {
          if (weatherId >= 200 && weatherId < 300) weatherAnimated = animationThunderstorm;  // thunderStorm
          else if (weatherId >= 300 && weatherId < 500) weatherAnimated = animationDrizzle;  // drizzle
          else if (weatherId >= 500 && weatherId < 531) weatherAnimated = animationRain; // Rain
          else if (weatherId >= 600 && weatherId < 622) weatherAnimated = animationSnow; // snow
          else if (weatherId >= 701 && weatherId < 781) weatherAnimated = animationMist; // Mist
          else if (weatherId === 800) weatherAnimated = animationClear; // Clear
          else if (weatherId > 800 && weatherId < 900) weatherAnimated = animationCloud; // Cloudy
          else weatherImage = weatherAnimated = animationOeps; // The rest
        }

        function selectWindkracht(windSpeed) {

          if (windSpeed >= 0.0 && windSpeed < 0.3) windkracht = 'Windstil'; // Windokracht 0
          if (windSpeed >= 0.3 && windSpeed < 1.6) windkracht = 'Zwakke wind'; // Windokracht 1
          if (windSpeed >= 1.6 && windSpeed < 3.4) windkracht = 'Zwakke wind'; // Windokracht 2
          if (windSpeed >= 3.4 && windSpeed < 5.5) windkracht = 'Matige wind'; // Windokracht 3
          if (windSpeed >= 5.5 && windSpeed < 8.0) windkracht = 'Matige wind'; // Windokracht 4
          if (windSpeed >= 8.0 && windSpeed < 10.9) windkracht = 'Vrij krachtige wind'; // Windokracht 5
          if (windSpeed >= 10.9 && windSpeed < 13.9) windkracht = 'Krachtige wind'; // Windokracht 6
          if (windSpeed >= 13.9 && windSpeed < 17.2) windkracht = 'Harde wind'; // Windokracht 7
          if (windSpeed >= 17.2 && windSpeed < 20.8) windkracht = 'Stormachtige wind'; // Windokracht 8
          if (windSpeed >= 20.8 && windSpeed < 24.5) windkracht = 'Storm'; // Windokracht 9
          if (windSpeed >= 24.5 && windSpeed < 28.5) windkracht = 'Zware storm'; // Windokracht 10
          if (windSpeed >= 28.5 && windSpeed < 32.7) windkracht = 'Zeer zware storm'; // Windokracht 11
          if (windSpeed >= 23.7 && windSpeed < 100) windkracht = 'Orkaan'; // Windokracht 12
        }

        let weatherImage = "";
        let weatherAnimated = "";
        let weatherIcon = "";
        let windkracht = "";

        selectWAnimation(wId);
        selectWImage(wId);
        selectWIcon(wId);
        selectWindkracht(windSpeed);

        function refreshselectWImage() {
          let cssProp = "background";
          let cssValue = weatherImage + "no-repeat";

          $(".weatherwidgetAnimated").empty();
          $(".weatherwidgetAnimated").append(weatherAnimated);
          $(".weatherwidgetImage").css(cssProp, cssValue);
          $(".weatherwidgetImage").css("background-size", "cover");
          $("#temp span").html(celsius.toFixed(1) + "<span class='celc'>℃</span>");
          $(".aimatedicon").html(weatherIcon);
          $("#weather-type").html(wType);
          $("#wind-speed").html(windkracht + ' | ' + '<i class="far fa-compass"></i>' + ' ' + windDirection + ' | ' + '<i class="far fa-flag"></i>' + ' ' + Winspeedkmh.toFixed(1) + " km/h");
          $("#location").html(cityName);
          $(".weather").addClass('animated zoomIn');
        }

        function getWeatherForecast() {
          var xhr = new XMLHttpRequest();
          var forecast = new XMLHttpRequest();
          //Getting weather by city
          xhr.open("GET", apiUrlForeCAstWeather, false);
          xhr.send();

          forecast.open("GET", apiUrlForeCast, false);
          forecast.send();

          //Parse JSON data
          data = JSON.parse(xhr.response);
          updateForecast(JSON.parse(forecast.response));
        }

        function updateForecast(days) {
          datetime = 0;
          dateCount = 0;
          let DescriptionHTML;

          for (var i = 0; i < days.list.length; i++) {

            if (days.list[i].dt_txt.slice(0, 10) != datetime) {
              forecastDayTemp = 0;
              forecastDayCount = 0;
              dateCount++;
              datetime = days.list[i].dt_txt.slice(0, 10);
              dateElement = "#day" + dateCount + "-date";
              $(dateElement).text(getDay(datetime));

              /** Aggregate temperature for the date **/

              for (var j = 0; j < days.list.length; j++) {
                if (datetime == days.list[j].dt_txt.slice(0, 10)) {
                  forecastDayTemp += days.list[j].main.temp - 273.15;
                  forecastDayCount++;
                }
              }
              forecastDayTemp = Math.floor(forecastDayTemp / forecastDayCount);
              $("#day" + dateCount + "-temp").text(forecastDayTemp + suffix);

              /** Getting custom weather icon **/

              let wFid = days.list[i].weather[0].id;

              function selectFIcon(iconWID) {

                if (iconWID >= 200 && iconWID < 300) weatherFIcon = iconLink.thunderStorm;
                else if (iconWID >= 300 && iconWID < 500) weatherFIcon = iconLink.drizzle;
                else if (iconWID >= 500 && iconWID < 531) weatherFIcon = iconLink.rain;
                else if (iconWID >= 600 && iconWID < 622) weatherFIcon = iconLink.snow;
                else if (iconWID >= 701 && iconWID < 781) weatherFIcon = iconLink.mist;
                else if (iconWID === 800) weatherFIcon = iconLink.clear;
                else if (iconWID > 800 && iconWID < 900) weatherFIcon = iconLink.cloud;
                else weatherFIcon = iconWID.oeps;
              }

              let weatherFIcon = "";
              selectFIcon(wFid);
              $("#day" + dateCount + "-icon").html(weatherFIcon);

              DescriptionHTML = days.list[i].weather[0].description;
              $("#day" + dateCount + "-description").text(DescriptionHTML);
            }
          }
        }

        function getDay(dateString) {
          var week = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];
          return week[new Date(dateString).getDay()];
        }

        refreshselectWImage();
        getWeatherForecast();


      })
    });
  }

  if ($('body .findbal').length) {  /** LOAD ANIMATIONS ( BALLS ) **/
  setTimeout(function () {
    loadballs();
  }, 500);

    function loadballs() {
      // Some random colors
      const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

      const numBalls = 50;
      const balls = [];

      for (let i = 0; i < numBalls; i++) {
        let ball = document.createElement("div");
        ball.classList.add("ball");
        ball.style.background = colors[Math.floor(Math.random() * colors.length)];
        ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
        ball.style.transform = `scale(${Math.random()})`;
        ball.style.width = `${Math.random()}em`;
        ball.style.height = ball.style.width;

        balls.push(ball);
        document.getElementById("main-baller").append(ball);
      }

      balls.forEach((el, i, ra) => {
        let to = {
          x: Math.random() * (i % 2 === 0 ? -11 : 11),
          y: Math.random() * 12
        };

        let anim = el.animate(
          [
            {transform: "translate(0, 0)"},
            {transform: `translate(${to.x}rem, ${to.y}rem)`}
          ],
          {
            duration: (Math.random() + 1) * 2000, // random duration
            direction: "alternate",
            fill: "both",
            iterations: Infinity,
            easing: "ease-in-out"
          }
        );
      });
    }
  }

  if ($('body .main-balloons').length) {  /** LOAD ANIMATION ( BALLOONS ) WITH TIMEOUT **/
  setTimeout(function () {
    loadballoons();
  }, 500);
  }


  function loadballoons() {
    setTimeout(function () {
      $(function () {
        for (let i = 0; i < 50; i++) {
          $('.main-balloons').append("<div class='balloon balloon" + i + "'></div>");
        }
      });
    }, 300);
  }


  if ($('body #instagram-feed').length) {
    InstagramWall();
    setInterval(function () {
      InstagramWall();
    }, 3600000);
  }

  function InstagramWall() {
    let inputinstaID = $('#instaID').val();
    let inputinstaTAG = $('#instaTAG').val();
    $.instagramFeed({
      'username': inputinstaID,
      'tag': inputinstaTAG,
      'container': "#instagram-feed",
      'display_profile': false,
      'display_biography': false,
      'display_gallery': true,
      'callback': null,
      'styling': true,
      'items': 48,
      'image_size': 640,
      'items_per_row': 3,
      'margin': 0
    });
  }

  var locationPlaceIdVal = $('#GoogleRinput').val();
  const locationPlaceId = locationPlaceIdVal;

  (function ($) {
    var namespace = "googlePlaces";

    $.googlePlaces = function (element, options) {
      let defaults = {
        placeId: locationPlaceId, // placeId provided by google api documentation
        render: ["reviews"],
        min_rating: 3,
        max_rows: 60,
        map_plug_id: "map-plug",
        rotateTime: false,
        shorten_names: true,
        schema: {
          displayElement: "#schema",
          type: "Store",
          beforeText: "Google Users Have Rated",
          middleText: "based on",
          afterText: "ratings and reviews",
          image: null,
          priceRange: null
        },
        address: {
          displayElement: "#google-address"
        },
        phone: {
          displayElement: "#google-phone"
        },
        staticMap: {
          displayElement: "#google-static-map",
          width: 512,
          height: 512,
          zoom: 17,
          type: "roadmap"
        },
        hours: {
          displayElement: "#google-hours"
        }
      };

      var plugin = this;

      plugin.settings = {};

      var $element = $(element),
        element = element;

      plugin.init = function () {
        plugin.settings = $.extend({}, defaults, options);
        plugin.settings.schema = $.extend({}, defaults.schema, options.schema);
        $element.html("<div id='" + plugin.settings.map_plug_id + "'></div>"); // create a plug for google to load data into
        initialize_place(function (place) {
          plugin.place_data = place;

          // Trigger event before render
          $element.trigger("beforeRender." + namespace);

          if (plugin.settings.render.indexOf("rating") > -1) {
            renderRating(plugin.place_data.rating);
          }
          // render specified sections
          if (plugin.settings.render.indexOf("reviews") > -1) {
            renderReviews(plugin.place_data.reviews);
            if (!!plugin.settings.rotateTime) {
              initRotation();
            }
          }
          if (plugin.settings.render.indexOf("address") > -1) {
            renderAddress(
              capture_element(plugin.settings.address.displayElement),
              plugin.place_data.adr_address
            );
          }
          if (plugin.settings.render.indexOf("phone") > -1) {
            renderPhone(
              capture_element(plugin.settings.phone.displayElement),
              plugin.place_data.formatted_phone_number
            );
          }
          if (plugin.settings.render.indexOf("staticMap") > -1) {
            renderStaticMap(
              capture_element(plugin.settings.staticMap.displayElement),
              plugin.place_data.formatted_address
            );
          }
          if (plugin.settings.render.indexOf("hours") > -1) {
            renderHours(
              capture_element(plugin.settings.hours.displayElement),
              plugin.place_data.opening_hours
            );
          }

          // render schema markup
          addSchemaMarkup(
            capture_element(plugin.settings.schema.displayElement),
            plugin.place_data
          );

          // Trigger event after render
          $element.trigger("afterRender." + namespace);
        });
      };

      var capture_element = function (element) {
        if (element instanceof jQuery) {
          return element;
        } else if (typeof element == "string") {
          try {
            var ele = $(element);
            if (ele.length) {
              return ele;
            } else {
              throw (
                "Element [" +
                element +
                "] couldnt be found in the DOM. Skipping " +
                element +
                " markup generation."
              );
            }
          } catch (e) {
            //console.warn(e);
          }
        }
      };

      var initialize_place = function (c) {
        var map = new google.maps.Map(
          document.getElementById(plugin.settings.map_plug_id)
        );

        var request = {
          placeId: plugin.settings.placeId
        };

        var service = new google.maps.places.PlacesService(map);

        service.getDetails(request, function (place, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            c(place);
          }
        });
      };

      var sort_by_date = function (ray) {
        ray.sort(function (a, b) {
          var keyA = new Date(a.time),
            keyB = new Date(b.time);
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        return ray;
      };

      var filter_minimum_rating = function (reviews) {
        for (var i = reviews.length - 1; i >= 0; i--) {
          if (reviews[i].rating < plugin.settings.min_rating) {
            reviews.splice(i, 1);
          }
        }
        return reviews;
      };


      var renderReviews = function (reviews) {
        reviews = sort_by_date(reviews);
        reviews = filter_minimum_rating(reviews);
        var html = "";
        var row_count =
          plugin.settings.max_rows > 0
            ? plugin.settings.max_rows - 1
            : reviews.length - 1;
        // make sure the row_count is not greater than available records
        row_count =
          row_count > reviews.length - 1 ? reviews.length - 1 : row_count;
        for (var i = row_count; i >= 0; i--) {
          var stars = renderStars(reviews[i].rating);
          var date = convertTime(reviews[i].time);
          if (plugin.settings.shorten_names == true) {
            var name = reviews[i].author_name;
          } else {
            var name =
              reviews[i].author_name +
              "</span><<span class='review-sep'>, </span>";
          }

          html =
            html +
            "<div class='card shadow p-5'><div class='review-item'><div class='review-meta'><span class='review-author'></div>" +
            // "<span class='review-date'>'"+ date +"'</span>" +
            "<div class='author-pic'><img src="+ reviews[i].profile_photo_url +"></div>" +
            "<div class='author-name'>"+ name +"</div>" +
            "</div>" +
            stars +
            "<p class='review-text'>" +
            reviews[i].text +
            "</p></div>";
        }
        $element.append(html);
      };


      var renderStars = function (rating) {
        var stars = "<div class='review-stars'><ul>";

        // fill in gold stars
        for (var i = 0; i < rating; i++) {
          stars = stars + "<li><i class='fa star fa-star'></i></li>";
        }

        // fill in empty stars
        if (rating < 5) {
          for (var i = 0; i < 5 - rating; i++) {
            stars = stars + "<li><i class='fa fa-star star inactive'></i></li>";
          }
        }
        stars = stars + "</ul></div>";
        return stars;
      };

      var renderAverageStars = function (rating) {
        var stars =
          "<div class='review-stars'><ul><li><i>" + rating + "&nbsp;</i></li>";
        var activeStars = parseInt(rating);
        var inactiveStars = 5 - activeStars;
        var width = (rating - activeStars) * 100 + "%";

        // fill in gold stars
        for (var i = 0; i < activeStars; i++) {
          stars += "<li><i class='fa fa-star star'></i></li>";
        }

        // fill in empty stars
        if (inactiveStars > 0) {
          for (var i = 0; i < inactiveStars; i++) {
            if (i === 0) {
              stars +=
                "<li style='position: relative;'><i class='fa fa-star inactive star'></i><i class='fa fa-star star' style='position: absolute;top: 0;left: 0;overflow: hidden;width: " +
                width +
                "'></i></li>";
            } else {
              stars += "<li><i class='inactive star fa-fa-star'></i></li>";
            }
          }
        }
        stars += "</ul></div>";
        return stars;
      };

      var convertTime = function (UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];
        var time =
          months[a.getMonth()] + " " + a.getDate() + ", " + a.getFullYear();
        return time;
      };

      var addSchemaMarkup = function (element, placeData) {
        if (element instanceof jQuery) {
          var schema = plugin.settings.schema;
          var schemaMarkup =
            '<span itemscope="" itemtype="http://schema.org/' +
            schema.type +
            '">';

          if (schema.image !== null) {
            schemaMarkup += generateSchemaItemMarkup("image", schema.image);
          } else {
            console.warn(
              "Image is required for some schema types. Visit https://search.google.com/structured-data/testing-tool to test your schema output."
            );
          }

          if (schema.priceRange !== null) {
            schemaMarkup += generateSchemaItemMarkup(
              "priceRange",
              schema.priceRange
            );
          }

          schemaMarkup += generateSchemaItemMarkup("url", location.origin);
          schemaMarkup += generateSchemaItemMarkup(
            "telephone",
            plugin.place_data.formatted_phone_number
          );
          schemaMarkup += generateSchemaAddressMarkup();
          schemaMarkup += generateSchemaRatingMarkup(placeData, schema);
          schemaMarkup += "</span>";

          element.append(schemaMarkup);
        }
      };

      var generateSchemaAddressMarkup = function () {
        var $address = $("<div />", {
          itemprop: "address",
          itemscope: "",
          itemtype: "http://schema.org/PostalAddress"
        }).css("display", "none");
        $address.append(plugin.place_data.adr_address);
        $address.children(".street-address").attr("itemprop", "streetAddress");
        $address.children(".locality").attr("itemprop", "addressLocality");
        $address.children(".region").attr("itemprop", "addressRegion");
        $address.children(".postal-code").attr("itemprop", "postalCode");
        $address.children(".country-name").attr("itemprop", "addressCountry");
        return $address[0].outerHTML;
      };

      var generateSchemaRatingMarkup = function (placeData, schema) {
        var reviews = placeData.reviews;
        var lastIndex = reviews.length - 1;
        var reviewPointTotal = 0;

        for (var i = lastIndex; i >= 0; i--) {
          reviewPointTotal += reviews[i].rating;
        }

        var averageReview = reviewPointTotal / reviews.length;

        return (
          schema.beforeText +
          ' <span itemprop="name">' +
          placeData.name +
          "</span> " +
          '<span itemprop="aggregateRating" itemscope="" itemtype="http://schema.org/AggregateRating">' +
          '<span itemprop="ratingValue">' +
          averageReview.toFixed(2) +
          '</span>/<span itemprop="bestRating">5</span> ' +
          schema.middleText +
          ' <span itemprop="ratingCount">' +
          reviews.length +
          "</span> " +
          schema.afterText +
          "</span>"
        );
      };

      var generateSchemaItemMarkup = function (name, value) {
        return '<meta itemprop="' + name + '" content="' + value + '">';
      };

      plugin.init();
    };

    $.fn.googlePlaces = function (options) {
      return this.each(function () {
        if (undefined == $(this).data(namespace)) {
          var plugin = new $.googlePlaces(this, options);
          $(this).data(namespace, plugin);
        }
      });
    };
  })(jQuery);



  /** FUNCTION PLACE NAME AND TOTAL RATING **/
  function initMap()
  {
    var request = {
      placeId: locationPlaceId,
      fields: ['name', 'formatted_address', 'place_id', 'geometry', 'rating', 'user_ratings_total']
    };

    var service = new google.maps.places.PlacesService(map);

    service.getDetails(request, function (place, status)
    {
      if (status === google.maps.places.PlacesServiceStatus.OK)
      {
        var translate = 'reviews';
        document.getElementById("reviewname").innerHTML = place.name;
        document.getElementById("reviewrating").innerHTML = place.rating;
        document.getElementById("reviewstotal").innerHTML =  '(' + place.user_ratings_total + ' ' + translate + ')';
        $('.googleRstar').attr({"data-rating" : place.rating});
        $('.googleRstar').stars();

        ;
      }
    });
  }

//ES5
  $.fn.stars = function() {
    return $(this).each(function() {
      var rating = $(this).data("rating");
      var fullStar = new Array(Math.floor(rating + 1)).join('<i class="fas fa-star"></i>');
      var halfStar = ((rating%1) !== 0) ? '<i class="fas fa-star-half-alt"></i>': '';
      var noStar = new Array(Math.floor($(this).data("numStars") + 1 - rating)).join('<i class="far fa-star"></i>');
      $(this).html(fullStar + halfStar + noStar);
    });
  };

//ES6
  $.fn.stars = function() {
    return $(this).each(function() {
      const rating = $(this).data("rating");
      const numStars = $(this).data("numStars");
      const fullStar = '<i class="fas fa-star"></i>'.repeat(Math.floor(rating));
      const halfStar = (rating%1!== 0) ? '<i class="fas fa-star-half-alt"></i>': '';
      const noStar = '<i class="far fa-star"></i>'.repeat(Math.floor(numStars-rating));
      $(this).html(`${fullStar}${halfStar}${noStar}`);
    });
  };


  if ($('body .googlereviewsDiv').length) {

    $("#google-reviews").googlePlaces({
      placeId: locationPlaceId,
      render: ["reviews"],
    });

    initMap();
  }


  $.fn.clocktime = function(currentTime) {

    return this.each(function () {

      updateClock = function (self, diff) {

        var date = new Date();
        var hours = date.getHours();
        if (hours < 10) hours = "0" + hours;

        var minutes = date.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;

        var seconds = date.getSeconds();
        if (seconds < 10) seconds = "0" + seconds;

        var formattedTime = hours + ':' + minutes + ':' + seconds;

        self.text(formattedTime);

        setTimeout(function () {
          updateClock(self);
        }, 1000);
      };

      updateClock($(this));

    });
  }; // clock date  /time

  $.fn.onlydate = function(currentTime) {

    return this.each(function() {

      updateonlyDate = function (self, diff) {

        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if(day < 10) day = "0"+day;
        if(month < 10) month = "0"+month;

        var formattedTime = day + '-' + month + '-' + year;

        self.text(formattedTime);
        //console.log(self.attr("id")+":"+formattedTime);
        setTimeout(function() {
          updateonlyDate(self);
        }, 180000);
      };

      updateonlyDate($(this));

    });
  }; // clock only date

  $.fn.onlyday = function(currentTime) {

    return this.each(function() {

      updateonlyDay = function (self, diff) {

        var date = new Date();
        var week = ["ZONDAG", "MAANDAG", "DINSDAG", "WOENSDAG", "DONDERDAG", "VRIJDAG", "ZATERDAG"];
        var formattedTime = week[date.getDay()];

        self.text(formattedTime);

        setTimeout(function() {
          updateonlyDay(self);
        }, 180000);
      };

      updateonlyDay($(this));

    });
  }; // clock only time

  $('[class^="clocktime"]').clocktime(123456789);
  $('[class^="onlydate"]').onlydate(123456789);
  $('[class^="onlyday"]').onlyday(123456789);

  // @Elfsight remove overlay disabled for Live Screen

  function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {

      callback();

      if (++x === repetitions) {
        window.clearInterval(intervalID);
      }

    }, delay);
  }

  // @Elfsight remove overlay disabled

  $(function(){
    setIntervalX(function () {
      jQuery('a[href*="utm_source="]').attr('style', 'display: none !important');
      $('.eapps-facebook-feed-load-more-label').trigger( "click" );
      $('.eapps-facebook-feed-load-more-label').remove();

    }, 1000, 5);
  });


  $("#slideshow > div:gt(0)").hide();

  var interval = setInterval(slide, 20000);

  function intslide(func) {
    if (func == 'start') {
      interval = setInterval(slide, 1000);
    } else {
      clearInterval(interval);
    }
  }

  function slide() {
    sact('next', 0, 500);
  }

  function sact(a, ix, it) {
    var currentSlide = $('.current');
    var nextSlide = currentSlide.next('.slideitem');
    var prevSlide = currentSlide.prev('.slideitem');
    var reqSlide = $('.slideitem').eq(ix);

    if (nextSlide.length == 0) {
      nextSlide = $('.slideitem').first();
    }

    if (prevSlide.length == 0) {
      prevSlide = $('.slideitem').last();
    }

    if (a == 'next') {
      var Slide = nextSlide;
    }
    else if (a == 'prev') {
      var Slide = prevSlide;
    }
    else {
      var Slide = reqSlide;
    }

    currentSlide.fadeOut(it).removeClass('current');
    Slide.fadeIn(it).addClass('current');

  }

  $('.next').on('click', function(){
    intslide('stop');
    sact('next', 0, 200);
    intslide('start');
  });

  $('.prev').on('click', function(){
    intslide('stop');
    sact('prev', 0, 200);
    intslide('start');
  });


});








