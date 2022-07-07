import React from 'react';

const NoteEditor = ({ notes, setNotes, noteID, setEditor }) => {
  const [note, setNote] = React.useState(
    notes.filter((note) => note.id === Number(noteID))[0],
  );
  const [title, setTitle] = React.useState(note.title);
  const [content, setContent] = React.useState(note.content);

  function handleClose() {
    if (note) {
      setNotes((notes) => [
        ...notes.filter((note) => note.id !== Number(noteID)),
        note,
      ]);
      setEditor(false);
    } else {
      if (window.confirm('Você está saindo sem salvar, dejesa continuar?')) {
        setEditor(false);
      }
    }
  }

  function handleSave() {
    setNote({
      id: noteID,
      title,
      content,
    });
  }

  return (
    <section>
      <div>
        <div onClick={handleClose}>Close</div>
        <h1>{title ? title : 'Untitled'}</h1>
        <div onClick={handleSave}>Save</div>
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
