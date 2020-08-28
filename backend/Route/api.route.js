const express = require('express');
const apiRoutes = express.Router();
const request = require('request');

let Currency = require('../Model/api.model');

const currencyExchangeAPI = "https://api.exchangeratesapi.io/latest";

apiRoutes.route('/addCurrencyList').post(function (req, res) {
	let currencyList = new Currency(req.body);
	currencyList
		.save()
		.then((currencyList) => {
			res.status(200).json({ currencyList: 'Currency added successfully' });
		})
		.catch((err) => {
			res.status(400).send('unable to save to database');
		});
});

apiRoutes.route('/getExchangeRates').get(function (req, res) {
	request(currencyExchangeAPI, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.send(body);
		}
	});
});

apiRoutes.route('/').get(function (req, res) {
	Currency.find(function (err, data) {
		if (err) {
			console.log(err);
		} else {
			res.json(data[0].currencyList);
		}
	});
});

module.exports = apiRoutes;
