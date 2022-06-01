import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (e) => {
    e.preventDefault()
    createNote({
      content: newNote,
      important: Math.random() > 0.5,
    })
  }
  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input value={newNote} placeholder={'... a new note'} onChange={handleChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm
