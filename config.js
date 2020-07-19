require('dotenv').config();

const { Pool } = require('pg');
const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});



const getProfile = (request, response) => {
  pool.query('SELECT * FROM profile', (error, results) => {
    if (error) {
      throw error
    }



    var data_profiles = JSON.stringify(results.rows);
    response.status(201).send(data_profiles);
    return (data_profiles);

  })
};


const addProfile = (request, response) => {
  const username = request["username"];
  const pfp = request["pfp"];

  pool.query('INSERT INTO profile (name, pfp) VALUES ($1, $2)', [username, pfp], (error, results) => {

    if (error) {
      response.status(201).send(`User added with ID: ${result.insertId}`);
      throw error
    }

  });

};



const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM profile WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
    return json(results.rows);
  })
};


const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name } = request.body;

  pool.query(
    'UPDATE profile SET name = $1 WHERE id = $2',
    [name, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM profile WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
};


module.exports = {
  addProfile,
  getUserById,
  getProfile,
  updateUser,
  deleteUser,
};



