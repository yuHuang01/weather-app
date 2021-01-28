const appParts = {
  search: document.getElementById('search'),

  city: document.getElementById('city'),
  rate: document.getElementById('rate'),
  descrip: document.getElementById('description'),
  humi: document.getElementById('humidity'),
  wind: document.getElementById('wind'),

  err: document.getElementById('error'),
};

const weatherFuncs = {
  getDatas: async (cityName) => {
    try {
      const response = await fetch(`adhttp://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=fb9fb028085214974b975cb60833cb56`, { mode: 'cors' });
      const data = await response.json();

      return data;
    } catch (err) {
      return err;
    }
  },
  diplayDatas: (promise) => {
    promise.then((datas) => {
      appParts.err.textContent = '';

      const city = datas.name;
      const coun = datas.sys.country;
      const tempreature = datas.main.temp;
      const des = datas.weather[0].description;
      const humi = datas.main.humidity;
      const windSpeed = datas.wind.speed;

      appParts.city.textContent = `${city}, ${coun}`;
      appParts.rate.textContent = `${tempreature} °C`;
      appParts.descrip.textContent = des;
      appParts.humi.textContent = `${humi}%`;
      appParts.wind.textContent = `${windSpeed} km/h`;
    }).catch((err) => {
      appParts.err.textContent = err;
    });
  },
};

appParts.search.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    const search = document.getElementById('search').value;
    weatherFuncs.diplayDatas(weatherFuncs.getDatas(search));
  }
});
