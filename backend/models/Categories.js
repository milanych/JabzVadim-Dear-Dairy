const db = require('../database/connect');

class Category {

  constructor(data) {
    this.category_id = data.category_id;
    this.category = data.category;
  }

  static async getAll() {
    const query = 'SELECT * FROM categories'
    const response = await db.query(query);
    return response.rows.map(p => new Category(p));
  }
}

module.exports = Category;
