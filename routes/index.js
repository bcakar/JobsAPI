const router = require('express').Router();

const v1AuthRoutes = require('./v1/auth');
const v1JobsRoutes = require('./v1/jobs');

const authMiddleware = require('../middleware/authentication');

router.use('/api/v1/auth', v1AuthRoutes);
router.use('/api/v1/jobs', authMiddleware, v1JobsRoutes);

module.exports = router;
