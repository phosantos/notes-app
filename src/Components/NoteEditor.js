import React from 'react';
import { ReactComponent as Close } from '../Assets/return.svg';
import { ReactComponent as Save } from '../Assets/check.svg';
import styles from './NoteEditor.module.css';

const NoteEditor = ({ notes, setNotes, noteID, setNoteEditor }) => {
  const [note, setNote] = React.useState(
    noteID ? notes.filter((note) => note.id === noteID)[0] : null,
  );
  const [title, setTitle] = React.useState(note ? note.title : '');
  const [content, setContent] = React.useState(note ? note.content : '');
  const [saveStatus, setSaveStatus] = React.useState(false);
  const textarea = React.useRef();

  //data
  //deletar nota
  // deletar todas as notas
  //escolher cor
  //formatar inputs

  React.useEffect(() => {
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  }, [note]);

  // function getLastUpdateDate() {
  //   const d = new Date();
  //   return d.toLocaleString('en-us', {
  //     dateStyle: 'medium',
  //     timeStyle: 'short',
  //   });
  // }

  function onSaveNote() {
    setNote({
      id: noteID ? noteID : notes.length + 1,
      lastUpdate: new Date().toString(),
      title,
      content,
    });
    setSaveStatus(true);
  }

  function storeNote() {
    if (noteID) {
      setNotes((notes) => [
        ...notes.filter((note) => note.id !== noteID),
        note,
      ]);
    } else {
      setNotes((notes) => [...notes, note]);
    }
    window.localStorage.setItem('notes', JSON.stringify(notes));
  }

  function onCloseNote() {
    if (content) {
      if (saveStatus) {
        storeNote();
        setNoteEditor(false);
      } else {
        if (window.confirm('Close without saving?')) setNoteEditor(false);
      }
    } else {
      setNoteEditor(false);
    }
  }

  function autosize({ target }) {
    target.style.height = target.scrollHeight + 'px';
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
        <div className="btn" onClick={onSaveNote}>
          <Save />
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
          value={content}
          onChange={({ target }) => setContent(target.value)}
          onKeyDown={autosize}
          onKeyUp={autosize}
          ref={textarea}
        ></textarea>
      </section>
    </>
  );
};

export default NoteEditor;
