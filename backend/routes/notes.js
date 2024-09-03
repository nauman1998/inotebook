const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')
const multer = require('multer');
const path = require('path');

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Upload folder path
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));  // Unique file name
    }
});
// Initialize multer with storage engine
const upload = multer({ storage: storage });



//ROUTE 1: Get logedin User Notes using: Get "/api/notes/fetchallnotes" . require login

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server error occured')
    }


})

//ROUTE 2: Add a new Notes using: POST "/api/notes/addnote" . require login

router.post('/addnote', fetchuser, upload.array('images', 10), [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),

],
    async (req, res) => {

        try {

            const { title, description, tag } = req.body
            // Handling errors related above email name password types and length  return bad request 

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // Get image file paths from multer
            const images = req.files.map(file => file.path);
            const note = new Notes({
                title, description, tag, user: req.user.id, images
            })
            const savenote = await note.save()
            res.json(savenote)

            // you can also use this  code 
            // const savenote = await Notes.create({
            //     title,
            //     description,
            //     tag,
            //     user: req.user.id
            // });
            // res.json(savenote)

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Internal server error occured')
        }
    })
//ROUTE 3: Update Notes with images using: PUT "/api/notes/updatenote" . require login
router.put('/updatenote/:id', fetchuser, upload.array('images', 10),
    async (req, res) => {
        const { title, description, tag } = req.body
        try {
            // create new note object
            const newNote = {}
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }
            // Get image file paths from multer if new images are uploaded
            if (req.files) {
                newNote.images = req.files.map(file => file.path);
            }
            // find the note to be updated and update it
            let note = await Notes.findById(req.params.id)
            if (!note) {
                return res.status(404).send('Not Found')
            }
            if (note.user.toString() !== req.user.id) {

                return res.status(401).send("Not Allowed")
            }
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

            res.json(note)
        } catch (error) {
            console.error(error.message)
            res.status(500).send('Internal server error occured')
        }


    })

//ROUTE 4: Delete Notes using: DELETE "/api/notes/deletenote" . require login
router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {

        try {
            // find the note to be deleted and deleted it
            let note = await Notes.findById(req.params.id)
            if (!note) {
                return res.status(404).send('Not Found')
            }
            // Allow deletion if user owns this note
            if (note.user.toString() !== req.user.id) {

                return res.status(401).send("Not Allowed")
            }
            note = await Notes.findByIdAndDelete(req.params.id)

            res.json({ "Success": "Note has been deleted" })
        } catch (error) {
            console.error(error.message)
            res.status(500).send('Internal server error occured')
        }


    })


module.exports = router