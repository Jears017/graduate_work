const {body} = require('express-validator')

exports.loginValidators = [
    body('email',).isEmail().withMessage()

]