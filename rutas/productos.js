const express = require('express');
const ruta = express.Router();

const data = [
    {id: 1, nombre: 'zapato A', valor: 223.3, enstock: true, createOn: new Date()},
    {id: 2, nombre: 'zapato B', valor: 223.3, enstock: true, createOn: new Date()},
    {id: 3, nombre: 'zapato C', valor: 223.3, enstock: true, createOn: new Date()},
    {id: 4, nombre: 'zapato D', valor: 223.3, enstock: true, createOn: new Date()},
    {id: 5, nombre: 'zapato E', valor: 223.3, enstock: true, createOn: new Date()},
];
ruta.get('/',function(req,res){
    res.status(200).json(data);
});

ruta.get('/:id',function(req,res){
    let found= data.find(function(item){
        return item.id === parseInt(req.params.id);
    });
    if(found){
        res.status(200).json(found);
    }else{
        res.sendStatus(404);
    }


});

ruta.post('/',function(req,res){
    let itemIds = data.map(item=> item.id);
    //let orderNums = data.map(item=>item.order);

    let newId = itemIds.length > 0 ? Math.max.apply(Math,itemIds )+ 1 : 1;
    //let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math,orderNums) + 1 :1;

    let newItem = 
    {   id: newId, 
        nombre: req.body.nombre, 
        valor:req.body.valor, 
        enstock: false, 
        createOn: new Date()};
    data.push(newItem);
    res.status(201).json(newItem);

})

ruta.put('/:id',function(req,res){
    let found = data.find(function(item){
        return item.id === parseInt(req.params.id);
    });
    if(found){
        let updated = 
    {   id: found.id, 
        nombre: req.body.nombre, 
        valor:req.body.valor, 
        enstock: req.body.enstock, 
        };

        let targetIndex = data.indexOf(found);

        data.splice(targetIndex,1,updated);
        res.status(204).json(updated);
    }else{
        res.sendStatus(500);
    }
});


ruta.delete('/:id',function(req,res){
    let found = data.find(function(item){
        return item.id === parseInt(req.params.id);
    });
    if(found){
        let targetIndex = data.indexOf(found);
        data.splice(targetIndex,1);
    }
    res.sendStatus(204)
});

module.exports = ruta;