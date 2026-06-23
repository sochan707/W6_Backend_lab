import pool from "../database.js";
//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//

// Get all articles
export async function getArticles() {
    // TODO
    const [rows] = await pool.query("SELECT * FROM articles");
    return rows;
}

// Get one article by ID
export async function getArticleById(id) {
    // TODO
    const [rows] = await pool.query("SELECT * FROM articles WHERE id = ?", [id]);
    return rows[0] || null;
}

// Create a new article
export async function createArticle(article) {
    // TODO
    const { title, content, journalist, category } = article;
    const [result] = await pool.query(
        "INSERT INTO articles (title, content, journalist, category) VALUES (?, ?, ?, ?)",
        [title, content, journalist, category]
    );
    return { id: result.insertId, ...article };
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    // TODO
    const { title, content, journalist, category } = updatedData;
    const [result] = await pool.query(
        "UPDATE articles SET title = ?, content = ?, journalist = ?, category = ? WHERE id = ?",
        [title, content, journalist, category, id]
    );
    if (result.affectedRows === 0) return null;
    return { id, ...updatedData };
}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
    const [result] = await pool.query("DELETE FROM articles WHERE id = ?", [id]);
    return result.affectedRows > 0;
}

// Get all articles with journalist name
export async function getArticles() {
    const [rows] = await pool.query(`
        SELECT
            a.id,
            a.title,
            a.content,
            a.category,
            j.id AS journalist_id,
            j.name AS journalist_name
        FROM articles a
        LEFT JOIN journalists j
            ON a.journalist_id = j.id
    `);

    return rows;
}

// Get one article by ID with journalist info
export async function getArticleById(id) {
    const [rows] = await pool.query(`
        SELECT
            a.id,
            a.title,
            a.content,
            a.category,
            j.id AS journalist_id,
            j.name AS journalist_name,
            j.email,
            j.bio
        FROM articles a
        LEFT JOIN journalists j
            ON a.journalist_id = j.id
        WHERE a.id = ?
    `, [id]);

    return rows[0] || null;
}

// Get all articles by journalist ID
export async function getArticlesByJournalistId(journalistId) {
    const [rows] = await pool.query(`
        SELECT
            a.id,
            a.title,
            a.content,
            a.category,
            j.name AS journalist_name
        FROM articles a
        INNER JOIN journalists j
            ON a.journalist_id = j.id
        WHERE j.id = ?
    `, [journalistId]);

    return rows;
}