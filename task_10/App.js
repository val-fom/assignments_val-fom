import './src/scss/app.scss';

import getAllForecast from './src/utils/api';
import findCity from './src/utils/api';
import { getCityFromUrl, setCityTitle, pushHistoryState } from './src/utils';

import { Component } from './src/Framework';

import Header from './src/Header';
import Search from './src/Search';
import History from './src/History';
import Favourites from './src/Favourites';
import Weather from './src/Weather';
import Forecast from './src/Forecast';
import Units from './src/Units';
import Footer from './src/Footer';

export default class App extends Component {
	constructor({ host }) {
		super();

		this.state = {
			weatherResponse: null,
			forecastResponse: null,
			city: getCityFromUrl() || 'Kyiv,UA',
			units: localStorage.units || 'metric',
			isFound: true,
		}

		this.host = host;

		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onUnitsToggle = this.onUnitsToggle.bind(this);
		this.onPopHistoryState = this.onPopHistoryState.bind(this);

		this.header = new Header();
		this.search = new Search({
			city: this.state.city,
			onSubmit: this.onSearchSubmit,
			isFound: true,
		});
		this.history = new History({
			city: this.state.city,
			onClick: this.onSearchSubmit,
		});
		this.favourites = new Favourites({
			city: this.state.city,
			onClick: this.onSearchSubmit,
		});
		this.weather = new Weather();
		this.forecast = new Forecast();
		this.units = new Units({
			onToggle: this.onUnitsToggle,
		});
		this.footer = new Footer();

		window.onpopstate = ev => {
			this.onPopHistoryState(ev.state.city, ev.state.units);
		}

		this.onSearchSubmit();
	}

	onSearchSubmit(city) {
		this.updateCityResponse({ city })
			.then(pushHistoryState)
			.catch(console.error);
	}

	onUnitsToggle(units) {
		this.updateCityResponse({ units })
			.then(pushHistoryState);
	}

	onPopHistoryState(city, units) {
		this.updateCityResponse({ city, units });
	}

	updateCityResponse({ city, units }) {
		city = city || this.state.city;
		units = units || this.state.units;
		return getAllForecast(city, units)
			.then(this.computeNextState, this.computeNotFoundState)
			.then(this.updateState)
			.catch(console.error);
	}

	computeNextState({ weatherResponse, forecastResponse, units }) {
		const city = `${weatherResponse.name},${weatherResponse.sys.country}`;
		return {
			weatherResponse,
			forecastResponse,
			units,
			city,
			isFound: true
		}
	}

	computeNotFoundState() {
		return { isFound: false };
	}

	componentsStateWillUpdate(nextState) {
		if (nextState.city !== this.state.city) setCityTitle(nextState.city);
	}

	render() {
		const { city, weatherResponse, forecastResponse, isFound } = this.state;

		return [
			this.header.update(),
			this.search.update({ city, isFound }),
			this.history.update({ city }),
			this.favourites.update({ city }),
			this.weather.update({ city, weatherResponse }),
			this.forecast.update({ city, forecastResponse }),
			this.units.update(),
			this.footer.update(),
		];
	}
}
