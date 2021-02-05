const mongoose = require('mongoose');
const Entry = require('../models/entry.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const entry = new Entry(req.body);
  entry.user = req.user._id;

  entry.save()
  .then((newEntry) => {
    res.json(newEntry);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.entry, req.body);

  req.entry.save()
  .then((updatedEntry) => {
    res.json(updatedEntry);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.entry);
}

function list(req, res, next) {
  let where = {};
  if (req.user.role === ROLES.USER) {
    where = { user: req.user._id };
  }

  Entry.find(where)
  .populate('user')
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.entry.remove(() => {
    res.json(req.entry);
  })
  .catch(next);
}

function weeklyReport(req, res) {
  let where = {};
  if (req.user.role === ROLES.USER) {
    where = { user: new mongoose.Types.ObjectId(req.user._id) };
  }

  Entry.aggregate([
    {
      $match: where,
    },
    {
      $group: {
        _id: { year: { $year: '$date' }, week: { $week: '$date' } },
        totalDistance: { $sum: '$distance' },
        totalDuration: { $sum: '$duration' },
        count: { $sum: 1 },
      },
    },
  ]).exec((err, reports) => {
    if (err) {
      return res.status(422).send({
        message: err.message,
      });
    }

    return res.json(reports);
  });
}

function getEntryByID(req, res, next, id) {
  Entry.findById(id)
  .then((entry) => {
    if (!entry) {
      res.status(404).json({ message: 'Entry not found' });
      return;
    }

    if (entry.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
      res.status(403).json({ message: 'You are not authorized to access this entry' });
      return;
    }

    req.entry = entry;
    next();
  })
  .catch(next);
}

module.exports = {
  create,
  update,
  read,
  list,
  remove,
  weeklyReport,
  getEntryByID,
};
