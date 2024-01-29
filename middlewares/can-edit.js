const {request, response} = require('express');

const canEdit = (req=request, res=response, next)=>{
    if(!req.user){
        return res.status(500).json({
            msg: 'No se ha validado el token primero'
        })
    }

    const {rol, _id} = req.user;

    if (rol!== "ADMIN_ROLE"){
        //recuperar objeto que se quiere editar
        if(req.user._id==)
        return res.status(401).json({
            msg: `${name} no es administrador`
        })
    }

    next();
}

module.exports = {
    canEdit
}