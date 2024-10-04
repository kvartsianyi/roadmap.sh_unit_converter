import { unitsOfMeasurement } from './constants.js';

export const convert = (unit, from, to, value) => {
	if (unit.toLowerCase() === 'temperature') {
		return convertTemperature(from, to, value);
	}

	const convertedFrom = value / unitsOfMeasurement[unit.toUpperCase()][from];
	const convertedTo = convertedFrom * unitsOfMeasurement[unit.toUpperCase()][to];
	
	return convertedTo;
}

const convertTemperature = (from, to, value) => {
	let convertedFrom = value;
	let convertedTo = 0;

	if (from.toLowerCase() === 'fahrenheit') {
		convertedFrom = (value - 32) * 5/9;
	}

	if (from.toLowerCase() === 'kelvin') {
		convertedFrom = value - 273.15;
	}

	if (to.toLowerCase() === 'fahrenheit') {
		convertedTo = (convertedFrom * 9/5) + 32;
	}

	if (to.toLowerCase() === 'kelvin') {
		convertedTo = convertedFrom + 273.15;
	}

	return convertedTo;
}

export const roundToPrecision = (num, precision) => {
	const factor = Math.pow(10, precision);
	return Math.round(num * factor) / factor;
}

export const capitalizeFirst = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}