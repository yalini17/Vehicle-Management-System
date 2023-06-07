// var express = require('express');
// var router = express.Router();
// var database = require('../database');

// router.get("/", function(request, response, next){
//     response.render('sample_data', {title : 'Node JS Ajax CRUD Application'});
// });

// router.post("/action", function(request, response, next){
//     var action = request.body.action;

//     if(action == 'fetch') {
//         var query = "SELECT * FROM sample_data ORDER BY id DESC";

//         database.query(query, function(error, data){
//             response.json({
//                 data: data
//             });
//         });
//     }

//     if(action == 'Add') {
//         var si_no = request.body.si_no;
//         var vehicle_number = request.body.vehicle_number;
//         var vehicle_name = request.body.vehicle_name;
//         var model_type = request.body.model_type;
//         var chassis_number = request.body.chassis_number;
//         var services = request.body.services;
//         var total_service_cost = request.body.total_service_cost;

//         var query = `
//             INSERT INTO sample_data 
//             (si_no, vehicle_number, vehicle_name, model_type, chassis_number, services, total_service_cost) 
//             VALUES (?, ?, ?, ?, ?, ?, ?)
//         `;

//         database.query(query, [si_no, vehicle_number, vehicle_name, model_type, chassis_number, services, total_service_cost], function(error, data){
//             response.json({
//                 message: 'Data Added'
//             });
//         });
//     }

//     if(action == 'fetch_single') {
//         var id = request.body.id;
//         var query = `SELECT * FROM sample_data WHERE id = ?`;

//         database.query(query, [id], function(error, data){
//             response.json(data[0]);
//         });
//     }

//     if(action == 'Edit') {
//         var id = request.body.id;
//         var si_no = request.body.si_no;
//         var vehicle_number = request.body.vehicle_number;
//         var vehicle_name = request.body.vehicle_name;
//         var model_type = request.body.model_type;
//         var chassis_number = request.body.chassis_number;
//         var services = request.body.services;
//         var total_service_cost = request.body.total_service_cost;

//         var query = `
//             UPDATE sample_data 
//             SET si_no = ?, 
//                 vehicle_number = ?, 
//                 vehicle_name = ?, 
//                 model_type = ?, 
//                 chassis_number = ?, 
//                 services = ?, 
//                 total_service_cost = ?
//             WHERE id = ?
//         `;

//         database.query(query, [si_no, vehicle_number, vehicle_name, model_type, chassis_number, services, total_service_cost, id], function(error, data){
//             response.json({
//                 message : 'Data Edited'
//             });
//         });
//     }

//     if(action == 'delete') {
//         var id = request.body.id;
//         var query = `DELETE FROM sample_data WHERE id = ?`;

//         database.query(query, [id], function(error, data){
//             response.json({
//                 message: 'Data Deleted'
//             });
//         });
//     }
// });

// module.exports = router;

var express = require('express');
var router = express.Router();
var database = require('../database');

router.get("/", function(request, response, next){
    if (request.session.loggedin) {
        var tableName = 'sample_data_' + request.session.username;
        var checkTableQuery = "SHOW TABLES LIKE ?";
        
        database.query(checkTableQuery, [tableName], function(error, result) {
            if (error) {
                console.error('Error executing query:', error);
                return;
            }

            if (result.length > 0) {
                var fetchQuery = "SELECT * FROM ?? ORDER BY id DESC";
                database.query(fetchQuery, [tableName], function(error, data){
                    response.render('sample_data', { title: 'Node JS Ajax CRUD Application', data: data });
                });
            } else {
                var createTableQuery = `
                    CREATE TABLE ?? (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        si_no INT,
                        vehicle_number VARCHAR(255),
                        vehicle_name VARCHAR(255),
                        model_type VARCHAR(255),
                        chassis_number VARCHAR(255),
                        services VARCHAR(255),
                        total_service_cost INT
                    )
                `;
                database.query(createTableQuery, [tableName], function(error, result) {
                    if (error) {
                        console.error('Error executing query:', error);
                        return;
                    }

                    response.render('sample_data', { title: 'Node JS Ajax CRUD Application', data: [] });
                });
            }
        });
    } else {
        response.redirect('/');
    }
});

router.post("/action", function(request, response, next){
    var action = request.body.action;

    if(action == 'fetch') {
        var tableName = 'sample_data_' + request.session.username;
        var query = "SELECT * FROM ?? ORDER BY id DESC";

        database.query(query, [tableName], function(error, data){
            response.json({
                data: data
            });
        });
    }

    if(action == 'Add') {
        var tableName = 'sample_data_' + request.session.username;
        var si_no = request.body.si_no;
        var vehicle_number = request.body.vehicle_number;
        var vehicle_name = request.body.vehicle_name;
        var model_type = request.body.model_type;
        var chassis_number = request.body.chassis_number;
        var services = request.body.services;
        var total_service_cost = request.body.total_service_cost;

        var query = `
            INSERT INTO ?? 
            (si_no, vehicle_number, vehicle_name, model_type, chassis_number, services, total_service_cost) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        database.query(query, [tableName, si_no, vehicle_number, vehicle_name, model_type, chassis_number, services, total_service_cost], function(error, data){
            response.json({
                message: 'Data Added'
            });
        });
    }

    if(action == 'fetch_single') {
        var tableName = 'sample_data_' + request.session.username;
        var id = request.body.id;
        var query = `SELECT * FROM ?? WHERE id = ?`;

        database.query(query, [tableName, id], function(error, data){
            response.json(data[0]);
        });
    }

    if(action == 'Edit') {
        var tableName = 'sample_data_' + request.session.username;
        var id = request.body.id;
        var si_no = request.body.si_no;
        var vehicle_number = request.body.vehicle_number;
        var vehicle_name = request.body.vehicle_name;
        var model_type = request.body.model_type;
        var chassis_number = request.body.chassis_number;
        var services = request.body.services;
        var total_service_cost = request.body.total_service_cost;

        var query = `
            UPDATE ?? 
            SET si_no = ?, 
                vehicle_number = ?, 
                vehicle_name = ?, 
                model_type = ?, 
                chassis_number = ?, 
                services = ?, 
                total_service_cost = ?
            WHERE id = ?
        `;

        database.query(query, [tableName, si_no, vehicle_number, vehicle_name, model_type, chassis_number, services, total_service_cost, id], function(error, data){
            response.json({
                message : 'Data Edited'
            });
        });
    }

    if(action == 'delete') {
        var tableName = 'sample_data_' + request.session.username;
        var id = request.body.id;
        var query = `DELETE FROM ?? WHERE id = ?`;

        database.query(query, [tableName, id], function(error, data){
            response.json({
                message: 'Data Deleted'
            });
        });
    }
});

module.exports = router;
