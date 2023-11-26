const express = require("express")
const router = express.Router()
const fetchuser = require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator');
const Note = require("../models/Note");


//ROUTE 1: Create All the Notes using GET "/api/notes/fetchallnotes". No login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).json({ Error: "Internal server error occurred" })
    }
})
//ROUTE 2: Add a New Notes using POST "/api/notes/addnotes". No login Required
router.post("/addnotes", fetchuser, [
    body('title', "Title should be more than 5 characters").isLength({ min: 5 }),
    body('description', "Description should be more than 10 character").isLength({ min: 10 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.json({ errors: result.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNotes = await note.save()
        // console.log(savedNotes)
        res.json(savedNotes)

    } catch (error) {
        console.log(error)
        res.status(500).json({ Error: "Internal server error occurred" })
    }
})

// ROUTE 3: Update the Notes using PUT "/api/notes/updatenotes/". No login Required
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //Create the newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not Found")
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set : newNote }, { new: true })
    res.json({ note })
})
// ROUTE 4: Delete the Notes using DELETE "/api/notes/updatenotes/". No login Required
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not Found")
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ "success":"The given note has been deleted",note })
})
module.exports = router