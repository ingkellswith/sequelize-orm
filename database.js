import mariadb from 'mariadb';
import Sequelize from 'sequelize';
require('dotenv').config();

/* const pool = mariadb.createPool({
    host: process.env.REACT_APP_DB_HOST,
    user: process.env.REACT_APP_DB_USER,
    password: process.env.REACT_APP_DB_PASSWORD,
    connectionLimit: 1
});

export async function asyncFunction() {
    let conn;
    try {
        conn = await pool.getConnection();
        // const rows = await conn.query("SELECT 1 as val");
        // console.log(rows); //[ {val: 1}, meta: ... ]
        // const res = await conn.query("INSERT INTO test.`test-tbl` (name) VALUES('yapyap');");
        //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
        const rows = await conn.query("SELECT * from test.`test-tbl`");
        //console.log(rows[0]); //[ {val: 1}, meta: ... ]
        //console.log(Array.isArray(rows));
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
} */

// Option 2: Passing parameters separately (other dialects)
// 아래 'test'는 호스트안의 데이터베이스 이름, 테이블이 아님
const sequelize = new Sequelize('test', process.env.REACT_APP_DB_USER, process.env.REACT_APP_DB_PASSWORD, {
    host: process.env.REACT_APP_DB_HOST,
    dialect: 'mariadb'
});

// 아래 'test-tbl'은 데이터베이스 내의 테이블 이름
const Test = sequelize.define('test-tbl', {
    // Model attributes are defined here
    id: {
        type: Sequelize.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
    freezeTableName: true,
    timestamps: false// Other model options go here
});


export async function logFunction() {
    const insert = await Test.create({ name:"million" });
    console.log(insert);
    const select = await Test.findAll({ attributes: ['id', 'name'] });
    console.log(select[0].id);
    console.log(select.length);
}
