"use strict";

module.exports = (app, router) => {
	const MainController = app.controller("main");
	const CategoryController = app.controller("category");
	const CategoryDetailController = app.controller("category-detail");

	//router.use('/example', app.route('example'));
	router.get("/", MainController.index);


	/** NOTE 
	 * penamaan route dan variabel nya harus menggambarkan isinya
	 * ex: category-detail jangan catedetail
	*/

	/** Contoh penamaan endpoint */

	/** untuk endpoint get category */
	router.get("/category-all", CategoryController.allCategory);
	router.get("/category/:categoryId", CategoryController.fetch);
	router.post("/category", CategoryController.create);
	router.put("/category/:categoryId", CategoryController.update);
	router.delete("/category/:categoryId", CategoryController.delete);

	/** untuk endpoint detail category detail */
	router.get("/category-detail-all", CategoryDetailController.allDetail);
	router.get("/category-detail/:categoryDetailId", CategoryDetailController.fetch);
	router.post("/category-detail", CategoryDetailController.create);
	router.put("/category-detail/:categoryDetailId", CategoryDetailController.update);
	router.delete("/category-detail/:categoryDetailId", CategoryDetailController.delete);

	router.param('categoryId', CategoryController.get); /** diajalankan pertama ketika ada yang menggunakan categoryId di route (ex: router.get("/category/:categoryId", CategoryController.fetch);) */
	router.param('categoryDetailId', CategoryDetailController.get); /** diajalankan pertama ketika ada yang menggunakan categoryDetailId di route (ex: 	router.delete("/category-detail/:categoryDetailId", CategoryDetailController.delete);) */
};