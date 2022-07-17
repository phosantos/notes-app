import React from 'react';
import { ReactComponent as Close } from '../Assets/return.svg';
import { ReactComponent as Save } from '../Assets/check.svg';
import { ReactComponent as Delete } from '../Assets/trash.svg';
import { createNote, updateNote, deleteNote, setNewNoteID } from '../NotesAPI';
import styles from './NoteEditor.module.css';

const NoteEditor = ({ notes, setNoteEditor, selectedNoteID }) => {
  const [note, setNote] = React.useState(() => {
    const selectedNote = notes.filter((note) => note.id === selectedNoteID)[0];
    return selectedNote ? selectedNote : null;
  });
  const [title, setTitle] = React.useState(note ? note.title : '');
  const [body, setBody] = React.useState(note ? note.body : '');
  const [saveStatus, setSaveStatus] = React.useState(false);
  const bodyArea = React.useRef();

  React.useEffect(() => {
    bodyArea.current.style.height = bodyArea.current.scrollHeight + 'px';
  }, []);

  function autosize({ target }) {
    target.style.height = target.scrollHeight + 'px';
  }

  function onCloseNote() {
    if (!saveStatus && body) {
      if (window.confirm('Close without saving?')) setNoteEditor(false);
    } else {
      setNoteEditor(false);
    }
  }

  function onSaveNote() {
    if (body) {
      const newNote = {
        id: note ? note.id : setNewNoteID(),
        lastUpdate: new Date().toString(),
        title,
        body,
      };
      setNote(newNote);
      if (note) updateNote(newNote);
      else createNote(newNote);
      setSaveStatus(true);
    }
  }

  function onDeleteNote() {
    if (note) {
      if (
        window.confirm('Delete note? This note will be permanently deleted.')
      ) {
        deleteNote(note.id);
        setNoteEditor(false);
      }
    }
  }

  return (
    <>
      <header className="header">
        <div className="btn" onClick={onCloseNote}>
          <Close />
        </div>
        <h1 className={styles.title}>
          {title
            ? title.length > 23
              ? title.substring(0, 23) + '...'
              : title
            : 'Untitled'}
        </h1>
        <div className={styles.noteOptions}>
          <div className="btn" onClick={onSaveNote}>
            <Save />
          </div>
          <div className={`${styles.deleteBtn} btn`} onClick={onDeleteNote}>
            <Delete />
          </div>
        </div>
      </header>

      <section className={styles.contentEditor}>
        <input
          className={styles.titleInput}
          type="text"
          placeholder="Untitled"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <textarea
          className={styles.bodyInput}
          placeholder="Content"
          value={body}
          onChange={({ target }) => setBody(target.value)}
          onKeyDown={autosize}
          onKeyUp={autosize}
          ref={bodyArea}
        ></textarea>
      </section>
    </>
  );
};

export default NoteEditor;
