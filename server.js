let express = require('express')
let app =express()
let bodyParser= require('body-parser')
let session = require('express-session')

//Moteur de template
app.set('view engine', 'ejs')


//middleware
app.use('/assets',express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

app.use(require('./middlewares/flash'))

//routes

app.get('/', (request, response) => {
    response.render('pages/index')
})

app.post('/',(request,response) => {
    if(request.body.message === undefined || request.body.message === ""){
        request.flash('error',`Vous n'avez pas posté de message`)
        response.redirect('/')
    }
})
app.listen(8000)