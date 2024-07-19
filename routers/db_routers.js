const { Router } = require('express');
const { db_controller } = require('../controllers/db_controller.js');

const db_routers = new Router();

db_routers.get('/', db_controller.getPosts);          
db_routers.get('/:postId', db_controller.getPost);
db_routers.post('/', db_controller.addPost);
db_routers.put('/:postId', db_controller.updatePost);
db_routers.delete('/:postId', db_controller.deletePost);

module.exports = { postsRouter };