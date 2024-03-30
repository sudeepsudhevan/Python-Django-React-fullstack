import { useEffect, useState } from "react"
import api from "../api"
import Note from "../components/Note"
import "../styles/Home.css"

function Home() {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")


    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = () => {
        api.get("/api/notes/")
            .then((res) => res.data)
            .then((data) => { setNotes(data); console.log(data); })
            .catch((err) => alert(err));
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Note was deleted!")
            else alert("Failed to delete note.")
            getNotes();
        }).catch((err) => alert(err));
    }

    const createNote = (e) => {
        e.preventDefault()
        api.post("/api/notes/", { content, title }).then((res) => {
            if (res.status === 201) alert("Note created succesfully")
            else alert("Failed to make note")
            getNotes()
        }).catch((err) => alert(err))
    }

    return (
        <div>
            <div className="">
                <h2>Notes</h2>
                {
                    notes.map((note) => (
                        <Note key={note.id} note={note} onDelete={deleteNote} />
                    ))
                }

            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>

                <label htmlFor="title">Title:</label>
                <br />
                <input type="text" id="title" name="title" required
                    onChange={(e) => setTitle(e.target.value)} value={title} />

                <label htmlFor="content">Content:</label>
                <br />
                <textarea name="content" id="content" required
                    value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <br />

                <input type="submit" value="Submit" />

            </form>
        </div>
    )
}
export default Home