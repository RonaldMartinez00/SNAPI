const router =  require ("express").Router()

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction

} = require('../../controllers/thought');

router.route('/').get(getThoughts)

router.route('/:userID/').post(createThought);

router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);


router
  .route('/:thoughtId/reaction')
  .put(addReaction);

router
  .route('/:thoughtId/reaction/:reactionId')
  .delete(deleteReaction);

module.exports = router