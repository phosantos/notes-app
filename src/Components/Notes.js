import React from 'react';
import Note from './Note';
import NoteEditor from './NoteEditor';

const Notes = () => {
  const [noteEditor, setNoteEditor] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const [noteID, setNoteID] = React.useState();

  React.useEffect(() => {
    if (window.localStorage.getItem('notes')) {
      setNotes(JSON.parse(window.localStorage.getItem('notes')));
    }
  }, []);

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
        <header>
          <h1>Notes</h1>
          <input type="text" placeholder="find your notes" />
        </header>
        <section>
          {notes ? (
            notes.map((note) => (
              <Note
                key={note.id}
                note={note}
                setNoteID={setNoteID}
                setNoteEditor={setNoteEditor}
              />
            ))
          ) : (
            <p>Create your first note</p>
          )}
          <div
            onClick={() => {
              setNoteEditor(true);
              setNoteID(0);
            }}
          >
            New
          </div>
        </section>
      </>
    );
};

export default Notes;
