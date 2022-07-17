import React from 'react';
import styles from './Note.module.css';

const Note = ({ note, setNoteEditor, setSelectedNoteID }) => {
  function selectNote(e) {
    setSelectedNoteID(Number(e.currentTarget.dataset.id));
    setNoteEditor(true);
  }

  return (
    <div className={styles.note} data-id={note.id} onClick={selectNote}>
      <h2 className={styles.title}>
        {note.title.length > 17
          ? note.title.substring(0, 17) + '...'
          : note.title}
      </h2>
      <span className={styles.lastUpdateDate}>
        {new Date(note.lastUpdate).toLocaleString('en-us', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })}
      </span>
      <p className={styles.body}>
        {note.body.length > 100
          ? note.body.substring(0, 100) + '...'
          : note.body}
      </p>
    </div>
  );
};

export default Note;
