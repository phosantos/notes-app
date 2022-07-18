export function createNote(newNote) {
  const notes = JSON.parse(window.localStorage.getItem('notes'));
  if (notes) {
    notes.push(newNote);
    window.localStorage.setItem('notes', JSON.stringify(notes));
  } else window.localStorage.setItem('notes', JSON.stringify([newNote]));
}

export function updateNote(updatedNote) {
  const notes = JSON.parse(window.localStorage.getItem('notes'));
  const newNotes = notes.filter((note) => note.id !== updatedNote.id);
  newNotes.push(updatedNote);
  window.localStorage.setItem('notes', JSON.stringify(newNotes));
}

export function deleteNote(deletedNoteID) {
  const notes = JSON.parse(window.localStorage.getItem('notes'));
  const newNotes = notes.filter((note) => note.id !== deletedNoteID);
  window.localStorage.setItem('notes', JSON.stringify(newNotes));
}

export function setNewNoteID() {
  const notes = JSON.parse(window.localStorage.getItem('notes'));
  if (notes && notes.length) {
    return (
      notes.map((note) => note.id).sort((a, b) => (a.id < b.id ? 1 : -1))[0] + 1
    );
  } else {
    return 1;
  }
}
