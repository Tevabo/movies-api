import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
    type Query {
        movie(id: ID): Movie
    }

    type Movie {
        id: ID!
        budget(currency: Currency = EUR): Int
        title: String
        release_date: String
        production_companies: [ProductionCompany]
    }

    type ProductionCompany {
        name: String,
        id: Int        
    }

    enum Currency {
        EUR
        GBP
        USD
      }
`;

const resolvers = {

};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema