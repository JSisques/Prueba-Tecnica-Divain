'use client';
import StockTable from '@/components/stockTable/StockTable';
import useAuth from '@/hooks/useAuth';
import { fetchData } from '@/util/api';
import { useSession } from 'next-auth/react';

import { useEffect, useState } from 'react';

import axiosInstance from '../config/axios';
import { Stock } from '@/interfaces/Stock';
import MovementTable from '@/components/movementHistoryTable/MovementHistoryTable';

import './globals.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const [stockList, setStockList] = useState<Stock[]>();
  const [movementList, setMovementList] = useState<Movement[]>();

  const fetchStock = async () => {
    setIsLoading(true);

    const token = session?.user?.accessToken;

    if (token) {
      axiosInstance.defaults.headers.common = { Authorization: `bearer ${token}` };

      axiosInstance
        .get('/stock')
        .then(function (response) {
          const json = response.data;

          console.log(json);

          const stockData: Stock[] = response.data;
          setStockList(stockData);

          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  const fetchMovements = async () => {
    setIsLoading(true);

    const token = session?.user?.accessToken;

    if (token) {
      axiosInstance.defaults.headers.common = { Authorization: `bearer ${token}` };

      axiosInstance
        .get('/movementHistory')
        .then(function (response) {
          const movementData: Movement[] = response.data;
          setMovementList(movementData);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchStock();
    fetchMovements();
  }, [session?.user.accessToken]);

  const handleButtonClick = (sku: string, quantity: number) => {
    let type = 'EXIT';

    if (quantity >= 0) {
      type = 'ENTRY';
    }

    axiosInstance.defaults.headers.common = { Authorization: `bearer ${session?.user.accessToken}` };

    axiosInstance
      .post('/movementHistory', {
        sku: sku,
        quantity: Math.abs(quantity),
        type: type,
      })
      .then(function (response) {
        fetchStock();
        fetchMovements();
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  if (status === 'unauthenticated') {
    router.push('/api/auth/signin');
  }

  if (isLoading) {
    return (
      <>
        <p>Obteniendo los datos</p>
      </>
    );
  } else {
    return (
      <>
        <p>Email del usuario: {session?.user.email}</p>
        {stockList && <StockTable items={stockList.map(item => ({ ...item, onButtonClick: handleButtonClick }))} />}
        {movementList && <MovementTable movements={movementList} />}
      </>
    );
  }
}
