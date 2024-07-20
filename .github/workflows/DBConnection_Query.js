const mariadb = require('mariadb');

const config ={
    host: '163.123.183.93',
    user: 'estornudo',
    password: 'achu*Salud',
    database: 'desastre',
    connectionLimit: 5,
    port: '17664',
    acquireTimeout: 1000
}
class DBConnectorMariaDB{
    dbconnector = mariadb.createPool(config);

    // async query(param){
    //     var connection = await this.dbconnector.getConnection();
    //     var ret = null;
    //     connection.query(param)
    //     .then(data => {
    //         ret = data;
    //         connection.end();
    //     })
    //     .catch(err =>{
    //         console.log(err);
    //         connection.end();
    //     })
    //     // this.dbconnector.end();
    //     return ret;
    // }

    async queryall(sQuery){
        var connection = await this.dbconnector.getConnection();
        var ret = null;
        await connection.query(sQuery)
        .then(data =>{
            ret = data;
            connection.end()
        })
        .catch(err => {
            console.log(err);
            connection.end()
        })
        return ret;
    }

    async querywithParams(sQuery, params){
        var connection = await this.dbconnector.getConnection();
        var ret = null;
        await connection.query(sQuery, params)
        .then(data =>{
            ret = data;
            connection.end()
        })
        .catch(err =>{
            console.log(err)
            connection.end()
        })
        return ret;
    }


}

module.exports = new DBConnectorMariaDB();

