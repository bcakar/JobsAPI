const Job = require('../../models/Job');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../../errors');

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort(
        'createdAt'
    );
    res.status(StatusCodes.OK).json(jobs);
};

const getJob = async (req, res) => {
    const job = await Job.findOne({
        _id: req.params.id,
        createdBy: req.user.userId,
    });

    if (!job) {
        throw new NotFoundError('Job is not found');
    }

    res.status(StatusCodes.OK).json(job);
};

const createJob = async (req, res) => {
    const jobProps = { ...req.body, createdBy: req.user.userId };
    const job = await Job.create(jobProps);
    res.status(StatusCodes.OK).json(job);
};

const updateJob = async (req, res) => {
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId },
    } = req;

    if (!company && !position) {
        throw new BadRequestError('Provide company or position');
    }

    const job = await Job.findOneAndUpdate(
        {
            _id: req.params.id,
            createdBy: userId,
        },
        req.body,
        { new: true, runValidators: true }
    );

    if (!job) {
        throw new NotFoundError(`Job is not found for id ${jobId} `);
    }

    res.status(StatusCodes.OK).json(job);
};

const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = req;

    const job = await Job.findOneAndDelete(
        {
            _id: req.params.id,
            createdBy: userId,
        },
        req.body,
        { new: true, runValidators: true }
    );

    if (!job) {
        throw new NotFoundError(`Job is not found for id ${jobId} `);
    }

    res.status(StatusCodes.OK).send();
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};
