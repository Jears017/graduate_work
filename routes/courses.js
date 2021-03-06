const { Router } = require('express')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', async (req, res) => {
    //eval(require('locus'))
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi')
        const courses = await Course.find({title:regex})
            .populate('userId', 'email name')
            .select('price title img')



        res.render('courses', {
            title: 'Лекции',
            isCourses: true,
            courses
        })
    } else {


        const courses = await Course.find()
            .populate('userId', 'email name')
            .select('price title img')



        res.render('courses', {
            title: 'Лекции',
            isCourses: true,
            courses
        })
    }
})

router.get('/:id/edit', auth, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const course = await Course.findById(req.params.id)

    res.render('course-edit', {
        title: `Редактировать ${course.title}`,
        course
    })
})

router.post('/edit', auth, async (req, res) => {
    await Course.findByIdAndUpdate(req.body.id, req.body)
    res.redirect('/courses')
})

router.post('/remove', auth, async (req, res) => {

    try {
        await Course.deleteOne({ _id: req.body.id })
        res.redirect('/courses')
    } catch (e) {
        console.log(e)
    }

})



router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id)
    res.render('course', {
        layout: 'empty',
        title: `${course.title}`,
        course
    })
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router