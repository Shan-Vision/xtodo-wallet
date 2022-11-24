import { useEffect, useState } from 'react';
import { fetchCurrency } from 'services/API-PB-currency';
import {
  CurrencyDataItem,
  CurrencyData,
  CurrencyBox,
  CurrencyTitle,
  CurrencyTitleItem,
  CurrencyDataItemText,
  ButtonBox,
  ButtonCurrency,
} from './Currency.styled';

const Currency = () => {
  const [foundedCurrency, setFoundedCurrency] = useState([]);
  const [searchParams, setSearchParams] = useState('cashless');

  const changeSearchValue = value => {
    setSearchParams(value);
  };
  useEffect(() => {
    fetchCurrency(searchParams).then(setFoundedCurrency);
  }, [searchParams]);

  //counter dynamic

  function counter(className, start, end, duration) {
    let obj = document.querySelector(className),
      current = start,
      range = end - start,
      increment = end > start ? 1 : -1,
      step = Math.abs(Math.floor(duration / range)),
      timer = setInterval(() => {
        current += increment;
        obj.textContent = current;
        if (current === end) {
          clearInterval(timer);
        }
      }, step);
    console.log(obj);
  }
  document.addEventListener('DOMContentLoaded', () => {
    counter('USDBuy', 0, 400, 3000);
    counter('counterSale', 0, 50, 2500);
  });

  //counter dynamic

  return (
    <CurrencyBox>
      <CurrencyTitle>
        <CurrencyTitleItem>Currency</CurrencyTitleItem>
        <CurrencyTitleItem>Purchase</CurrencyTitleItem>
        <CurrencyTitleItem>Sale</CurrencyTitleItem>
      </CurrencyTitle>
      <CurrencyData>
        {foundedCurrency.map(
          ({ code = 'No Data', buy = '00.00', sale = '00.00' }) => {
            return (
              <CurrencyDataItem key={code}>
                <CurrencyDataItemText>{code}</CurrencyDataItemText>
                <CurrencyDataItemText
                  className={`${code}Buy`}
                  onClick={() => {
                    counter(`${code}Buy`, 0, parseFloat(buy.toFixed(2)), 300);
                    console.log(typeof parseFloat(buy.toFixed(2)));
                    console.log(parseFloat(buy.toFixed(2)));
                  }}
                >
                  {parseFloat(buy.toFixed(2))}
                </CurrencyDataItemText>
                <CurrencyDataItemText className={`${code}Sell`}>
                  {/* {parseFloat(sale).toFixed(2)} */}
                </CurrencyDataItemText>
              </CurrencyDataItem>
            );
          }
        )}
      </CurrencyData>
      <ButtonBox>
        <ButtonCurrency
          disabled={searchParams === 'cash' ? true : false}
          onClick={() => {
            changeSearchValue('cash');
          }}
        >
          Cash
        </ButtonCurrency>
        <ButtonCurrency
          disabled={searchParams === 'cashless' ? true : false}
          onClick={() => {
            changeSearchValue('cashless');
          }}
        >
          Cashless
        </ButtonCurrency>
      </ButtonBox>
    </CurrencyBox>
  );
};

export default Currency;
