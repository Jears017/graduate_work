const { Router } = require('express')
const auth = require('../middleware/auth')
const Tests = require('../models/test')
const router = Router()

router.get('/', async (req, res) => {
    const tests = await Tests.find()

    res.render('tests', {
        title: 'Тесты',
        isTest: true,
        tests
    })
})

    router.get('/:id/edit', auth, async (req, res) => {
        if (!req.query.allow) {
            return res.redirect('/')
        }

        const test = await Tests.findById(req.params.id)
        res.render('test-edit', {
            title: `Редактировать ${test.title}`,
            test
        })
    })

    router.post('/edit', auth, async (req, res) => {
        await Tests.findByIdAndUpdate(req.body.id, req.body)
        res.redirect('/tests')
    })

    router.post('/remove', auth, async (req, res) => {

        try {
            await Tests.deleteOne({ _id: req.body.id })
            res.redirect('/tests')
        } catch (e) {
            console.log(e)
        }
    
    })
   







module.exports = router