const router = require('express').Router();
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const path = require('path');

const swaggerFilePath = path.join(__dirname, '../swagger.yaml');

const swaggerDocument = YAML.load(swaggerFilePath);
router.get('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = router;
