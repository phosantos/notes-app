import React from 'react';
import Note from './Note';
import NoteEditor from './NoteEditor';
import { ReactComponent as New } from '../Assets/plus.svg';
import styles from './Notes.module.css';

const Notes = () => {
  const [noteEditor, setNoteEditor] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const [selectedNoteID, setSelectedNoteID] = React.useState(0);

  React.useEffect(() => {
    setNotes(() => {
      const localNotes = JSON.parse(window.localStorage.getItem('notes'));
      return localNotes ? localNotes : [];
    });
  }, [noteEditor]);

  if (noteEditor)
    return (
      <NoteEditor
        notes={notes}
        setNotes={setNotes}
        setNoteEditor={setNoteEditor}
        selectedNoteID={selectedNoteID}
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
              setSelectedNoteID(null);
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
                  setSelectedNoteID={setSelectedNoteID}
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
