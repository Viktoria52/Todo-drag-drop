import React, { useEffect, useState } from 'react';
import { animated, config, useSprings, useTransition } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
// @ts-ignore
import clamp from 'lodash.clamp';
import swap from 'lodash-move';
import styles from './style/styles.module.css';
import { TaskCard } from './TaskCard';
import move from '../../assets/move.svg';
import { changePositionItems } from '../../store/thunks';
import { useAppDispatch } from '../../store/store';
import { fnDnD, usePrevious } from '../../utils';

export function DraggableList({ items }: { items: any[] }) {
  const [order, setOrder] = useState(items.map((item, index) => index));
  const dispatch = useAppDispatch();
  const [currentRow, setCurrentRow] = useState(0);
  const [movableItem, setMovableItem] = useState(0);
  const [isActiveDrag, setActiveDrag] = useState(false); // ----
  const [direction, setDirection] = useState(0);// положительное - вниз, отрицательное - вверх
  const [springs, api] = useSprings(items.length, fnDnD(order));
  const bind = useDrag(({ args: [originalIndex], active, movement: [_, y] }) => {
    const curIndex = order.indexOf(originalIndex); // индекс передвигаемого элемента
    const curRow = clamp( //ограничение числа[число, от, до] это над чем тащим(индекс). (значение может быть отрицательным!)
      Math.round((curIndex * 100 + y) / 100),
      0,
      items.length - 1
    );
    const newOrder = swap(order, curIndex, curRow); // меняет индексы местами [массив, заменяемыйИндекс, ИндексДляЗамены]
    api.start(fnDnD(newOrder, active, originalIndex, curIndex, y)); //запуск анимации fn(проп со стилями)
    if (!active) setOrder(newOrder); //после отпускания элемента меняет расположение элементов в массиве
    setCurrentRow(curRow);
    setMovableItem(curIndex);
    setActiveDrag(active);
    setDirection(y);

  });
  useEffect(() => {
    order.push(order.length);

  }, [items]);
  console.log(order)
  useEffect(() => {
    dispatch(
      changePositionItems(movableItem, currentRow, isActiveDrag, direction)
    );
  }, [movableItem, currentRow, isActiveDrag, direction]);

  const [animatedItems, setAnimatedItems] = useState<any[]>([])
  const prevItems = usePrevious(items)
  const transitions = useTransition(animatedItems, {
    enter: ({ width = 20 }) => ({
      transform: `translateY(0)`, // начальное значние
      width,
      opacity: 1,
    }),
    update: { transform: `translateX(0)`}, // срабатывает при любом изминении
    leave: { transform: `translateX(0)`, width: 0, opacity: 0 }, // при повторном изменении??
    config: { mass: 1, tension: 250, friction: 20 },
  });

  useEffect(() => {
    if(prevItems !== items) {
      setAnimatedItems(items)
    }
  }, [items]);

  return (
    <div className={styles.content} style={{ height: items.length * 100 }}>
      {springs.map(({ zIndex, shadow, y, scale }, i) =>
          transitions((style, item) => (
          <animated.div
            key={i}
            style={{
              zIndex,
              boxShadow: shadow.to(
                (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
              ),
              background: 'rgb(130, 182, 209)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 8px',
              y,
              scale,
              opacity: style.opacity,
              transform: style.transform,
            }}
          >
            {items.length > 0 && (
              <TaskCard
                direction={direction}
                active={isActiveDrag}
                movableItem={movableItem}
                currentRow={currentRow}
                text={items[i][1][1]}
                id={items[i][0][1]}
                checked={items[i][2][1]}
              />
            )}
            <div
              className={styles.movable}
              {...bind(i)}
              style={{
                position: 'absolute',
                right: '0',
                top: '0',
                margin: '7px 4px 0 0',
                width: '20px',
                height: '20px',
                backgroundImage: `url(${move})`,
                backgroundRepeat: 'no-repeat',
              }}
            />
          </animated.div>
        ))
      )}
    </div>
  );
}
