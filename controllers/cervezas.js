const { response, request } = require('express');
const Cerveza = require('../models/cerveza');
async function getBeers(req, res) {
    const {Nombre, Envase } = req.query
    const query = {Nombre, Envase}
    for (const key in query) {
        if (query[key] === undefined) {
          delete query[key];
        }
      }
    // res.json(db.cervezas.find(query))
    const cervezas = await Cerveza.find(query)
    res.json(cervezas)
}

function getBeer(req = request, res = response) {
    const id = req.params.id
    const beers = db.cervezas.find({ _id: id });
    if (beers.length) {
        res.json(beers);
    } else {
        res.json({ message: `La cerveza ${id} no existe` })
    }

}

async function addBeer(req = request, res = response) {
    // const beer = req.body
    // const inserted = db.cervezas.save(beer)
    // res.json(inserted)
    const userC = req.user
    console.log(req.user)
    const user = userC._id
    console.log(user)
    const { Nombre, Descripción, Graduación, Envase, Precio } = req.body;
    const cerveza = new Cerveza({ Nombre, Descripción, Graduación, Envase, Precio, user });

    // Guardar en BD
    await cerveza.save();

    res.json({
        cerveza
    });
}

function deleteBeer(req = request, res = response) {
    const beerId = req.params.id;
    const removed = db.cervezas.remove({ _id: beerId });
    res.json(removed);
}

function editBeer(req = request, res = response) {
    const beerId = req.params.id;
    const beer = req.body;
    const updatedBeer = db.cervezas.update({ _id: beerId }, beer);

    res.json(updatedBeer);
}

module.exports = { getBeers, getBeer, addBeer, deleteBeer, editBeer }