const express = require("express");
const router = express.Router(); //Helps handle our routing
const exerciseController = require('../controllers/exerciseController')
const { ensureAuth, ensureGuest } = require("../middleware/auth"); //makes sure logged in



router.get('/remind', exerciseController.getExercise)
router.get('/posts', ensureAuth, exerciseController.getPost)
router.get('/add-video', ensureAuth, exerciseController.addVideo)
router.post('/add-video',ensureAuth, exerciseController.addVideoOnPost)
router.put('/markFavorite',ensureAuth, exerciseController.markFavorite)

router.put('/markComplete',ensureAuth, exerciseController.markComplete)

router.get('/exercises', ensureAuth, exerciseController.exercisesPage)
router.get('/exercises/favorites',ensureAuth, exerciseController.favoritesPage)
router.get('/exercises/completed',ensureAuth, exerciseController.completedPage)
router.get('/exercises/new',ensureAuth, exerciseController.addExercisePage)
router.get('/exercises/:id',ensureAuth, exerciseController.exerciseDetails)


module.exports = router
