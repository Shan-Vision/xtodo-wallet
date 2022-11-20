import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  logOutUser,
  logInUser,
  getTransactions,
  transactionsSelectors,
  addTransaction,
} from '../../redux';

export const TestReduxComponent = () => {
  const dispatch = useDispatch();

  const transactions = useSelector(transactionsSelectors.getTransactions);

  useEffect(() => {
    dispatch(getTransactions(1));
  }, [dispatch]);

  const EarnDispatch = () => {
    dispatch(
      addTransaction({
        income: true,
        sum: 1200 + Math.floor(Math.random() * 10) * 100,
        category: '6378dbbf7f1022fdac49bdf1',
        comment: 'got paid for my job',
      })
    );
  };

  const SpendDispatch = () => {
    dispatch(
      addTransaction({
        income: false,
        sum: 800 + Math.floor(Math.random() * 10) * 10,
        category: '6378dbbf7f1022fdac49bdf1',
        comment: 'spending my money on stuff',
      })
    );
  };

  return (
    <div>
      <button type="button" onClick={EarnDispatch}>
        Get money
      </button>
      <button type="button" onClick={SpendDispatch}>
        Spend money
      </button>
      {transactions &&
        transactions.map(e => (
          <p
            key={e.id}
          >{`${e.id} ${e.income} ${e.category} ${e.comment} ${e.sum} ${e.balance}`}</p>
        ))}
    </div>
  );
};