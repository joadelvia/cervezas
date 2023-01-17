const path = require('path');
const fs = require('fs');
const { response } = require('express');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { uploadFile } = require('../helpers/uploadFile');
const User = require('../models/usuario');
const Cerveza = require('../models/cerveza')


const upload = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    try {

        // txt, md
        // const nombre = await uploadFile( req.files, ['txt','md'], 'textos' );
        const nombre = await uploadFile(req.files, undefined, 'imgs');
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}

const updateImage = async (req = request, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }
    const { collection, id } = req.params;
    let model;
    try {
        switch (collection) {
            case "users":
                model = await User.findById(id);
                break;

            case "cervezas":
                model = await Cerveza.findById(id)
                break;
        }

        //Si tiene atributo img y existe el fichero lo eliminamos
        if (model.img) {
            const oldPath = path.join(__dirname, '../uploads', collection, model.img)
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath)
            }
        }

        const name = await uploadFile(req.files, undefined, collection);
        model.img = name;
        const test = await model.save();
        res.status(200).json({ model });

    }
    catch (msg) {
        return res.status(400).json({ msg })
    }
    // Subir el fichero a la carpeta con el nombre de la colección recibida y en el caso
    // de que exista, eliminar la imagen previa.
}

const updateImageCloud = async (req = request, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }
    const { collection, id } = req.params;
    let model;
    try {
        switch (collection) {
            case "users":
                model = await User.findById(id);
                break;

            case "cervezas":
                model = await Cerveza.findById(id)
                break;
        }

        //Si tiene atributo img y existe el fichero lo eliminamos
        if (model.img) {
            const nombreArr = modelo.img.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');
            cloudinary.uploader.destroy(public_id);
        }

        const { tempFilePath } = req.files.file;
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath);
        model.img = secure_url;
        await model.save();
        res.status(200).json(model);

    }
    catch (msg) {
        return res.status(400).json({ msg })
    }
    // Subir el fichero a la carpeta con el nombre de la colección recibida y en el caso
    // de que exista, eliminar la imagen previa.
}
const getImage = async (req = request, res = response) => {

    const { collection, id } = req.params;
    let model;
    try {
        switch (collection) {
            case "users":
                model = await User.findById(id);
                break;

            case "cervezas":
                model = await Cerveza.findById(id)
                break;
        }

        //Si tiene atributo img y existe el fichero lo eliminamos
        if (model.img) {
            const imagePath = path.join(__dirname, '../uploads', collection, model.img)
            if (fs.existsSync(imagePath)) {
                return res.sendFile(imagePath)
            }
        }
        const notFound = path.join(__dirname, '../assets', 'download.png')
        res.status(200).sendFile(notFound)

    }
    catch (msg) {
        return res.status(400).json({ msg })
    }
    // Subir el fichero a la carpeta con el nombre de la colección recibida y en el caso
    // de que exista, eliminar la imagen previa.
}




module.exports = {
    upload,
    updateImage,
    getImage,
    updateImageCloud
}