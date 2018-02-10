"use strict";
module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable("category_detail", {
			detail_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			category_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				/** ini contoh foreign key dari tabel category */
				references: {
					model: "category",
					key: "category_id"
				},
			},
			detail_code: {
				type: Sequelize.STRING(255),
				allowNull: false
			},
			detail_name: {
				type: Sequelize.STRING(255),
				allowNull: false
			},
			created_date: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_date: {
				allowNull: false,
				type: Sequelize.DATE
			}
		},{
			freezeTableName: true,
			engine: "InnoDB",
			charset: "utf8"
		})
			.then(function () {
				return [
				];
			});
	},
	down: function(queryInterface, Sequelize) {
		return queryInterface.dropTable("category_detail");
	}
};