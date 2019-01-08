const handleSingIn = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("wrong credentials");
  }
  db("login")
    .where({ email })
    .then(storedHash => {
      bcrypt.compare(password, storedHash[0].hash).then(result => {
        result
          ? db("users")
              .where({ email })
              .then(users => res.json(users[0]))
              .catch(err => res.status(400).json("unable to login"))
          : res.status(400).json("unable to login");
      });
    })
    .catch(err => res.status(400).json("unable to login"));
};

module.exports = {
  handleSingIn
};
