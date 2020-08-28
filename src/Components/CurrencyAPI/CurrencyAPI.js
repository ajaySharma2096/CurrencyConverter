import Axios from 'axios';

export const API_Action = {
    fetchCurrency,
    getExchangeRates
};

const baseServerURL = 'http://localhost:5000/api/currency';

function fetchCurrency(callback) {
	(async () => {
        const res = await Axios.get(baseServerURL);
        callback(res)
	})();
}

function getExchangeRates(callback){
    (async () => {
        const res = await Axios.get(baseServerURL + '/getExchangeRates');
        callback(res.data)
	})();
}
