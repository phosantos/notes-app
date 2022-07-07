import React from 'react';

const Note = ({ note, setEditor, setNoteID }) => {
  function handleClick(e) {
    setNoteID(e.currentTarget.dataset.id);
    setEditor(true);
  }

  return (
    <div data-id={note.id} onClick={handleClick}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  );
};

export default Note;
