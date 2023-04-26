const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validate = require("../middleware/validate");
const authorize = require("../middleware/authorize");

//Registering
router.post("/register", validate, async (req, res) => {
  try {
    // 1. destructure the req.body
    const { role_id, username, email, password } = req.body;

    const role = Number(role_id);

    // 2. check if user exist (if user exist throw err)
    const user = await db.query(`select * from "user" where email = $1`, [
      email,
    ]);

    // user existed
    if (user.rows.length !== 0) {
      return res.status(401).send("User already exist!"); // Unauthenticated
    }

    // 3. bcrypt the user password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. enter the new user inside our database
    const newUser = await db.query(
      `insert into "user" (role_id, username, email, password)
values($1,$2,$3,$4) returning *
`,
      [role, username, email, bcryptPassword]
    );

    // 5. generating our jwt token

    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Login
router.post("/login", validate, async (req, res) => {
  try {
    // 1. Destructure the req.body
    const { email, password } = req.body;

    // 2. Check if user doesn't exist (if not then we throw error)
    const user = await db.query(`select * from "user" where email = $1`, [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Email or Password is incorrect!");
    }
    // 3. Check if incoming password is the same the database password
    const isValidPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isValidPassword) {
      return res.status(401).json("Email or Password is incorrect!");
    }

    // 4. Give the JWT token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
