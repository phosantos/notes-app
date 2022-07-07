import React from 'react';

const Note = ({ setCreator, notes, setNotes }) => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [note, setNote] = React.useState();

  function handleClose() {
    if (note) {
      setNotes((notes) => [...notes, note]);
      setCreator(false);
    } else {
      if (window.confirm('Você está saindo sem salvar, dejesa continuar?')) {
        setCreator(false);
      }
    }
  }

  function saveNote() {
    setNote({
      id: notes.length + 1,
      title,
      content,
    });
  }

  return (
    <section>
      <div>
        <div onClick={handleClose}>Close</div>
        <h1>{title ? title : 'Untitled'}</h1>
        <div onClick={saveNote}>Save</div>
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

export default Note;
