import React from 'react';

const NoteEditor = ({ notes, setNotes, noteID, setNoteEditor }) => {
  const [note, setNote] = React.useState(
    noteID ? notes.filter((note) => note.id === noteID)[0] : null,
  );
  const [title, setTitle] = React.useState(note ? note.title : '');
  const [content, setContent] = React.useState(note ? note.content : '');
  const [saveStatus, setSaveStatus] = React.useState(false);

  function onSaveNote() {
    setNote({
      id: noteID ? noteID : notes.length + 1,
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
    if (saveStatus) {
      storeNote();
      setNoteEditor(false);
    } else {
      if (window.confirm('Close without save?')) setNoteEditor(false);
    }
  }

  return (
    <section>
      <div>
        <div onClick={onCloseNote}>Close</div>
        <h1>{title ? title : 'Untitled'}</h1>
        <div onClick={onSaveNote}>Save</div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Untitled"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <textarea
          name=""
          id=""
          placeholder="Content"
          value={content}
          onChange={({ target }) => setContent(target.value)}
        ></textarea>
      </div>
    </section>
  );
};

export default NoteEditor;
