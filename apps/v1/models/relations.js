"use strict";

module.exports = {

	/**
	 * tabel category sebagai tabel induk, dan detail sebagai tabel anak
	 */
	
	category: (model, db) => {
		model.hasMany(db.model("category_detail"), {foreignKey: "category_id"});
	},
	category_detail: (model, db) => {
		model.belongsTo(db.model("category"), {foreignKey: "category_id"});
	},
};