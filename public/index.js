import { unitsOfMeasurement } from './constants.js';
import { capitalizeFirst, convert, roundToPrecision } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
	initUIUpdates();
	initEventListeners();
});

function initUIUpdates() {
	const unit = 'Length';

	updateUnitInText(unit);
	renderActivaNavItem(unit);
	initRenderConvertOptions(unit);
}

function initEventListeners() {
	initUnitChangeListener();
	initFormSubmitListener();
	initFormResetListener();
}

function renderActivaNavItem(unit) {
	const navItems = document.querySelectorAll('.nav-item');

	navItems.forEach(item => {
    if (item.innerHTML.toLowerCase() !== unit.toLowerCase() ) {
      item.classList.remove('active');
			return;
    } 

    if (!item.classList.contains('active')) {
      item.classList.add('active');
			return;
    }
  });
}

function initRenderConvertOptions(unit) {
	const convertFromSelect = document.querySelector('select[name=convert-from]');
	const convertToSelect = document.querySelector('select[name=convert-to]');
	const units = Object.keys(unitsOfMeasurement[unit.toUpperCase()]);

	// Clear all childs
	convertFromSelect.textContent = '';
	convertToSelect.textContent = '';

	units.forEach(unit => {
		const optionFrom = document.createElement('option');
		optionFrom.label = capitalizeFirst(unit);
		optionFrom.value = unit;

		const optionTo = document.createElement('option');
		optionTo.label = capitalizeFirst(unit);
		optionTo.value = unit;

		convertFromSelect.appendChild(optionFrom);
		convertToSelect.appendChild(optionTo);
	});
}

function initUnitChangeListener() {
	const navItems = document.querySelectorAll('.nav-item');

	navItems.forEach(item => item.addEventListener('change', e => {
		const selectedUnit = e.target.value;

		updateUnitInText(selectedUnit);
		initRenderConvertOptions(selectedUnit);
	}));
}

function initFormSubmitListener() {
	const form = document.querySelector('.converter-form');
	
	form.addEventListener('submit', submitForm);
}

function initFormResetListener() {
	const btn = document.querySelector('.reset-form');
	
	btn.addEventListener('click', resetForm);
}

function updateUnitInText(unit) {
	const unitText = document.querySelector('.unit-text');
	unitText.innerHTML = unit.toLowerCase();
}

function submitForm(e) {
	e.preventDefault();

	document.querySelector('.converter-form').classList.add('d-none');
	document.querySelector('.converter-result').classList.remove('d-none');

	const unit = document.querySelector('input[name="unit"]:checked').value;
	const value = parseFloat(document.querySelector('input[name="number"]').value) || 0;
	const convertFrom = document.querySelector('select[name=convert-from]').value;
	const convertTo = document.querySelector('select[name=convert-to]').value;

	const convertedValue = convert(unit, convertFrom, convertTo, value);
	const input = `${value} ${convertFrom}(s)`;
	const output = `${roundToPrecision(convertedValue, 2)} ${convertTo}(s)`;
	document.querySelector('.converter-input').innerHTML = input;
	document.querySelector('.converter-output').innerHTML = output;
}

function resetForm(e) {
	e.preventDefault();

	document.querySelector('.converter-form').classList.remove('d-none');
	document.querySelector('.converter-result').classList.add('d-none');
}

