'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { addOne, initCounterState, substractOne } from '@/store/counter/counterSlice';
import { useEffect } from 'react';

type CartCounterProps = {
  value?: number;
};

export interface CounterResponse {
  counter: number;
}

const getApiCounter = async () => {
  const data: CounterResponse = await fetch('/api/counter').then((response) => response.json());

  return data;
};

export const CartCounter = ({ value = 0 }: CartCounterProps) => {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(initCounterState(value));
  // }, [dispatch, value]);

  useEffect(() => {
    getApiCounter().then(({ counter }) => dispatch(initCounterState(counter)));
  }, [dispatch]);

  return (
    <>
      <span className='text-9xl'>{count}</span>
      <div className='flex'>
        <button
          onClick={() => dispatch(addOne())}
          className='flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2'
        >
          +1
        </button>
        <button
          onClick={() => dispatch(substractOne())}
          className='flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2'
        >
          -1
        </button>
      </div>
    </>
  );
};
