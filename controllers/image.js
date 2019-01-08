const handleImage = db => (req, res) => {
  const { id } = req.body;
  db("users")
    .where({ id })
    .increment("entries", 1)
    .returning("entries")
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json("unable to get entries"));
};

const handleImageRecognition = clafifaiApp => (req, res) => {
  const { imageUrl } = req.body;
  clafifaiApp.models
    .predict("a403429f2ddf4b49b307e318f00e528b", imageUrl)
    .then(
      response =>
        response.status.description === "Ok" && res.status(200).json(response)
    )
    .catch(err => {
      res.status(400).json("unable to make clarifai api request");
    });
};

module.exports = {
  handleImage,
  handleImageRecognition
};
