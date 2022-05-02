const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import any route handlers here.
const userRoutes = require('./routes/user');
const sessionRoutes = require('./routes/session');
const bidRoutes = require("./routes/bid");
const contractRoutes = require("./routes/contract");
const landRoutes = require("./routes/land");
const reviewRoutes = require("./routes/review");

// Import any middleware here
const middleware = require("./middleware/model-middleware");

// Start by defining the express app instance
const app = express();
const port = 3001;

// On every request, this gets called first. This is the first step in our "middleware chain".
// We put this before anything else because we know our route handlers are going to need connections
// to the database
app.use(cors());
app.use(middleware.createModelsMiddleware);
app.use(middleware.requestLogMiddleware);
app.use(bodyParser.json());

// Add a health route. Note the new argument: next
app.get('/health', (request, response, next) => {
    const responseBody = { status: 'up', port };
    response.json(responseBody);
    // next() is how we tell express to continue through the middleware chain
    next();
});

app.use('/session', sessionRoutes);


// For any route that starts with `/users`, use the route handler here
app.use('/user', userRoutes);
app.use("/bid", bidRoutes);
app.use("/contract", contractRoutes);
app.use("/land", landRoutes);
app.use("/review", reviewRoutes);
// app.use('/students', authenticateWithClaims(['student']), usersRoutes);

// Now that we've configured the app, make it listen for incoming requests
app.listen(port, () => {
    console.log(`This app is listening on port ${port}`);
});