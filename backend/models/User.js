const db = require('../database/connect');

class User {

  constructor(data) {
    this.id = data.user_id;
    this.username = data.username;
    this.password = data.password;
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM user_account WHERE user_id = $1", [id]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query("SELECT * FROM user_account WHERE username = $1", [username]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }
  static async getAdminUser(username) {
    const response = await db.query("SELECT * FROM user_account WHERE isadmin = true", [username]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }
  static async create(data) {
    const { username, password, isadmin } = data;
    let response = await db.query("INSERT INTO user_account (username, password, isadmin) VALUES ($1, $2, $3) RETURNING user_id;",
      [username, password, isadmin]);
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }
}

module.exports = User;
