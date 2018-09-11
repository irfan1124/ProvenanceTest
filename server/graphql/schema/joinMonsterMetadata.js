export default {
    Query: {
        fields: {
          // add a function to generate the "where condition"
          token: {
            where: (tokenTable, args, context) => {
                console.log(args.TokenID)
                if (args.TokenID) return `${tokenTable}.TokenID = ${args.TokenID}`
            }
          }
        }
    },
    Token: {
        //map the token object type to its SQL table
        sqlTable: 'Token',
        uniqueKey: 'TokenID',
        fields: {
            Token : {
                sqlColumn: 'Token'
            },
            IsExpired: {
                sqlColumn: 'IsExpired'
            },
            CreatedDate: {
                sqlColumn: 'CreatedDate'
            },
        },
       
    }
}