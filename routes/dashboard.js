const router = require("express").Router();
const db = require("../db");
const authorize = require("../middleware/authorize");

router.post("/", authorize, async (req, res) => {
  try {
    const user = await db.query(`SELECT * FROM "user" WHERE user_id = $1`, [
      req.user.id,
    ]);

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
