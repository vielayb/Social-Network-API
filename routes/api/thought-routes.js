const router = require('express').Router();
const { getAllThought,
        getThoughtById,
        addThought,
        deleteThought,
        addReaction,
        removeReaction
      } = require('../../controllers/thought-controller');


// /api/thoughts/<userId>
router.route('/:userId').post(addThought);
// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllThought)
  .post(addThought);


// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getThoughtById)
  // .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/<userId>/<thoughtId>
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);
module.exports = router;