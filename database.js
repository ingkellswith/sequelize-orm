import mariadb from 'mariadb';
import Sequelize from 'sequelize';

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'rolan105d',
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
}

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('test', 'root', 'rolan105d', {
    host: 'localhost',
    dialect: 'mariadb'
});

// const Users = sequelize.define('Users', {
//     // Model attributes are defined here
//     id: {
//         type: Sequelize.NUMBER,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: {
//         type: Sequelize.STRING
//         // allowNull defaults to true
//     }
// }, {
//     // Other model options go here
// });
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
    const test = await Test.findAll({ attributes: ['id', 'name'] });
    console.log(test[0].id);
    console.log(test.length);
    const test2 = await Test.create({ name:"million" });
    console.log(11,test2);
}

// const shoot=null;
// const jane = async () => {
//     shoot = await Users.create({ name: "Doe" });
// }
