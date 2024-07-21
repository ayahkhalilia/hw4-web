const { Router } = require('express');
const { db_controller } = require('../controllers/db_controller.js');

const db_routers = new Router();

db_routers.get('/', db_controller.get_from_db);          
module.exports = { db_routers };