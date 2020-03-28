const connection = require('../database/connection');

const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    async index(req,res){
        const ongs = await connection('Ongs').select('*');
        return res.json(ongs);
    },

    async create(req, res){
        const { name, email, city, whatsapp, uf } = req.body;
        const id = generateUniqueId();
        
        await connection('Ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
        return res.json({ id });
    }
}