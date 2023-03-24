module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getAbout: (req, res) => {
    res.render("about.ejs");
  },
  get7531: (req, res) => {
    res.render("7531.ejs");
  },
};

