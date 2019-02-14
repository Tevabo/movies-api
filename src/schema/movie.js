import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
    type Query {
        movies: [Movie]
        movie(id: ID, imdb_id: String): Movie
    }
    type Mutation {
        upvoteMovie (
            movieId: Int!
        ): Movie 
    }

    type Mutation {
        rateMovie (
            movieId: Int!
            rating: ReviewInput!
        ): Movie
    }

    input ReviewInput {
        value: Int!
        comment: String!
    }

    interface Media {
        type: ID!
        title: String!
        media_type: String!
    }

    type Movie implements Media {
        id: ID!
        budget(currency: Currency = EUR): Int
        title: String!
        media_type: String!
        duration: Int!
        box_office: Int!
        release_date: String
        production_companies: [ProductionCompany]
    }

    type TVShow implements Media {
        id: ID!
        title: String!
        media_type: String!
        episodes: [Episode]!
        running: Boolean
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

    union SearchResult = Movie | TVShow | TVShowEpisode | Company | Person

`;

const resolvers = {

};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema