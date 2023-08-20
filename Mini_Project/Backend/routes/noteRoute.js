const express = require("express");
const { NoteModel } = require("../model/noteModel");
const { auth } = require("../middlewares/auth.middleware");

const noteRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API routes related to Notes
 */

/**
 * @swagger
 * path:
 *  /notes/create:
 *    post:
 *      summary: Create a new note
 *      tags: [Notes]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                content:
 *                  type: string
 *      responses:
 *        200:
 *          description: A new note has been created
 */

/**
 * @swagger
 * path:
 *  /notes:
 *    get:
 *      summary: Get all notes for the authenticated user
 *      tags: [Notes]
 *      responses:
 *        200:
 *          description: List of notes
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Note'
 *        500:
 *          description: Internal server error
 */

/**
 * @swagger
 * path:
 *  /notes/update/{noteID}:
 *    patch:
 *      summary: Update a note by noteID
 *      tags: [Notes]
 *      parameters:
 *        - name: noteID
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NoteUpdate'
 *      responses:
 *        200:
 *          description: Note updated successfully
 */

/**
 * @swagger
 * path:
 *  /notes/delete/{noteID}:
 *    delete:
 *      summary: Delete a note by noteID
 *      tags: [Notes]
 *      parameters:
 *        - name: noteID
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Note deleted successfully
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the note
 *         title:
 *           type: string
 *           description: The title of the note
 *         content:
 *           type: string
 *           description: The content of the note
 *         userId:
 *           type: string
 *           description: The user ID associated with the note
 *     NoteUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The updated title of the note
 *         content:
 *           type: string
 *           description: The updated content of the note
 *       required:
 *         - title
 *         - content
 */




//add notes

noteRouter.post("/create", auth, async (req, res) => {
  try {
    note = await NoteModel(req.body);
    await note.save();
    return res.status(200).send({ msg: "A new note has been created." });
  } catch (error) {
    res.send({ err: error });
  }
});


//get notes
noteRouter.get("/", auth, async (req, res) => {
  try {
    const notes = await NoteModel.find({ userId: req.body.userId });
    return res.status(200).send(notes);
  } catch (error) {
    res.send({ err: err });
  }
});



//update note with the help of noteID
noteRouter.patch("/update/:noteID", auth, async (req, res) => {
  const { noteID } = req.params;
  note = await NoteModel.findOne({ _id: noteID });
  console.log(note);

  console.log(req.body.userId);
  console.log(note.userId);
  try {
    if (req.body.userId !== note.userId) {
      return res.send({ msg: "You are not authorized!!!!!!!" });
    } else {
      note = await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body);
      return res
        .status(200)
        .send(`Note with noteID ${noteID} has been updated.`);
    }
  } catch (error) {
    res.send({ err: error });
  }
});

//delete note
noteRouter.delete("/delete/:noteID", auth, async (req, res) => {
  const { noteID } = req.params;
  note = await NoteModel.findOne({ _id: noteID });
  try {
    if (req.body.userId !== note.userId) {
      return res.send({ msg: "You are not authorized!!!!!!!" });
    } else {
      note = await NoteModel.findByIdAndDelete({ _id: noteID });

      return res
        .status(200)
        .send(`Note with noteID ${noteID} has been deleted.`);
    }
  } catch (error) {
    res.send({ err: err });
  }
});

module.exports = {
  noteRouter,
};
