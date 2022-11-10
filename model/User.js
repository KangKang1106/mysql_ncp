// TODO: DB(mysql) 연결
// TODO: 모델 코드
const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'kang8798',
  database: 'kdt',
});

exports.postSignup = (data, callback) => {
  conn.query(
    `INSERT INTO user (userid, name, pw) VALUES('${data.userid}', '${data.name}', '${data.pw}')`,
    (err, rows) => {
      if (err) {
        throw err;
      }

      console.log('User.js', rows);
      callback(rows.insertId);
    }
  );
};

exports.postSignin = (data, callback) => {
  conn.query(`SELECT * FROM user WHERE userid = '${data.userid}' AND pw = '${data.pw}'`,
    (err, rows) => {
      if (err) {
        throw err;
      }

      callback(rows[0]);
    }
  );
};

exports.postProfile = (userid, callback) => {
  conn.query(`SELECT * FROM user WHERE userid = '${userid}' LIMIT 1`,
    (err, rows) => {
      if (err) {
        throw err;
      }

      callback(rows);
    }
  );
};

exports.editProfile = (data, callback) => {
  conn.query(`UPDATE user SET pw = '${data.pw}', name = '${data.name}' WHERE id = ${data.id}`,
    (err, rows) => {
      if (err) {
        throw err;
      }

      callback();
    }
  );
};

exports.deleteProfile = (id, callback) => {
  conn.query(`DELETE FROM user WHERE id = ${id}`,
    (err, rows) => {
      if (err) {
        throw err;
      }

      callback();
    }
  );
};