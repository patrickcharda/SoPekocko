const Sauce = require('../models/Sauce');
const fs = require('fs');
//var escapeHtml = require('escape-html');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  /*sauceObject.name = escapeHtml(sauceObject.name);
  sauceObject.description = escapeHtml(sauceObject.description);
  sauceObject.manufacturer = escapeHtml(sauceObject.manufacturer);
  sauceObject.mainPepper = escapeHtml(sauceObject.mainPepper);*/
    if (sauceObject._id) {
      delete sauceObject._id;
    }
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      /*sauce.name = escapeHtml(sauce.name);
      sauce.description = escapeHtml(sauce.description);
      sauce.manufacturer = escapeHtml(sauce.manufacturer);
      sauce.mainPepper = escapeHtml(sauce.mainPepper);*/
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  /*sauceObject.name = escapeHtml(sauceObject.name);
  sauceObject.description = escapeHtml(sauceObject.description);
  sauceObject.manufacturer = escapeHtml(sauceObject.manufacturer);
  sauceObject.mainPepper = escapeHtml(sauceObject.mainPepper);*/

  // si on cherche à modifier l'image il faut supprimer l'ancienne
  if (req.file) {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
          .then(() => res.status(201).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
  }
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(201).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      //console.log(sauces);
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};  

exports.likeSauce = (req, res, next) => {
  console.log(req.body.like);
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {

      if (req.body.like === 1) {
        let hasLiked = sauce.usersLiked.includes(req.body.userId);
        if (!hasLiked) {
          sauce.likes += 1;
          sauce.usersLiked.push(req.body.userId);
        }
      }

      if (req.body.like === 0) {

       let hasLiked = sauce.usersLiked.includes(req.body.userId);
       if (hasLiked) {
         let indexUserToRemove = sauce.usersLiked.findIndex(userId => userId==req.body.userId);
         sauce.usersLiked.splice(indexUserToRemove, 1);
         sauce.likes -= 1;
       }

       let hasDisliked = sauce.usersDisliked.includes(req.body.userId);
       if (hasDisliked) {
        let indexUserToRemove = sauce.usersDisliked.findIndex(userId => userId==req.body.userId);
        sauce.usersDisliked.splice(indexUserToRemove, 1);
        sauce.dislikes -= 1;
        }

      }

      if (req.body.like === -1) {
        let hasDisliked = sauce.usersDisliked.includes(req.body.userId);
        if (!hasDisliked) {
          sauce.dislikes += 1;
          sauce.usersDisliked.push(req.body.userId);
        }
      }

      Sauce.updateOne({ _id: req.params.id }, { 
        likes: sauce.likes,
        dislikes: sauce.dislikes,
        usersLiked: sauce.usersLiked,
        usersDisliked: sauce.usersDisliked,
        _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
