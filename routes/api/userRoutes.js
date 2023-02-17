const router =  require ("express").Router()
const {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user');

router.route('/')
.get(getUsers)
.post(createUser);

router.route('/:id')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router.route('/:id/friends/')
.post(addFriend)
.delete(deleteFriend)

module.exports = router