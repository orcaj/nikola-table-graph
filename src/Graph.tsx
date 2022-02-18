import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './modules';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TopBar from './TopBar';
import { Container } from 'react-bootstrap';

import { loadCategoryList } from './modules/category';
import { loadTransactionList } from './modules/transactions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Graph() {
  const categories = useSelector((state: RootState) => state.category);
  const transactions = useSelector((state: RootState) => state.transactions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategoryList());
    dispatch(loadTransactionList());
  }, [])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const labels = categories.map(i => i.label);

  const amountCate = () => {
    let amounts: number[] = [];
    categories.map(i => {
      const tranCate = transactions.filter(tran => tran.categoryId == i.id);
      const amount = tranCate.reduce((a, curr) => a + Number(curr.amount), 0)
      amounts.push(amount);
    })
    return amounts;
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Amount Per Category',
        data: amountCate(),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',

      }
    ],
  };


  return (
    <>
      <TopBar />
      <Container>
        <Bar options={options} data={data} />
      </Container>
    </>
  )
}


export default Graph;