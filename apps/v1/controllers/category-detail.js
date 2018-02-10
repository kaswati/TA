"use strict";

/** FUNCTION GET BY ID */
exports.get = bluebird.coroutine(function* (req, res, next) {
	try{

		/** ambil variabel param */
		let categoryDetailId = req.params.categoryDetailId

		/** find data category_detail dengan termasuk tabel primary key nya (category)*/
		let find = yield req.db.model('category_detail').findOne({
			where: {
				detail_id: categoryDetailId,
			},
			include: [{model: req.db.model('category')}]
		});

		/** jika tidak ada data, maka error */
		if(!find){
			throw new Error("Invalid Detail ID!");
		}

		req.detail = find
		next()

	}catch(e) {next(e);}
});

/** FUNCTION UNTUK RETUN HASIL DATA GET  */
exports.fetch = bluebird.coroutine(function* (req, res, next) {
	try{
        
		/** return hasil find (get)*/
		res.success(req.detail);

	}catch(e) {next(e);}
});


/** FUNCTION GET ALL */
exports.allDetail = bluebird.coroutine(function* (req, res, next){
	try{
		/** findAll semua data category_detail dengan termasuk tabel primary key nya (category) */
		let find = yield req.db.model('category_detail').findAll({
			include: [{model: req.db.model("category")}]
		});
		res.success(find);
	}catch(e) {next(e);}
});

/** FUNCTION CREATE */
exports.create = bluebird.coroutine(function* (req, res, next) {
	try{

		/** setting, variabel inputan kedalam objek JSON */
		let data = req.body
		let objData = {
			category_id: data.category_id,
			detail_code: data.detail_code,
			detail_name: data.detail_name
		}

		/** insert data detail */
		let find = yield req.db.model('category_detail').create(objData);
		
		res.success(find);
	}catch(e) {next(e);}
});

/** FUNCTION UPDATE */
exports.update = bluebird.coroutine(function* (req, res, next) {
	try{

		/** FLOW
		 * setelah mendapatkan id di function sebelumnya (function get)
		 * lalu update data nya di function ini
		 */

		/** ambil category_id dari funtion get */
		let detailId = req.detail.detail_id //di function get, data hasil find di simpen di variabel req.detail, maka kita ambil data detail_id nya
		
		/** ambil data inputan dari postman*/
		let data = req.body

		/** setting data apa saja yang di update */
		let objData = {
			category_id: data.category_id,
			detail_code: data.detail_code,
			detail_name: data.detail_name
		}

		/** update tabel category */
		let updateCategoryDetail = yield req.db.model('category_detail').update(objData, {
			where: {
				detail_id: detailId
			}
		})
		/** balikan data updateCategory isi nya array 1 / 2 / 3 / etc 
		 * maksudnya, jika return nya 1
		 * maka ada 1 data berhasil terupdate
		*/

		if (!updateCategoryDetail) {
			throw new Error('Failed update category detail!')
		}

		res.success({detail_id: detailId})

	}catch(e) {next(e);}
});

/** FUNCTION DELETE */
exports.delete = bluebird.coroutine(function* (req, res, next) {
	try{

		/** ambil data detail_id di function get (variabel req.detail) */

		let detailId = req.detail.detail_id

		let find = yield req.db.model('category_detail').destroy({
			where: {
				detail_id: detailId
			}
		});

		res.success({status: 'success'});

	}catch(e) {next(e);}
});
