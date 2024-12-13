import React, { useReducer } from 'react';
import { getExchangeRate } from '../api/api';

// Reducer function for currency converter
const initialState = {
  fromCurrency: 'USD',
  toCurrency: 'EUR',
  amount: 1,
  convertedAmount: null,
  error: '',
};

function currencyReducer(state, action) {
  switch (action.type) {
    case 'SET_FROM_CURRENCY':
      return { ...state, fromCurrency: action.payload };
    case 'SET_TO_CURRENCY':
      return { ...state, toCurrency: action.payload };
    case 'SET_AMOUNT':
      return { ...state, amount: action.payload };
    case 'SET_CONVERTED_AMOUNT':
      return { ...state, convertedAmount: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const CurrencyConverter = () => {
  const [state, dispatch] = useReducer(currencyReducer, initialState);

  const handleConvert = async () => {
    dispatch({ type: 'SET_ERROR', payload: '' });
    try {
      const result = await getExchangeRate(state.fromCurrency, state.toCurrency, state.amount);
      dispatch({ type: 'SET_CONVERTED_AMOUNT', payload: result });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to convert currency.' });
    }
  };

  return (
    <section id="currency">
      <h2>Currency Converter</h2>
      <div>
        <input
          type="number"
          value={state.amount}
          onChange={(e) => dispatch({ type: 'SET_AMOUNT', payload: e.target.value })}
        />
        <select
          value={state.fromCurrency}
          onChange={(e) => dispatch({ type: 'SET_FROM_CURRENCY', payload: e.target.value })}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <span>to</span>
        <select
          value={state.toCurrency}
          onChange={(e) => dispatch({ type: 'SET_TO_CURRENCY', payload: e.target.value })}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <button onClick={handleConvert}>Convert</button>
      </div>
      {state.convertedAmount && <p>Converted Amount: {state.convertedAmount} {state.toCurrency}</p>}
      {state.error && <p>{state.error}</p>}
    </section>
  );
};

export default CurrencyConverter;
