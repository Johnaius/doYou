const Checkin = require('../models/Checkin');
const moment = require('moment');

module.exports = {
 
  getDashboard: async (req, res) => {
    try {
      let today = moment.utc().format('YYYY-MM-DD')
      const myCheckins = await Checkin.find({ createdById: req.user.id }).sort({ date: "desc" }).lean();
      res.render('dashboard.ejs', { checkin: myCheckins, user: req.user, moment:moment });  console.log("hi");
    } catch (err) {
      if (err) return res.status(500).send(err.toString());
    }
  },
};
