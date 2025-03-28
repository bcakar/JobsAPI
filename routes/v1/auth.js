const router = require('express').Router();

const { login, register } = require('../../controllers/v1/auth');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
