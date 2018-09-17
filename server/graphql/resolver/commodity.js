import models from '../../db/config/config'
import joinMonster from 'join-monster';

export default {
    Query: {
        commodity: (parent, args, {knex, dialect}, info) => {
            return joinMonster(info, args, sql => {
                        console.log("sql by");
                        console.log(sql);
                        return knex.raw(sql).then(result => result[0])
                }, dialect);
        }, 
        commodities: (parent, args, {knex, dialect}, info) => {
            return joinMonster(info, args, sql => {
                        console.log("sql all");
                        console.log(sql);
                        return knex.raw(sql).then(result => result[0])
                }, dialect);
        }, 
    },
	Mutation: {
        createCommodity: (parent, {input}, {knex, dialect}) => {
            return knex('Commodity').returning([input.localName]).insert(input).then( (resp) => { console.log(resp) });
        }
    },
    Commodity: {
    //     commodityGUID: ({ commodityGUID }, args, ctx, info) =>  {
    //         console.log('convert BIN to GUID', commodityGUID.toString());
    //         return '1256812A-BA53-11E8-9349-029786BD25B2'
    //    }
    }
}
