import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import clipboard from '../assets/clipboard.svg';
import logo from '../assets/logo.svg';
import { Task } from './Task';
import { TaskInput } from './TaskInput';

import styles from './TaskList.module.css';

interface TaskAttributes {
  id: string;
  text: string;
  isCompleted: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<TaskAttributes[]>([]);
  const [tasksCompleted, setTasksCompleted] = useState<number>(0);

  function handleTaskSubmit(task: string) {
    setTasks(prevState => [
      ...prevState,
      {
        id: uuidv4(),
        text: task,
        isCompleted: false
      }
    ]);
  }

  function handleTaskCheck(id: string) {
    setTasks(prevState => {
      const newState = prevState.map(task => {
        if (task.id === id) {
          if (task.isCompleted) {
            setTasksCompleted(prevState => prevState - 1);
            return {...task, isCompleted: false};
          } else {
            return {...task, isCompleted: true};
          }
        }
        return task;
      });

      return newState;
    }) 

    setTasksCompleted(prevState => prevState + 1);
  }

  function handleTaskDelete(id: string) {
    setTasks(tasks.filter(task => {
      if (task.id === id && task.isCompleted) {
        setTasksCompleted(prevState => prevState - 1);
      }
      return task.id !== id;
  }));
  }

  return(
    <>
    <header className={styles.header}>
      <img src={logo} alt="Rocket" />
      <span>to</span>
      <span>do</span>
    </header>

    <div className="wrapper">
      <TaskInput onTaskSubmit={handleTaskSubmit} />
      <div className={styles.info}>
        <p className={styles.tasksCreated}>Tarefas criadas <span>{tasks.length}</span></p>
        <p className={styles.tasksCompleted}>Concluídas 
          <span>{ tasksCompleted > 0 ? (`${tasksCompleted} de ${tasks.length}`) : ('0') }
        </span></p>
      </div>

      { tasks.length === 0 ? 
      (
        <div className={styles.noTaskInfo}>
          <div className={styles.line}></div>
          <img src={clipboard} alt="" />  
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      ) : (
       tasks.map(task => (
        <Task 
          key={task.id}
          id={task.id}
          text={task.text}
          isCompleted={task.isCompleted}
          onCheck={handleTaskCheck}
          onDelete={handleTaskDelete}
        />
      ))
      ) }
    </div>
    </>
  );
}