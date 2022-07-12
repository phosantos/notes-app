import React from 'react';
import Note from './Note';
import NoteEditor from './NoteEditor';
import { ReactComponent as New } from '../Assets/plus.svg';
import styles from './Notes.module.css';

const Notes = () => {
  const [notes, setNotes] = React.useState(() => {
    const localNotes = JSON.parse(window.localStorage.getItem('notes'));
    return localNotes ? localNotes : [];
  });
  const [noteEditor, setNoteEditor] = React.useState(false);
  const [noteID, setNoteID] = React.useState();

  React.useEffect(() => {
    if (notes.length > 0) {
      window.localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  if (noteEditor)
    return (
      <NoteEditor
        notes={notes}
        setNotes={setNotes}
        noteID={noteID}
        setNoteEditor={setNoteEditor}
      />
    );
  else
    return (
      <>
        <header className="header">
          <h1 className={styles.title}>Notes</h1>
          <div
            className="btn"
            onClick={() => {
              setNoteEditor(true);
              setNoteID(0);
            }}
          >
            <New />
            New note
          </div>
        </header>
        <section className={styles.notes}>
          {notes.length > 0 ? (
            notes
              .sort((a, b) => {
                const dateA = new Date(a.lastUpdate);
                const dateB = new Date(b.lastUpdate);
                if (dateA < dateB) return 1;
                else return -1;
              })
              .map((note) => (
                <Note
                  key={note.id}
                  note={note}
                  setNoteID={setNoteID}
                  setNoteEditor={setNoteEditor}
                />
              ))
          ) : (
            <p className={styles.firstNote}>Create your first note</p>
          )}
        </section>
      </>
    );
};

export default Notes;
