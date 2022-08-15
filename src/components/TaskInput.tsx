import { PlusCircle } from 'phosphor-react';
import { FormEvent, useRef, useState } from 'react';
import styles from './TaskInput.module.css';

interface TaskInputProps {
  onTaskSubmit: (task: string) => void;
}

export function TaskInput({onTaskSubmit}: TaskInputProps) {
  const taskRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onTaskSubmit(String(taskRef.current?.value));
  }

  return(
    <form 
      className={styles.form} 
      onSubmit={handleSubmit}>
      <input 
        ref={taskRef}
        required 
        placeholder="Adicione uma nova tarefa"
        type="text" 
      />
      <button type="submit">Criar <PlusCircle size={18}/></button>
    </form>
  );
}