const express = require('express');
const router = express.Router();
const Student = require('../models/list');

router.get('/', async (req, res) => {
  const list = await Student.find();
  res.json(list);
});

router.post('/', async (req, res) => {
  const { studentlist, courselist, gradelist } = req.body;
  const list = new Student({ studentlist, courselist, gradelist });
  await list.save();
  res.json({ status: 'List Saved' })
});

router.get('/:id', async (req, res) => {
  const list = await Student.findById(req.params.id);
  res.json(list);
});

router.put('/:id', async (req, res) => {
  const { studentlist, courselist, gradelist } = req.body;
  const newStudent = {
    studentlist,
    courselist,
    gradelist
  };
  await Student.findByIdAndUpdate(req.params.id, newStudent);
  res.json({ status: 'List Updated' });
});

router.delete('/:id', async (req, res) => {
  await Student.findByIdAndRemove(req.params.id);
  res.json({ status: 'List Deleted' });
})

module.exports = router;