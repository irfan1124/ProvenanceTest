import models from '../../db/config/config'
import joinMonster from 'join-monster';

const options = { dialect : 'mysql' };

export default {
    Query: {
        token: (parent, args, {knex, dialect}, info) => {
            return joinMonster(info, args, sql => {
                        console.log("sql");
                        console.log(sql);
                        return knex.raw(sql).then(result => result[0])
                }, dialect);
        }, 
        tokens: (parent, args, {knex, dialect}, info) => {
            // return db.song.findAll({})
            return joinMonster(info, args, sql => {
                        console.log("sql");
                        console.log(sql);
                        return knex.raw(sql).then(result => result[0])
                }, dialect);
        }, 
    },
	Mutation: {
        
    },
}
