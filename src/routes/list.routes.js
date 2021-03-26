const express = require('express');
const router = express.Router();

const Student = require('../models/list');

router.get('/', async (req, res) => {
  const list = await Student.find();
  res.json(list);
});

router.post('/', async (req, res) => {
  const { studentlist, gradelist } = req.body;
  const list = new Student({ studentlist, gradelist});
  await list.save();
  res.json({ status: 'esta en data' })
});



router.get('/:id', async (req, res) => {
  const list = await Student.findById(req.params.id);
  res.json(list);
});

router.put('/:id', async (req, res) => {
  const { studentlist, gradelist } = req.body;
  const newStudent = {
    studentlist,
    gradelist
  };
  await Student.findByIdAndUpdate(req.params.id, newStudent);
  res.json({ status: 'Task Updated' });
});

router.delete('/:id', async (req, res) => {
  await Student.findByIdAndRemove(req.params.id);
  res.json({ status: 'Task Deleted' });
})

module.exports = router;