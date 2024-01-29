const express = require('express')
const router = express.Router()

const {getBeers, getBeer, addBeer, deleteBeer, editBeer} = require('../controllers/cervezas')
const { validateJWT } = require('../middlewares/validate-jwt')
const { validateFields } = require('../helpers/validate-fields')

router.get('/', getBeers)
router.get('/:id',[
    validateJWT,
    validateFields
], getBeer)
router.post('/', [
    validateJWT,
    validateFields
],
addBeer)
router.delete('/:id', deleteBeer)
router.put('/:id', editBeer)

module.exports = router