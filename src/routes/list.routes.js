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

module.exports = router;