import { Check, Trash } from 'phosphor-react';
import styles from './Task.module.css';

interface TaskProps {
  id: string;
  text: string;
  isCompleted: boolean;
  onCheck: (id: string) => void;
  onDelete: (id: string) => void;
}

export function Task({id, text, isCompleted, onCheck, onDelete}: TaskProps) {
  return(
    <div className={styles.container}>
      <button 
        onClick={() => onCheck(id)}
        className={ isCompleted ? styles.btnCompleted : styles.btnUncompleted }
      >
        { isCompleted ? <Check /> : ''}
      </button>
      <p className={ isCompleted ? styles.textCompleted : styles.textUncompleted }>{text}</p>
      <button 
        onClick={() => onDelete(id)}
        className={styles.btnDelete}
      >
        <Trash size={24} />
      </button>
    </div>
  );
}