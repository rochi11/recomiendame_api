const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database/database');
// Login
router.post('/api/login', (req, res) => {
    let data = {}
    const {
        usuario,
        clave
    } = req.body;
    mysqlConnection.query('SELECT * FROM usuarios WHERE (usuario = ? AND clave = ?)', [usuario, clave], (err, rows, fields) => {
        if (!err) {
            if (rows.length>0) {
                data.Status = 'Usuario encontrado'
                data.data = rows[0]
            }else{
                data.Status = 'No se encontro al usuario'
            }
            res.json(data);
        } else {
            console.log(err);
        }
    });
});
// Listado de usuarios
router.get('/api/usuario/listar', (req, res) => {
    mysqlConnection.query('SELECT * FROM usuarios', (err, rows, fields) => {
        if (!err) {
            res.json({
                Status: 'Lista de usuarios',
                data: rows
            });
        } else {
            console.log(err);
        }
    });
});
// Buscar un usuario por id
router.get('/api/usuario/ver/:id', (req, res) => {
    const {
        id
    } = req.params;
    mysqlConnection.query('SELECT * FROM usuarios WHERE idUsuario = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({
                Status: 'Usuario mostrado',
                data: rows[0]
            });
        } else {
            console.log(err);
        }
    });
});
// Crear un nuevo usuario
router.post('/api/usuario/crear', (req, res) => {
    const {
        rol,
        usuario,
        clave, 
        avatar, 
        nombre, 
        apellido,
        sexo,
        edad,
        direccion, 
        email,
        telefono,
        token,
        activo,
        eliminado,
        fechaCreacion,
        fechaEliminacion
    } = req.body;
    const query = `INSERT INTO usuarios(rol, usuario, clave, avatar, nombre, apellido, sexo, edad, direccion, email, telefono, token, activo, eliminado, fechaCreacion, fechaEliminacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    mysqlConnection.query(query, [rol, usuario, clave, avatar, nombre, apellido, sexo, edad, direccion, email, telefono, token, activo, eliminado, fechaCreacion, fechaEliminacion], (err, rows, fields) => {
        if (!err) {
            res.json({
                Status: 'Usuario agregado'
            });
        } else {
            console.log(err);
        }
    });
});
// Actulizar un usuario
router.put('/api/usuario/actualizar/:id', (req, res) => {
    const {
        rol,
        usuario,
        clave,
        avatar,
        nombre,
        apellido,
        sexo,
        edad,
        direccion,
        email,
        telefono,
        token,
        activo,
        eliminado,
        fechaCreacion,
        fechaEliminacion
    } = req.body;
    const {
        id
    } = req.params;
    const query = `UPDATE usuarios SET rol = ?, usuario = ?, clave = ?, avatar = ?, nombre = ?, apellido = ?, sexo = ?, edad = ?, direccion = ?, email = ?, telefono = ?, token = ?, activo = ?, eliminado = ?, fechaCreacion = ?, fechaEliminacion = ? WHERE idUsuario = ?`
    mysqlConnection.query(query, [rol, usuario, clave, avatar, nombre, apellido, sexo, edad, direccion, email, telefono, token, activo, eliminado, fechaCreacion, fechaEliminacion, id], (err, rows, fields) => {
        if (!err) {
            res.json({
                Status: 'Usuario actualizado'
            });
        } else {
            console.log(err);
        }
    });
});
// Borrar un usuario
router.delete('/api/usuario/borrar/:id', (req, res) => {
    const {
        id
    } = req.params;
    const query = `DELETE FROM usuarios WHERE idUsuario = ?`
    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            res.json({
                Status: 'Usuario borrado'
            });
        } else {
            console.log(err);
        }
    });
});

module.exports = router;