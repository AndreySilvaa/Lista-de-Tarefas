import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react'

// Interface
import { ITask } from '../interfaces/Task'

// CSS
import styles from './Form.module.css'

interface Props {
  btnText: string
  taskList: ITask[]
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
  editTask?: ITask | null
  edited?(id: number, title: string, difficulty: number): void
}

const Form = ({btnText, taskList, setTaskList, editTask, edited}: Props) => {

  const [title, setTitle] = useState<string>('')
  const [difficulty, setDifficulty] = useState<number>(0)
  const [id, setId] = useState<number>(0)

  //Função para adicionar as informações da tarefa editada no form

    useEffect(() => {
      if(editTask){
        setTitle(editTask.title)
        setDifficulty(editTask.difficulty)
        setId(editTask.id)
      }
    }, [editTask])

  // Função para adicionar tarefa
  const addTask = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    
    if(edited){
      edited(id, title, difficulty)
    }else{
      const id = Math.floor(Math.random()*1000)
      
      const newTask: ITask = {id, title, difficulty}
      
      setTaskList!([...taskList, newTask])  // Ele adiciona porém só podemos ver depois da execução da função addTask
      setTitle('')
      setDifficulty(0)
    }
  }

  // Função para pegar os input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    if(e.target.name === 'title'){
      setTitle(e.target.value)
    }else{
      if(Number.isNaN(parseInt(e.target.value))){ // Se for alguma letra
       setDifficulty(0)
      }else{ // Se não for letra
        if(parseInt(e.target.value) > 10){
          setDifficulty(9)
        }else{
          setDifficulty(parseInt(e.target.value))
        }
      }
    }
  }

  return (
    <form className={styles.form} onSubmit={addTask}>
        <div>
            <label htmlFor="title">Título:</label>
            <input type="text" name='title' placeholder='Título da tarefa' onChange={handleChange} value={title}/>
        </div>

        <div>
            <label htmlFor="difficulty">Dificuldade {'(0 - 9)'}</label>
            <input type="text" name='difficulty' placeholder='Dificuldade da tarefa' onChange={handleChange} value={difficulty}/>
        </div>

        <input type="submit" value={btnText}/>
    </form>
  )
}

export default Form