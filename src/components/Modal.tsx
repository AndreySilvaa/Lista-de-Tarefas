import React from 'react'

// CSS 
import styles from './Modal.module.css'

interface Props {
    children: React.ReactNode
}

const Modal = ({children}: Props) => {

    const hideModal = (e: React.MouseEvent) => {
        const modal = document.querySelector("#modal")
        modal?.classList.add('hide')
    }

  return (
    <div id='modal' className='hide'>
        <div className={styles.fade} onClick={hideModal}></div>

        <div className={styles.modal}>
            <div className={styles.icon} onClick={hideModal}><i className="bi bi-x-circle"></i></div>
            <h2>Edite sua tarefa</h2>
            {children}
            
        </div>
    </div>
  )
}

export default Modal