require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const jwt = require('jsonwebtoken');

const ROLE = require('./common/enums/roles');
const authorize = require("./middleware/authorize");

const db = require('./db');

// For middlewares
app.use(morgan('dev'));

// app.use(cors());
app.use(express.json());

const port = process.env.SERVER_PORT;

// Functions
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: '30s',
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.SECRET_REFRESH_TOKEN);
};

const cors = require('cors');
app.use(cors({
  origin: '*'
}));

// Get food
app.get('/api/v1/food', async (req, res) => {
  try {
    //const results = await db.query("select * from restaurants");
    const result = await db.query(
      'select b.name as cuisine, b.cuisine_id as cuisine_id, c.name as meal, c.meal_id as meal_id, a.name, a.cost, a.food_id as food_id from food a Inner join cuisine b on b.cuisine_id = a.cuisine_id Inner join meal c on c.meal_id = a.meal_id'
    );

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        food: result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get meal
app.get('/api/v1/meal', async (req, res) => {
  try {
    //const results = await db.query("select * from restaurants");
    const result = await db.query(
      'select meal_id, "name" from meal'
    );

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// Make food preference
app.post('/api/v1/preference', authorize, async (req, res) => {
  try {
    var { username, meal_id, food_id } = req.body

    const result = await db.query(
      `INSERT INTO Preference (username, meal_id, date, food_id) VALUES($1, $2,CURRENT_DATE, $3)`, [username, meal_id, food_id]
    );

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
      },
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: 'fail',
      data: {
        Error: "You have already made a preference for tomorrow."
      },
    });
  }
});

// add food
app.post('/api/v1/food-entry', async (req, res) => {
  try {
    var cuisine_id = req.body.cuisine_id;
    var meal_id = req.body.meal_id;
    var name = req.body.name;
    var cost = req.body.cost;

    const result = await db.query(
      `INSERT INTO food (cuisine_id, meal_id, name, cost, date_added) VALUES($1, $2, $3, $4, CURRENT_DATE)`, [cuisine_id, meal_id, name, cost]
    );

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
      },
    });
  } catch (err) {
    console.log(err);
  }
});
// Get wastage
app.get('/api/v1/wastage', async (req, res) => {
  try {
    //const results = await db.query("select * from restaurants");
    const result = await db.query(
      'select w.wastage_id as id, w.date as wasteDate, f.name as foodName, w.food_waste_amount as wasteAmount from wastage w inner join food f on w.food_id = f.food_id'
    );

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        wastage: result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});
// insert wasteage
app.post("/api/v1/wasteage-entry", async (req, res) => {
  try {
    var date = req.body.date;
    var food_waste_amount = req.body.food_waste_amount;
    var food_id = req.body.food_id;

    const result = await db.query(
      `INSERT INTO wastage (date, food_waste_amount, food_id)
      VALUES ($1, $2, $3)`,
      [date, food_waste_amount, food_id]
    );

    if (!date) {
      return res.status(400).json({
        status: "error",
        message: "Date field is required",
      });
    }

    res.status(200).json({
      status: "success",
      results: result.rows.length,
      data: {},
    });
  } catch (err) {
    console.log(err);
  }
});

// Get food
app.get('/api/v1/food-of-the-day', async (req, res) => {
  try {
    //const results = await db.query("select * from restaurants");
    const result = await db.query(
      'Select b.name as name, c.name as meal, d.name as cuisine, b.cost as cost from food_of_the_day a inner join food b on a.food_id = b.food_id inner join meal c on a.meal_id = c.meal_id inner join cuisine d on b.cuisine_id = d.cuisine_id where DATE(a.date) = CURRENT_DATE'
    );

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        food: result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`server is up and listening on  port ${port}`);
});
