import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './style.css';
import { API_Action } from '../../CurrencyAPI/CurrencyAPI';
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currFrom: '',
			currTo: '',
			name: '',
			currencyList: [],
			exnchangeRateData: {},
			currencyInputValue: '',
			finalResultValue: '',
		};
		this.inputValueRef = React.createRef();
	}

	componentDidMount() {
		API_Action.fetchCurrency((result) => {
			this.setState({ currencyList: result.data });
		});
		API_Action.getExchangeRates((data) => {
			this.setState({ exnchangeRateData: data });
		});
	}

	handleChange = (event) => {
		const name = event.target.name;
		this.setState({
			...this.state,
			[name]: event.target.value,
		});
	};

	ClickHandler = () => {
		let currencyValue = this.inputValueRef.current.value;
		if (currencyValue === '') {
			alert('Please Enter some value');
		} else {
			let currFromExchangeRate = this.state.exnchangeRateData.rates[this.state.currencyList[this.state.currFrom]];
			let currToExchangeRate = this.state.exnchangeRateData.rates[this.state.currencyList[this.state.currTo]];
			var finalResult = (currToExchangeRate / currFromExchangeRate) * this.state.currencyInputValue;
			this.setState({
				finalResultValue: finalResult.toFixed(2),
			});
		}
	};

	inputValueChangeHandler = (event) => {
		this.setState({
			currencyInputValue: event.target.value,
		});
	};

	render() {
		const currList = Object.keys(this.state.currencyList);
		const dropDowmValues = currList.map(function (item, index) {
			return (
				<option value={item} key={index}>
					{item}
				</option>
			);
		});
		return (
			<div className="pd-25">
				<div className="top-header">Currency Converter</div>
				<div className="dd-container">
					<FormControl variant="outlined" className="currencyDropdown dd-from">
						<InputLabel htmlFor="outlined-age-native-simple">Currency From</InputLabel>
						<Select
							native
							value={this.state.currFrom}
							onChange={this.handleChange}
							label="Currency From"
							inputProps={{
								name: 'currFrom',
								id: 'currencyFromDrop',
							}}
						>
							<option aria-label="None" value="" />
							{dropDowmValues}
						</Select>
					</FormControl>
					<FormControl variant="outlined" className="currencyDropdown dd-to">
						<InputLabel htmlFor="outlined-age-native-simple">Currency To</InputLabel>
						<Select
							native
							value={this.state.currTo}
							onChange={this.handleChange}
							label="Currency To"
							inputProps={{
								name: 'currTo',
								id: 'currencyToDrop',
							}}
						>
							<option aria-label="None" value="" />
							{dropDowmValues}
						</Select>
					</FormControl>
				</div>
				<input
					type="number"
					ref={this.inputValueRef}
					name="value"
					value={this.state.currencyInputValue}
					onChange={this.inputValueChangeHandler}
					className="val-input"
					placeholder="Enter Currency Value"
				></input>
				<div className="btn-container">
					<button className="submit-btn" onClick={this.ClickHandler}>
						Convert
					</button>
				</div>
				<div className="res-container">
					{this.state.finalResultValue === ''
						? ''
						: this.state.currencyInputValue +
						  ' ' +
						  this.state.currFrom +
						  ' = ' +
						  this.state.finalResultValue +
						  ' ' +
						  this.state.currTo}
				</div>
			</div>
		);
	}
}

export default Home;
