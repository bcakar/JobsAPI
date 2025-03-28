const router = require('');
const yamljs = require('yamljs');
const swaggerUI = require('swagger-ui-express');

const swaggerDocument = yamljs.load('../swagger.yaml');
router.get('/', swaggerUI.server, swaggerUI.setup(swaggerDocument));
module.exports = router;
