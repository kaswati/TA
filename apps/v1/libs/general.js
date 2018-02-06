'use strict';

exports.getDataPaging = (db, tableName, dbAttr, page, perpage) => new Promise((resolve, reject) => {

    perpage = parseInt(perpage) || 10;
    page = parseInt(page) || 1;

    if (dbAttr.hasOwnProperty('distinct')) {
        //nothing to do
    }else{
        //kalau belum ada distinct harus di set dulu, supaya total row nya akurat kalau join ke table `1 to many`
        dbAttr.distinct = true;
    }

    db.model(tableName).count(dbAttr)
    .then(function (total_row) {
        if(total_row > 0) {
            //kalau ada row baru process data
            let total_page = Math.ceil(total_row / perpage);
            page = page > total_page ? total_page : page;//check dulu kalau page > dari total page harus sama dengan total page
            page = page < 1 ? 1 : page;//check dulu kalau page < 1 harus sama dengan 1
            let offs = (page - 1) * perpage;

            //set offsets & limit
            dbAttr.offset = offs;
            dbAttr.limit = perpage;

            db.model(tableName).findAll(dbAttr).then((data) => {
                let result = {
                    data : data,
                    row : data.length,
                    page : page,
                    perpage : perpage,
                    total_row : total_row,
                    total_page : total_page
                }
                resolve(result);
            }).catch(reject);
        }else{
            //kalau tidak ada row jangan process data
            let result = {
                data : [],
                row : 0,
                page : 0,
                perpage : perpage,
                total_row: 0,
                total_page : 0
            }
            resolve(result);
        }

    }).catch(reject);

})

