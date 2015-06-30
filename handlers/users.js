module.exports = {
  'index': function (req, res) { res.send('This is the users.index handler'); },
  'new': function (req, res) { res.send('This is the users.new handler'); },
  'create': function (req, res) { res.send('This is the users.create handler'); },
  'show': function (req, res) { res.send('This is the users.show handler'); },
  'edit': function (req, res) { res.send('This is the users.edit handler'); },
  'update': function (req, res) { res.send('This is the users.update handler'); },
  'destroy': function (req, res) { res.send('This is the users.destroy handler'); }
};