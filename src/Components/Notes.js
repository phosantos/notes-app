import React from 'react';
import Note from './Note';
import NoteCreator from './NoteCreator';
import NoteEditor from './NoteEditor';

const Notes = () => {
  const [creator, setCreator] = React.useState(false);
  const [editor, setEditor] = React.useState(false);
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

  if (creator)
    return (
      <NoteCreator setCreator={setCreator} notes={notes} setNotes={setNotes} />
    );
  if (editor)
    return (
      <NoteEditor
        setEditor={setEditor}
        notes={notes}
        setNotes={setNotes}
        noteID={noteID}
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
                setEditor={setEditor}
              />
            ))
          ) : (
            <p>Create your first note</p>
          )}
          <div onClick={() => setCreator(true)}>New</div>
        </section>
      </>
    );
};

export default Notes;
