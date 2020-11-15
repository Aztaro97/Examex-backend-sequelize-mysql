const express = require('express');
const { where } = require('sequelize');
const router = express.Router();
const models = require('../models')

router.get('/all-level', (req, res) => {
    models.Level.findAll()
    .then((levelData) => {
        res.status(200).json(levelData)
    })
    .catch((err) => console.log(err))
})

// GET ALL SERIE
router.get('/all-serie', (req, res) => {
    models.Serie.findAll({
        include:[{model: models.Level}]
    })
    .then((SerieData)=> {
        res.status(200).json(SerieData)
    })
    .catch((err) => console.log(err))
})


//  Obtenir tous les matieres de Serie Bac A
router.get('/all-matiere', (req, res) => {
    models.Matiere.findAll({
      include: [
          {model: models.Serie,
            where: {
              name: 'bac A'
            }
        }
          
        ]
    })
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => console.log(err))
  })


module.exports = router;