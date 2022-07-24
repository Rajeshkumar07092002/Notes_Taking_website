const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get all notes using :GET "/api/notes/fetchallnotes".login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
    }
})
// ROUTE 2: Add a new note using :GET "/api/notes/addnote".login required
router.post('/addnote', fetchUser,
    [body('title', 'title must be of 2 length').isLength({ min: 2 }),
    body('description', 'description must be of 5 length').isLength({ min: 5 }),
    ],
    async (req, res) => {
        //If there are errors return bad request and error
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("internal server error");
        }
    }

)

// ROUTE 3: Update existing note using :PUT "/api/notes/updatenote".login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be updated and update it;
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }

        //Allow updation only if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
    }
})

// ROUTE 4: Delete existing note using :DELETE "/api/notes/deletenote".login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // find the note to be delted and delete it;
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }

        //Allow deletion only if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "success": "Note has been deleted", note: note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
    }
})
module.exports = router;