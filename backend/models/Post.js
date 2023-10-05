const db = require('../database/connect');

class Post {

  constructor(data) {
    this.id = data.post_id;
    this.category_id = data.category_id;
    this.category = data.category;
    this.content = data.content;
    this.user_id = data.user_id;
    this.username = data.username;
    this.date = data.date;
  }

  static async getAll() {
    const query = 'SELECT p.post_id, cat.category, p.content, ua.username, p.date FROM post AS p JOIN categories AS cat ON cat.category_id = p.category_id JOIN user_account AS ua ON ua.user_id = p.user_id'
    const response = await db.query(query);
    return response.rows.map(p => new Post(p));
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM post WHERE post_id = $1", [id]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate post.")
    }
    return new Post(response.rows[0]);
  }

  static async create(data) {
    const { category_id, date, content } = data;
    const query = "INSERT INTO post (category_id, date, content) VALUES ($1, $2, $3) RETURNING *;"
    let response = await db.query(query, [category_id, date, content]);
    return response.rows[0];
  }

  async update(data, id) {
    const query = "UPDATE post SET content = $1 WHERE post_id = $2 RETURNING *;"
    let newContent = data.content
    const { rows } = await db.query(query, [newContent, id]);
    if (rows.length === 0) {
      throw new Error("Unable to update votes.")
    }
    return rows[0];
  }

  async destroy() {
    let response = await db.query("DELETE FROM post WHERE post_id = $1 RETURNING *;", [this.id]);
    return new Post(response.rows[0]);
  }

}

module.exports = Post;
