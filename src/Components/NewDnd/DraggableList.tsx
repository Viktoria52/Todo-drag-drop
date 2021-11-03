import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { animated, useSpring, useSprings } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
// @ts-ignore
import clamp from 'lodash.clamp'
import swap from 'lodash-move'
import styles from './style/styles.module.css'
import { TaskCard } from './TaskCard'
import move from '../../assets/move.svg'
import { changePositionItems } from '../../store/thunks'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { fnDnD, usePrevious } from '../../utils/utils'
import { delayAddTask, deleteDelay } from '../../utils/contants'

interface propsDraggableList {
  items: any[]
  addTaskRef?: any
}

export function DraggableList({ items = [], addTaskRef }: propsDraggableList) {
  const memoItems = useMemo<any[]>(() => items, [items])
  const { all } = useAppSelector((state) => state.TodoReducer)
  const testPrevItems = usePrevious(all || [])
  const [order, setOrder] = useState(memoItems.map((item, index) => index))
  const [isAddAnimation, setAddAnimation] = useState(false)
  const [isDeleteAnimation, setDeleteAnimation] = useState(false)
  const [deleteId, setDeleteId] = useState<string>('')
  const lastItem = memoItems.length - 1
  const dispatch = useAppDispatch()
  const [currentRow, setCurrentRow] = useState(0)
  const [movableItem, setMovableItem] = useState(0)
  const [isActiveDrag, setActiveDrag] = useState(false) // ----
  const [direction, setDirection] = useState(0) // положительное - вниз, отрицательное - вверх
  const [springs, api] = useSprings(memoItems.length, fnDnD(order))
  const bind = useDrag(
    ({ args: [originalIndex], active, movement: [_, y] }) => {
      // originalIndex - индекс элемента, который схватили, он не меняется, если эллемент перемещен, то есть его ориджинал индекс всегда один и тот же
      const curIndex = order.indexOf(originalIndex) // индекс передвигаемого элемента
      const curRow = clamp(
        //ограничение числа[число, от, до] это над чем тащим(индекс). (значение может быть отрицательным!)
        Math.round((curIndex * 100 + y) / 100),
        0,
        memoItems.length - 1
      )
      const newOrder = swap(order, curIndex, curRow) // меняет индексы местами [массив, заменяемыйИндекс, ИндексДляЗамены]
      api.start(fnDnD(newOrder, active, originalIndex, curIndex, y)) //запуск анимации fn(проп со стилями)
      if (!active) setOrder(newOrder) //после отпускания элемента меняет расположение элементов в массиве
      setCurrentRow(curRow)
      setMovableItem(curIndex)
      setActiveDrag(active)
      setDirection(y)
    }
  )
  useEffect(() => {
    order.push(order.length)
    if (testPrevItems && testPrevItems.length < memoItems.length) {
      setAddAnimation(true)
      setTimeout(() => {
        setAddAnimation(false)
      }, delayAddTask)
    }
  }, [memoItems, testPrevItems])

  useEffect(() => {
    dispatch(
      changePositionItems(movableItem, currentRow, isActiveDrag, direction)
    )
  }, [movableItem, currentRow, isActiveDrag, direction])

  const animationProps = useSpring({
    to: async (next, cancel) => {
      if (isAddAnimation) {
        await next({
          opacity: '0',
        })
        await next({
          marginLeft: '-2000px',
        })
        await next({
          opacity: '1',
          marginLeft: '0',
        })
      }
      if (isDeleteAnimation) {
        await next({
          right: '500px',
        })
        await next({
          right: '-461px',
        })
      }
    },
    from: {
      opacity: isAddAnimation ? '0' : '1',
      marginLeft: '0',
      right: '735px',
    },
    config: {
      duration: 300,
    },
    reset: true,
    delay: isAddAnimation ? 1 : 0,
  })

  const deleteItem = useCallback(
    (id: string) => {
      setDeleteId(id)
      setDeleteAnimation(true)
      setTimeout(() => {
        setDeleteAnimation(false)
        setDeleteId('')
        setOrder(memoItems.map((item, index) => index))
      }, deleteDelay)
    },
    [testPrevItems, memoItems]
  )

  return (
    <div className={styles.content} style={{ height: memoItems.length * 100 }}>
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <animated.div
          key={memoItems[i][0][1]}
          style={{
            zIndex,
            boxShadow: shadow.to(
              (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
            ),
            background: '#A4D3ED',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px',
            y,
            scale,
            marginTop: '20px',
            marginLeft:
              memoItems[i][0][1] === memoItems[lastItem][0][1] // id последнего элемента
                ? animationProps.marginLeft
                : '0',
            opacity:
              memoItems[i][0][1] === memoItems[lastItem][0][1]
                ? animationProps.opacity
                : '1',
            right:
              testPrevItems && deleteId && deleteId === testPrevItems[i].id // id удаленного
                ? animationProps.right
                : 'none',
          }}
        >
          {memoItems.length > 0 && (
            <TaskCard
              text={memoItems[i][1][1]}
              id={memoItems[i][0][1]}
              checked={memoItems[i][2][1]}
              deleteItem={deleteItem}
            />
          )}
          <div
            className={styles.movable}
            {...bind(i)}
            style={{
              position: 'absolute',
              right: '0',
              top: '0',
              margin: '3px 7px 0 0',
              width: '22px',
              height: '22px',
              backgroundImage: `url(${move})`,
              backgroundRepeat: 'no-repeat',
            }}
          />
        </animated.div>
      ))}
    </div>
  )
}
