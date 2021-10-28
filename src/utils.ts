import { config } from '@react-spring/web';
import { useEffect, useRef } from 'react';

// @ts-ignore
export const getArrayItemOfTask = () => JSON.parse(localStorage.getItem('Tasks'))
export const setItemsLocalStorage = (array: any[]) => {
  return localStorage.setItem('Tasks', JSON.stringify(array));
}

export const fnDnD =
  (order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0) =>
    (index: number) =>
      active && index === originalIndex
        ? {
          y: curIndex * 100 + y,
          scale: 1.1,
          zIndex: 1,
          shadow: 15,
          immediate: (key: string) => key === 'zIndex',
          config: (key: string) =>
            key === 'y' ? config.stiff : config.default,
        }
        : {
          y: order.indexOf(index) * 100,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        };

export function usePrevious<T>(value: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}