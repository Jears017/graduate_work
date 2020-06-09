const { Router } = require('express')
const auth = require('../middleware/auth')
const Test = require('../models/test')
const router = Router()

router.get('/', auth, (req, res) => {

    res.render('addTest', {
        title: 'Добавить тест',
        isAddTest: true
    })

})

router.post('/', auth, async (req, res) => {
    const course = new Test({
        name: req.body.name,
        link: req.body.link
    })

    try {
        await course.save()
        res.redirect('/tests')
    } catch (e) {
        console.log(e)
    }
})


module.exports = router