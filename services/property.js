const sql = require("mssql");
const conn = require('../connection/msSqlServer')();

const getProperties = (areaId, propertyTypeId, callback) => {
    let result = null;
    conn.connect().then(() => {
        const sqlQuery =
            `select p.PropertyId
            ,pt.TypeName as PropertyType
            ,a.AreaName as Area
            ,p.[Address]
            ,p.CostPerDay
            ,u.[Name] as PostedBy
            ,p.IsOccupied
            ,p.OwnerName
            ,c.CityName
            ,pp.PropertyPhotoId
            ,pp.Photo
        from Property p
        inner join PropertyPhotos pp on pp.PropertyId = p.PropertyId
        inner join PropertyType pt on pt.TypeId = p.PropertyTypeId
        inner join Area a on a.AreaId = p.AreaId
        inner join City c on c.CityId = a.CityId
        inner join [User] u on p.PostedBy = u.UserId
        where p.AreaId = ${areaId}
            and p.PropertyTypeId = ${propertyTypeId}
            and p.IsOccupied = 0`;
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

module.exports = { getProperties }