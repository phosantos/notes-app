import React from 'react';

const Note = ({ note, setNoteEditor, setNoteID }) => {
  function handleClick(e) {
    setNoteID(Number(e.currentTarget.dataset.id));
    setNoteEditor(true);
  }

  return (
    <div data-id={note.id} onClick={handleClick}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  );
};

export default Note;
