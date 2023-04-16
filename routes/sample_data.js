var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	response.render('sample_data', {title : 'Node JS Ajax CRUD Application'});

});

router.post("/action", function(request, response, next){

	var action = request.body.action;

	if(action == 'fetch')
	{
		var query = "SELECT * FROM sample_data ORDER BY id DESC";

		database.query(query, function(error, data){

			response.json({
				data:data
			});

		});
	}

	if(action == 'Add')
	{
		var si_no = request.body.si_no;

		var vehicle_number = request.body.vehicle_number;

		var vehicle_name = request.body.vehicle_name;

		var model_type = request.body.model_type;

		var chassis_number = request.body.chassis_number;

		var services = request.body.services;

		var total_service_cost = request.body.total_service_cost;

		var query = `
		INSERT INTO sample_data 
		(si_no, vehicle_number, vehicle_name, model_type, chassis_number, services, total_service_cost) 
		VALUES ("${si_no}", "${vehicle_number}", "${vehicle_name}", "${model_type}", "${chassis_number}", "${services}", "${total_service_cost}")
		`;

		database.query(query, function(error, data){

			response.json({
				message : 'Data Added'
			});

		});
	}

	if(action == 'fetch_single')
	{
		var id = request.body.id;

		var query = `SELECT * FROM sample_data WHERE id = "${id}"`;

		database.query(query, function(error, data){

			response.json(data[0]);

		});
	}

	if(action == 'Edit')
	{
		var id = request.body.id;

		var si_no = request.body.si_no;

		var vehicle_number = request.body.vehicle_number;

		var vehicle_name = request.body.vehicle_name;

		var model_type = request.body.model_type;

		var chassis_number = request.body.chassis_number;

		var services = request.body.services;

		var total_service_cost = request.body.total_service_cost;

		var query = `
		UPDATE sample_data 
		SET si_no = "${si_no}", 
		vehicle_number = "${vehicle_number}", 
		vehicle_name = "${vehicle_name}", 
		model_type = "${model_type}" 
		chassis_number = "${chassis_number}"
		services = "${services}"
		total_service_cost = "${total_service_cost}"
		WHERE id = "${id}"
		`;

		database.query(query, function(error, data){
			response.json({
				message : 'Data Edited'
			});
		});
	}

	if(action == 'delete')
	{
		var id = request.body.id;

		var query = `DELETE FROM sample_data WHERE id = "${id}"`;

		database.query(query, function(error, data){

			response.json({
				message : 'Data Deleted'
			});

		});
	}

});

module.exports = router;



