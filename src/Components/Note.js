import React from 'react';
import styles from './Note.module.css';

const Note = ({ note, setNoteEditor, setNoteID }) => {
  function selectNote(e) {
    setNoteID(Number(e.currentTarget.dataset.id));
    setNoteEditor(true);
  }

  function deleteNote() {}

  return (
    <div className={styles.note} data-id={note.id} onClick={selectNote}>
      <h2 className={styles.title}>
        {note.title.length > 20
          ? note.title.substring(0, 20) + '...'
          : note.title}
      </h2>
      <span className={styles.lastUpdateDate}>
        {new Date(note.lastUpdate).toLocaleString('en-us', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })}
      </span>
      <p className={styles.body}>
        {note.content.length > 100
          ? note.content.substring(0, 100) + '...'
          : note.content}
      </p>
    </div>
  );
};

export default Note;
