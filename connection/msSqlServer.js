const sql = require('mssql');
const connect = () => {
    const conn = new sql.ConnectionPool({
     user: 'sa',
     password: 'xpanxion@123',
     server: 'XIPL9440',
     database: 'RuntimeTerror'
 });

 return conn;
}

module.exports = connect;