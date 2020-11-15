const express = require("express");
const router = express.Router();
const models = require("../../models");


//  ADD NEW LEVEL
router.post("/add-level", (req, res) => {
  models.Level.create({
    name: req.body.name
  })
  .then((response) => {
    res.status(200).json({
      message: "Level aded"
    })
  }).catch((err)=> console.log(err))
});

// ADD NEW SERIE
router.post("/add-serie/:id", (req, res) => {
  models.Level.findOne({
    where: {
      id : req.params.id
    }
  })
  .then((LevelFound) => {
    if(LevelFound) {

      models.Serie.create({
        LevelId: LevelFound.id,
        name: req.body.name
      })
      .then((response) => {
        res.status(200).json({
          message: `${req.body.name} Added`
        })
      }).catch((err)=> console.log(err))

    }
  }).catch((err)=> console.log(err))
});

//  Add Matiere
router.post('/add-matiere/:id', (req, res) => {
  models.Level.findAll({
    where: { name: req.params.id}
  })
  .then((LevelFound) => {
    if(LevelFound) {

      models.Serie.findOne({
        where: {name: req.body.bacName }
      })
      .then((SerieFound) => {
        if (SerieFound) {
          // res.status(200).json({
          //   message: SerieFound
          // })
          models.Matiere.create( {
            SerieId: SerieFound.id,
            name: req.body.name
          })
          .then((response) => {
            res.status(200).json({
              message: `${req.body.name} Added`
            })
          }).catch((err)=> console.log(err))

        }
      })
      .catch((error) => console.log(error))

    }
  })
})

router.post('/add-epreuve', (req, res) => {
  models.Level.findAll({
    where: {name: 'BAC'}
  })
  .then((LevelFound) => {
    if (LevelFound) {
      models.Serie.findOne({
        where: {name: "bac A"}
      })
      .then((SerieFound) => {
        if(SerieFound) {
          models.Matiere.findOne({
            where: {name: 'PC'}
          })
          .then((MatiereFound) => {
            if(MatiereFound) {
              // res.status(200).json(MatiereFound)
              models.Epreuve.create({
                MatiereId: MatiereFound.id,
                name: req.body.epreuvName,
                year: req.body.year
              })
              .then((result) => {
                res.status(200).json({
                  message: result
                })
              }).catch((err) => console.log(err))
            }
          }).catch((err) => console.log(err))
        }
      }).catch((err) => console.log(err))
    }

  }).catch((err) => console.log(err))
})


router.get('/',(req, res) => {
  res.render('admin/index')
} )

router.get('/addbepc', (req, res) => {
  res.render('admin/addbepc')
})

router.get('/addbac', (req, res) => {
  res.render('admin/addbac')
})

router.get('/addbts', (req, res) => {
  res.render('admin/addbts')
})

module.exports = router;
