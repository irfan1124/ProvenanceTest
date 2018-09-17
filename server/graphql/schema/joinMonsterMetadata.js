import { escape, format } from 'sqlstring';

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
                console.log(args.TokenID)
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
                sqlColumn: 'commodityGUID'
            },
        },
       
    }
}