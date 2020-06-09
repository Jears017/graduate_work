const { Router } = require('express')
const auth = require('../middleware/auth')
const Course = require('../models/course')
const router = Router()


function mapCartItems(cart) {
    return cart.items.map(c => ({
        ...c.courseId._doc, count: c.count
    }))
}

function computePrice(courses) {
    return courses.reduce((total, course) => {
        return total += course.price * course.count
    }, 0)
}

router.post('/add', auth, async (req, res) => {
    const course = await Course.findById(req.body.id)
    await req.user.addToCart(course)
    res.redirect('/card')
})

router.delete('/remove/:id', auth, async (req, res) => {
    const card = await Card.remove(req.params.id)
    res.status(200).json(card)
})

router.get('/', auth, async (req, res) => {
    const user = await req.user
        .populate('cart.items.courseId')
        .execPopulate()

    const courses = mapCartItems(user.cart)


    res.render('card', {
        title: "Корзина",
        courses: courses,
        price: computePrice(courses),
        isCard: true
    })

})

module.exports = router