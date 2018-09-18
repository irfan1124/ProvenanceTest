import models from '../../db/config/config'
import joinMonster from 'join-monster';

export default {
    Query: {
        Commodity: (parent, args, {knex, dialect}, info) => {
            console.log("args", args)
            return joinMonster(info, args, sql => {
                        console.log("sql by");
                        console.log(sql);
                        return knex.raw(sql).then(result => result[0])
                }, dialect);
        }, 
        Commodities: (parent, args, {knex, dialect}, info) => {
            return joinMonster(info, args, sql => {
                        console.log("sql all");
                        console.log(sql);
                        return knex.raw(sql).then(result => result[0])
                }, dialect);
        }, 
    },
	Mutation: {
        CreateCommodity: (parent, {input}, {knex, dialect}, info) => {
            //return knex('Commodity').returning([input.localName]).insert(input).then( (resp) => { console.log(resp) });
            let args = {CommodityID: 1};
            return joinMonster(info, args, sql => {
                console.log("sql CreateCommodity");
                console.log(sql);
            }, dialect);
            //return input;
        },
        CreateCommoditywithCommodityData: (parent, {input}, {knex, dialect}, info) => {
            console.log(input);
            knex('Commodity').returning([input.Commodity]).insert(input).then( (resp) => { console.log(resp) });
            return joinMonster(info, {args:3}, sql => {
                console.log("sql CreateCommodity");
                console.log(sql);
            }, dialect);
            return true;
        }
    },
    Commodity: {
    //     commodityGUID: ({ commodityGUID }, args, ctx, info) =>  {
    //         console.log('convert BIN to GUID', commodityGUID.toString());
    //         return '1256812A-BA53-11E8-9349-029786BD25B2'
    //    }
    }
}
