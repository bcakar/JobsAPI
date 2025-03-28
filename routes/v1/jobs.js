const router = require('express').Router();

const {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob,
} = require('../../controllers/v1/jobs');

router.get('/', getAllJobs);
router.post('/', createJob);

router.get('/:id', getJob);
router.patch('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;
