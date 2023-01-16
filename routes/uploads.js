const { Router } = require('express');
const { check } = require('express-validator');
const {upload, updateImage, getImage} = require('../controllers/uploads')
const {validateFields} = require('../helpers/validate-fields')


const router = Router();


router.post( '/', upload );
router.put('/:collection/:id', [
    check('id','El id debe ser de mongo').isMongoId(),
    check('collection').isIn(['users','cervezas']),
    validateFields
], updateImage)

router.get('/:collection/:id', [
    check('id','El id debe ser de mongo').isMongoId(),
    check('collection').isIn(['users','cervezas']),
    validateFields
], getImage)




module.exports = router;