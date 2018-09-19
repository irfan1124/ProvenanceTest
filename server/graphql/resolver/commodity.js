import models from '../../db/config/config'
import { uuidToBuffer, bufferToUUID } from '../../helper/uuid/index'
import joinMonster from 'join-monster';
import { map, assign} from 'lodash';

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
        CreateCommodity: async (parent, {input}, {knex, dialect}, info) => {
            input.CommodityGUID = uuidToBuffer(input.CommodityGUID);
            let result = await knex('Commodity').insert(input);
            input.CommodityID = result[0];
            input.CommodityGUID = bufferToUUID(input.CommodityGUID);
            console.log(input);
            return input;
        },
        CreateCommoditywithCommodityData: async (parent, {input}, {knex, dialect}, info) => {
            console.log(input); 
            input.Commodity.CommodityGUID = uuidToBuffer(input.Commodity.CommodityGUID);
            let commodityResult = await knex('Commodity').insert(input.Commodity);
            if(commodityResult && input.CommodityData.length > 0) {
                //add commodityID to CommodityData object
                let CommodityDataObj =  map(input.CommodityData, function(element) { 
                                            return assign({}, element, {CommodityID: commodityResult[0], CommodityDataGUID: uuidToBuffer(element.CommodityDataGUID) }); 
                                        });
                console.log(CommodityDataObj);
                let commodityDataResult = await knex('CommodityData').insert(CommodityDataObj);
                console.log(commodityDataResult);
            }
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
