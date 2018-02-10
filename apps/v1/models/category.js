"use strict";
// doc : http://sequelize.readthedocs.io/en/latest/docs/models-definition

// use connection to define a model
// relation declaration must be place in relations.js on root directory

module.exports = (db) => {
	let schema = {
		category_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		category_code: {
			type: Sequelize.STRING(255),
			allowNull: false,
			validate: {
				len: {
					args: ["0", "255"],
					msg: "Please make sure that `Category Code` is between 1-255 char length!"
				}
			},
		},
		category_name: {
			type: Sequelize.STRING(255),
			allowNull: false,
			validate: {
				len: {
					args: ["0", "255"],
					msg: "Please make sure that `Category Name` is between 1-255 char length!"
				}
			},
		}
	};

	let Categories = db.getConnection().define("category", schema, {
		timestamps: true,
		createdAt: 'created_date',
		updatedAt: 'updated_date',
		paranoid: false,
		deletedAt: 'deleted_date',
		underscored: false,
		freezeTableName: true,
		engine: "InnoDB",
		charset: "utf8"
	});

	return Categories;
};