const router = require('express').Router();
const { getAllThought, addThought, removeThought, addReaction, removeReaction } = require('../../controllers/thought-controller');


// /api/thoughts/<userId>
router.route('/:userId').post(addThought);
// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllThought)
  .post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId').put(addReaction,).delete(removeThought);
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);
module.exports = router;