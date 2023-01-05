import React, {useState} from 'react';

// Components
import Footer from './components/Footer';
import Header from './components/Header';
import Form from './components/Form';
import List from './components/List';
import Modal from './components/Modal';

// CSS
import styles from './App.module.css'

// Interface
import {ITask} from './interfaces/Task'

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [editTask, setEditTask] = useState<ITask | null>(null)

  // DELETAR TAREFA
  const deleteTask = (id: number) =>{
    let newTaskList

    newTaskList = taskList.filter((task) =>{
      return task.id !== id
    })

    setTaskList(newTaskList)
  }

  // EXIBIR OU FECHAR MODAL
  const hideOrShowModal = (value: boolean) =>{
    const modal = document.querySelector("#modal")

    if(value){
      modal?.classList.remove("hide")
    }else{
      modal?.classList.add("hide")
    }
  }

  // Preparar o modal para a edição
  const handleEdit = (TaskEdit: ITask) => {
    hideOrShowModal(true)
    setEditTask(TaskEdit)
  }

  // Editando a tarefa
  const edited = (id:number, title:string, difficulty:number) => {
    const editedTask: ITask = {id, title, difficulty}
    const newTasks = taskList.map((task) => {
      return task.id === editedTask.id ? editedTask : task
    })
    setTaskList(newTasks)
    hideOrShowModal(false)
  }

  return (
    <div className="App">
      <Modal children={<Form btnText='Alterar tarefa' taskList={taskList} editTask={editTask} edited={edited}/>}/>

      <Header/>


      <main className={styles.main}>
            
          <div>
            <h2>O que você vai fazer?</h2>
            <Form btnText='Criar Tarefa' taskList={taskList} setTaskList={setTaskList}/>
          </div>

          <div>
            <h2>Sua tarefas:</h2>
            <List taskList={taskList} deleteTask={deleteTask} hideOrShowModal={hideOrShowModal} handleEdit={handleEdit}/>
          </div>
      </main>

      <Footer/>

    </div>
  );
}

export default App;
