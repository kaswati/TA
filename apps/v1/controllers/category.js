"use strict";

/** FUNCTION GET */
exports.get = bluebird.coroutine(function* (req, res, next) {
	try{
		/** FLOW
		 * function ini dijalanka atau dilalui ketika di route ada yang memanggil param categoryId (ex: router.get("/category/:categoryId", CategoryController.fetch);)
		 * sebelum menjalankan function fetch (ex: router.get("/category/:categoryId", CategoryController.fetch);)
		 * maka akan melewati terlebih dahulu function get ini
		 */
		/** ambil parameter ID dari endpoint (url) */
		let categoryId = req.params.categoryId

		/** select 1 baris dari tabel category */
		let find = yield req.db.model('category').findOne({
			where: {
				category_id: categoryId
			}
		});

		/** jika datanya kosong, maka error */
		if (!find) {
			throw new Error('Invalid Category ID!')
		}

		/** simpan data hasil find di req.category */
		req.category = find
		/** lakukan proses selanjutnya */
		next()

	}catch(e) {next(e);}
});

/** FUNCTION UNTUK RETUN HASIL DATA GET  */
exports.fetch = bluebird.coroutine(function* (req, res, next) {
	try{
        
		/** return hasil find (get)*/
		res.success(req.category);

	}catch(e) {next(e);}
});

/** FUNCTION GET ALL */
exports.allCategory = bluebird.coroutine(function* (req, res, next) {
	try{
        
		let find = yield req.db.model('category').findAll();

		res.success(find);

	}catch(e) {next(e);}
});

/** FUNCTION CREATE */
exports.create = bluebird.coroutine(function* (req, res, next) {
	try{

		/** cara ambil data dari inputan postman yaitu menggunakan req.body */
		let data = req.body
		/** setting data inputan kedalan objek JSON */
		let objData = {
			category_code: data.code, // artinya, data inputan code di insert ke field category_code di tabel category
			category_name: data.name // artinya, data inputan name di insert ke field category_name di tabel category
		}
		let insertCategory = yield req.db.model('category').create(objData);

        if (!insertCategory) {
			throw new Error('Failed insert category!')
		}

		res.success(insertCategory);
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
		let categoryId = req.category.category_id //di function get, data hasil find di simpen di variabel req.category, maka kita ambil data cagory_id nya
		
		/** ambil data inputan dari postman*/
		let data = req.body

		/** setting data apa saja yang di update */
		let objData = {
			category_code: data.code,
			category_name: data.name
		}

		/** update tabel category */
		let updateCategory = yield req.db.model('category').update(objData, {
			where: {
				category_id: categoryId
			}
		})
		/** balikan data updateCategory isi nya array 1 / 2 / 3 / etc 
		 * maksudnya, jika return nya 1
		 * maka ada 1 data berhasil terupdate
		*/

		if (!updateCategory) {
			throw new Error('Failed update category!')
		}

		res.success({category_id: categoryId})
		
		res.success("data has updated");

	}catch(e) {next(e);}
});

/** FUNCTION DELETE */
exports.delete = bluebird.coroutine(function* (req, res, next) {
	try{
        
		/** ambil data category_id dari variabel req.category di function get */
		let categoryId = req.category.category_id		
		
		/** delete category */
		let deleteCategory = yield req.db.model('category').destroy({
			where: {
				category_id: categoryId
			}
		});
        
		res.success({status: 'success'});

	}catch(e) {next(e);}
});