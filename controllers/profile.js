const handleGetProfile = db => (req, res) => {
  const { id } = req.params;
  db("users")
    .where({ id })
    .then(users =>
      users.length ? res.json(users[0]) : res.json("no such user")
    )
    .catch(err => res.json("error getting user"));
};

module.exports = {
  handleGetProfile
};
