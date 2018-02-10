"use strict";
module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable("category", {
			category_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			category_code: {
				type: Sequelize.STRING(255),
				allowNull: false
			},
			category_name: {
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
		return queryInterface.dropTable("category");
	}
};