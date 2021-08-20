class Provider {
    static getWeather(city) {
        return Promise.resolve(`The weather of ${city} is Cloudy`)
    };

    static getLocalCurrency(city) {
        return Promise.resolve(`The local currency of ${city} is GBP`)
    };

    static findCity(long, lat) {
        return Promise.resolve(`London`)
    };
};

(async () => {
    const city = await Provider.findCity(51.5074, 0.1278)
    console.error(`The city located at coords  is ${city}`)

    const weather = await Provider.getWeather(city)
    console.error(weather)

    const currency = await Provider.getLocalCurrency(city)
    console.error(currency)
})()
