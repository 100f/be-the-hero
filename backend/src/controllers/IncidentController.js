const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        const { page = 1 } = req.query;

        const [ count ] = await connection('Incidents').count();

        const incidents = await connection
            .select(
                'Incidents.*',
                'Ongs.name',
                'Ongs.id',
                'Ongs.whatsapp',
                'Ongs.city',
                'Ongs.uf'
            )
            .from('Incidents')
            .innerJoin('Ongs', 'Ongs.id','Incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5);

        res.header('X-Total-Count', count['count(*)']);
        return res.json(incidents);
    },

    async create(req, res){
        const { title, description, value} = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('Incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return res.json({ id });
    },

    async delete(req, res){
        const id = req.params.id;
        const ong_id = req.headers.authorization; //id da ong que está autenticada

        const incident = await connection
            .select('ong_id')
            .from('Incidents')
            .where('id', id)
            .first();

        if(incident.ong_id != ong_id)
            return res.status(401).json({error: "Non-Authorized Operation."});
        
        await connection('Incidents').where('id', id).delete();

        return res.status(204).send();
    }
}