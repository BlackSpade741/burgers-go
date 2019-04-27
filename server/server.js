// Imports
const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose')
const { ObjectID } = require('mongodb')
const path = require('path');

const { User } = require('./models/user')
const session = require("express-session")
const cookieParser = require("cookie-parser")

const { Transaction } = require('./models/transaction') 

const PORT = process.env.PORT || 4000; 
const log = console.log

const app = express();

// Express Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(session({
    secret: 'love burgers',
    resave: false,
    saveUninitialized: false,
    key: 'user_sid', 
    cookie: {
        expires: 600000
    }
}))
app.use(cookieParser())

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

// Connect to Mongoose
const connection = mongoose.connection
connection.once('open', function() {
    log("MongoDB database connection established successfully");
})

// Login Info
app.get('/api/loggedIn', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.send("logged in")
    } else {
        res.send("not logged in")
    }
});
  
/*

"/api/users"
GET: finds all users
POST: creates a new user

*/

// GET route to get all users
app.get('/api/users', (req, res) => {
    log("GET /api/users")
    log(req.session)
    User.find((err, users) => {
        if (err) {
            res.status(404).send(err)
            log(err);
        } else {
            res.json(users)
        }
    })
})

// POST route to create a user
app.post('/api/users', (req, res) => {
    log("POST /api/users")
    log(req.body)
    
    // Create a new user
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        isUserAdmin: req.body.isUserAdmin
    })

    user.save().then((result) => {
        res.send(result)
    }, (error) => {
        log(error)
        // 500 for Server Error because Save Failed
        res.status(500).send(error)
    })
})

// POST route to specific user by id that checks the given password to see if its right
app.post("/api/users/:id", (req, res) => {
    log("POST /api/users/:id")
    log(req.params)

    User.authenticateId(req.params.id, req.body.password).then((result) => {
        res.json(result)
    }, (error) => {
        // 404 for Resource not found Error
        res.status(400).send(error)
    })
})

// DELETE User Route
app.delete("/api/users/:id", (req, res) => {
    User.findByIdAndRemove(req.params.id).then(user => {
        if (!user) {
            res.status(404).send
        } else {
            res.json(user)

            // remove transactions as well
            Transaction.remove({userId: req.params.id}, (err) => {
                log(err)
            })
        }
    }).catch(error => {
        res.status(500)
    })
})

// PATCH route to change a user's password
app.patch("/api/users/:id", (req, res) => {
    log("PATCH /api/users/:id")
    log(req.body)
    const password = req.body.password
    const userId = req.params.id
    User.findById(userId, (error, user) => {
        log(user)
        if (error) {
            res.status(500).send(error)
            return
        }
        if (!user) {
            res.status(404).send()
            return
        }
        
        user.password = password
        user.save().then(result => {
            res.send(result)
        }, (error) => {
            res.status(500).send(error)
            log(error)
        })
    })
})

// TRANSACTION ROUTES

// GET route to get all transactions
app.get('/api/transactions', (req, res) => {
    log("GET /api/transactions")

    Transaction.find((error, transactions) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.json(transactions)
        }
    })
})

// POST route to make a new transaction
app.post('/api/transactions', (req, res) => {
    const total = req.body.total
    const order = req.body.order
    const userId = req.body.userId
    const address = req.body.address
    const payment = req.body.payment
    log("POST /api/transactions")
    log('=============total==============')
    log(total)
    log('=============order==============')
    log(order)

    const transaction = new Transaction({
        total: total,
        order: order,
        userId: userId,
        orderTime: Date.now(),
        status: "placed",
        address: address,
        payment: payment
    })

    transaction.save().then((result) => {
        res.send(result)
    }, (error) => {
        // 500 for Server Error because Save Failed
        log(error)
        res.status(500).send(error)
    })
})

// PATCH route to change an order
app.patch("/api/transactions/:id", (req, res) => {
    log("PATCH /api/transactions/:id")
    log(req.body)
    const status = req.body.status
    const transId = req.params.id
    Transaction.findById(transId, (error, transaction) => {
        log(transaction)
        if (error) {
            res.status(500).send(error)
            return
        }
        if (!transaction) {
            res.status(404).send()
            return
        }
        transaction.status = status
        transaction.save().then(result => {
            res.send(result)
        }, (error) => {
            res.status(500).send(error)
            log(error)
        })
    })
})

// DELETE route to delete an order
app.delete("/api/transactions/:id", (req, res) => {
    log("DELETE /api/transactions/:id")
    log(req.body)
    Transaction.findByIdAndRemove(req.params.id).then(transaction => {
        if (!transaction) {
            res.status(404).send()
        } else {
            res.json(transaction)
        }
    }).catch(error => {
        log(error)
        res.status(500).send(error)
    })
})



// Login & Logout

// login
app.post("/api/login", (req, res) => {
    log("POST /api/login")
    log(req.body)
    // log(req.session)
    if (req.body.type === "email") {
        User.authenticateEmail(req.body.id, req.body.password).then((result) => {
            req.session.user = result
            res.json(result)
        }, (error) => {
            res.send("bad login")
        })
    } else if (req.body.type === "username") {
        User.authenticateUsername(req.body.id, req.body.password).then((result) => {
            req.session.user = result
            res.json(result)
        }, (error) => {
            res.send("bad login")
        })
    } else {
        res.send("bad login type")
    }
})

// Logout Route
app.get('/api/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
    } 
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
    log("Server is running on Port: " + PORT)
})
