const express = require('express')
const router = express.Router()
const {reqGet,reqPost,reqPut, reqDelete} = require('../controllers/allmethods')


router.get('/', reqGet)


router.post('/', reqPost)

router.put('/', reqPut)

router.delete('/', reqDelete)


module.exports = router