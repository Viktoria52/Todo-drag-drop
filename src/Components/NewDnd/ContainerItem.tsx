import { animated, useSpring } from '@react-spring/web'
import React, { useEffect, useState } from 'react'
import { usePrevious } from '../../utils/utils'
import styles from './style/styles.module.css'
import move from '../../assets/move.svg'

interface propsContainerItem {
  items?: any[]
  bind?: any
  i?: any
  text?: string
  id?: string
  checked?: boolean
}

export const ContainerItem = ({ items, bind, i }: propsContainerItem) => {
  const [addAnimation, setAddAnimation] = useState(false)
  const prevItems = usePrevious(items)

  useEffect(() => {
    setAddAnimation(true)
    setTimeout(() => {
      setAddAnimation(false)
    }, 1000)
  }, [items])

  const contentProps = useSpring({
    to: async (next, cancel) => {
      await next({
        opacity: addAnimation ? '0' : '1',
        marginLeft: '-1000px',
      })
      await next({
        marginLeft: '0',
      })
    },
    from: {
      opacity: '1',
      marginLeft: '0',
    },
    config: {
      duration: 1000,
    },
  })

  return (
    <animated.div
      style={{
        opacity: contentProps.opacity,
      }}
    >
      {/*{items.length > 0 && (*/}
      {/*  <TaskCard*/}
      {/*    text={text}*/}
      {/*    id={id}*/}
      {/*    checked={checked}*/}
      {/*  />*/}
      {/*)}*/}
      someCard
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
  )
}
