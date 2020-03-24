const connection = require('../database/connection');

module.exports = {
    async create(req, res){
        const { id } = req.body;
        const ong = await connection
            .select('name')
            .from('Ongs')
            .where('id', id)
            .first();
            
        if(!ong){
            console.log(ong);
            return res.json({ error: 'No ONG found with this ID' });
        }
        return res.json(ong);
    }
}