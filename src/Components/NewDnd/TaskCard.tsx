import { Checkbox, Input } from 'antd'
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import React, { useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import './style/card.module.css'
import {
  changeCheck,
  deleteItemOfTask,
  editTask,
  getAll,
} from '../../store/thunks'
import { deleteDelay } from '../../utils/contants'

interface TaskPropType {
  id: string
  text: string
  checked?: boolean
  deleteItem?: any
}

export const TaskCard = ({ text, id, checked, deleteItem }: TaskPropType) => {
  let newText: string = ''
  const [editMode, setEditMode] = useState(false)
  const dispatch = useAppDispatch()

  const deleteTask = (id: string) => {
    setTimeout(() => {
      dispatch(deleteItemOfTask(id))
      dispatch(getAll())
    }, deleteDelay)
  }
  const onClickDelete = useCallback(
    (id: string) => {
      if (deleteItem) {
        deleteItem(id)
      }
    },
    [deleteItem]
  )
  const changeEdit = (event: any) => {
    newText = event.target.value
  }
  const saveEdit = (id: string, defaultValue?: string) => {
    const editedText: any = newText || defaultValue
    dispatch(editTask(id, editedText))
  }
  const changeCheckbox = (id: string) => {
    dispatch(changeCheck(id))
  }

  const onKeyDownInput = (event: any, id: string, text: string) => {
    if (event.key === 'Enter') {
      saveEdit(id, text)
      setEditMode(false)
    }
  }

  return (
    <div
      style={{
        display: 'contents',
      }}
    >
      {!editMode && (
        <Checkbox checked={checked} onChange={() => changeCheckbox(id)} />
      )}
      {!editMode && (
        <span style={{ textTransform: 'initial' }} className="text">
          {' '}
          {text}{' '}
        </span>
      )}
      {editMode && (
        <>
          <Input
            className="area-style"
            size="small"
            style={{ width: '80%' }}
            defaultValue={text}
            onChange={(e) => changeEdit(e)}
            onKeyDown={(e) => onKeyDownInput(e, id, text)}
            maxLength={35}
          />
          <CheckOutlined
            onClick={() => {
              saveEdit(id, text)
              setEditMode(false)
            }}
          />
        </>
      )}
      <div
        className="container-icons"
        style={{
          fontSize: '22px',
        }}
      >
        {!editMode && (
          <EditOutlined
            onClick={() => {
              setEditMode(true)
              newText = text
            }}
          />
        )}
        <DeleteOutlined
          onClick={() => {
            onClickDelete(id)
            deleteTask(id)
          }}
        />
      </div>
    </div>
  )
}
