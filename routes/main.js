const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const dashboardController = require('../controllers/dashboard')
const checkinController = require("../controllers/checkin")
const exerciseController = require('../controllers/exerciseController')
const { ensureAuth, ensureGuest } = require("../middleware/auth");


//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/about", homeController.getAbout)
router.get("/7531", homeController.get7531)
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/dashboard", ensureAuth, dashboardController.getDashboard)
router.get("/checkin", checkinController.getCheckin)
router.post("/checkin/newcheckin", checkinController.addCheckin)
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
module.exports = router;
