import { escape, format } from 'sqlstring';
import { resolve } from 'url';

export default {
    Query: {
        fields: {
          // add a function to generate the "where condition"
          token: {
            where: (tokenTable, args, context) => {
                console.log(args.tokenID)
                if (args.tokenID) return format(`${tokenTable}.TokenID = ?`, [args.tokenID])
            }
          },
          commodity: {
            where: (commodityTable, args, context) => {
                console.log(args.commodityID)
                if (args.commodityID) return format(`${commodityTable}.CommodityID = ?`, [args.commodityID])
            }
          }
        }
    },
    Token: {
        //map the token object type to its SQL table
        sqlTable: 'Token',
        uniqueKey: 'TokenID',
        fields: {
            tokenID : {
                sqlColumn: 'TokenID'
            },
            token : {
                sqlColumn: 'Token'
            },
            isExpired: {
                sqlColumn: 'IsExpired'
            },
            createdDate: {
                sqlColumn: 'CreatedDate'
            },
            userAgent: {
                sqlColumn: 'UserAgent'
            },
        },
    },
    Commodity: {
        //map the Commodity object type to its SQL table
        sqlTable: 'Commodity',
        uniqueKey: 'CommodityID',
        fields: {
            commodityID : {
                sqlColumn: 'CommodityID'
            },
            localName: {
                sqlColumn: 'LocalName'
            },
            quantity: {
                sqlColumn: 'Quantity'
            },
            created: {
                sqlColumn: 'Created'
            },
            commodityGUID: {
                sqlColumn: 'CommodityGUID',
                sqlExpr: commodityTable => format(`uuid_from_bin(${commodityTable}.CommodityGUID)`)
            },
            commoditiesData: {
                sqlJoin: (commodityTable, commodityDataTable, args) => format(`${commodityDataTable}.CommodityId = ${commodityTable}.CommodityId`)
            }
        }, 
    },
    CommodityData: {
        //map the Commodity object type to its SQL table
        sqlTable: 'CommodityData',
        uniqueKey: 'CommodityDataID',
        fields: {
            commodityDataID : {
                sqlColumn: 'CommodityDataID'
            },
            name: {
                sqlColumn: 'Name'
            },
            value: {
                sqlColumn: 'Value'
            },
            encoding: {
                sqlColumn: 'Encoding'
            },
            creatorUserID: {
                sqlColumn: 'CreatorUserID'
            },
            commodityID: {
                sqlColumn: 'CommodityID'
            },
            created: {
                sqlColumn: 'Created'
            },
            updated: {
                sqlColumn: 'Updated'
            },
            commodityDataGUID: {
                sqlColumn: 'CommodityDataGUID',
                sqlExpr: commodityDataTable => format(`uuid_from_bin(${commodityDataTable}.CommodityDataGUID)`)
            },
            isDeleted: {
                sqlColumn: 'IsDeleted',
                resolve: ({commodityData}) => {
                    console.log(commodityData.isDeleted);
                    return commodityData.isDeleted === 1 ? true : false
                }
            },
        },
    }
}