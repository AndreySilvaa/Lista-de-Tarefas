import React from 'react'

// CSS
import styles from './List.module.css'

// Interface
import {ITask} from '../interfaces/Task'

interface Props{
  taskList: ITask[]
  deleteTask(id: number): void
  hideOrShowModal(value: boolean): void
  handleEdit(TaskEdit: ITask): void
}

const List = ({taskList, deleteTask, hideOrShowModal, handleEdit}: Props) => {
  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((task) => (
          <div key={task.id} className={styles.task}>
            <div className={styles.details}>
              <h4>{task.title}</h4>
              <p>Dificuldade: {task.difficulty}</p>
            </div>

            <div className={styles.actions}>
              <i className='bi bi-pencil' onClick={() => handleEdit(task)}></i>
              <i className='bi bi-trash' onClick={() => deleteTask(task.id)}></i>
            </div>
          </div>
        ))
      ) : (
        <p>Não há tarefas</p>
      )}
    </>
  )
}

export default List