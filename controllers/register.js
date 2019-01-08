const handleRegister = (db, bcrypt) => (req, res) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;
  if (!name || !email || !password) {
    return res.status(400).json("wrong credantials");
  }
  bcrypt
    .hash(password, saltRounds)
    .then(hash => {
      db.transaction(trx => {
        return trx
          .insert({
            email: email,
            hash: hash
          })
          .into("login")
          .returning("email")
          .then(loginEmail => {
            return trx
              .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
              })
              .into("users")
              .returning("*")
              .then(users => res.status(201).json(users[0]))
              .catch(err => res.status(400).json("unable to create new user"));
          })
          .catch(err => res.status(400).json("unable to create new user"));
      })
        .then(trx => trx.commit)
        .catch(trx => trx.rollback);
    })
    .catch(err => res.status(400).json("unable to accept password"));
};

module.exports = {
  handleRegister: handleRegister
};
