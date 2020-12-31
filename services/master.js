const sql = require("mssql");
const conn = require('../connection/msSqlServer')();

const getCities = (callback) => {
    let result = null;
    conn.connect().then(() => {
        const sqlQuery = 'select * from City';
        const req = new sql.Request(conn);
        req.query(sqlQuery).then((recordSet) => {
            result = recordSet.recordset;
            conn.close();
            callback(result);
        })
            .catch(function (error) {
                conn.close();
                result = null;
                callback(result);
            });
    })
        .catch(function (error) {
            conn.close();
            result = null;
            callback(result);
        });
}

const getAreas = (cityId, callback) => {
    let result = null;
    conn.connect().then(() => {
        const sqlQuery = 'select * from Area where CityId = ' + cityId;
        const req = new sql.Request(conn);
        req.query(sqlQuery).then((recordSet) => {
            result = recordSet.recordset;
            conn.close();
            callback(result);
        })
            .catch(function (error) {
                conn.close();
                result = null;
                callback(result);
            });
    })
        .catch(function (error) {
            conn.close();
            result = null;
            callback(result);
        });
}

const getPropertyTypes = (callback) => {
    let result = null;
    conn.connect().then(() => {
        const sqlQuery = 'select * from PropertyType';
        const req = new sql.Request(conn);
        req.query(sqlQuery).then((recordSet) => {
            result = recordSet.recordset;
            conn.close();
            callback(result);
        })
            .catch(function (error) {
                conn.close();
                result = null;
                callback(result);
            });
    })
        .catch(function (error) {
            conn.close();
            result = null;
            callback(result);
        });
}

const saveCity = (cityName, callback) => {
    conn.connect().then(() => {
        var transaction = new sql.Transaction(conn);
        transaction.begin().then(() => {
            var request = new sql.Request(transaction);
            request.input("CityName", sql.VarChar(50), cityName)
            request.execute("sp_InsertCity").then(function () {
                transaction.commit().then((recordSet) => {
                    conn.close();
                    callback(true);
                }).catch((err) => {
                    conn.close();
                    callback(false);
                });
            }).catch((err) => {
                conn.close();
                callback(false);
            });
        }).catch((err) => {
            conn.close();
            callback(false);
        });
    }).catch((err) => {
        conn.close();
        callback(false);
    });
}

const deleteCity = (cityId, callback) => {
    conn.connect().then(() => {
        var transaction = new sql.Transaction(conn);
        transaction.begin().then(() => {
            var request = new sql.Request(transaction);
            request.input("CityId", sql.VarChar(50), cityId)
            request.execute("sp_DeleteCity").then(function () {
                transaction.commit().then((recordSet) => {
                    conn.close();
                    callback(true);
                }).catch((err) => {
                    conn.close();
                    callback(false);
                });
            }).catch((err) => {
                conn.close();
                callback(false);
            });
        }).catch((err) => {
            conn.close();
            callback(false);
        });
    }).catch((err) => {
        conn.close();
        callback(false);
    });
}

const updateCity = (cityId, cityName, callback) => {
    conn.connect().then(() => {
        var transaction = new sql.Transaction(conn);
        transaction.begin().then(() => {
            var request = new sql.Request(transaction);
            request.input("CityId", sql.VarChar(50), cityId)
            request.input("CityName", sql.VarChar(50), cityName)
            request.execute("sp_UpdateCity").then(function () {
                transaction.commit().then((recordSet) => {
                    conn.close();
                    callback(true);
                }).catch((err) => {
                    conn.close();
                    callback(false);
                });
            }).catch((err) => {
                conn.close();
                callback(false);
            });
        }).catch((err) => {
            conn.close();
            callback(false);
        });
    }).catch((err) => {
        conn.close();
        callback(false);
    });
}



module.exports = { getCities, getAreas, getPropertyTypes, saveCity, deleteCity, updateCity };