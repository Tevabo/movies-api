import { makeExecutableSchema } from 'graphql-tools'
import http from 'request-promise-json'

const MOVIE_DB_API_KEY = process.env.MOVIE_DB_API_KEY
const OMDB_API_KEY =  process.env.OMDB_API_KEY

const typeDefs = `
    type Query {
        movies: [Movie]
        movie(id: ID, imdb_id: String): Movie
    }
    type Mutation {
        upvoteMovie (
            movieId: Int!
        ): Movie,
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
        type: ID!
        media_type: String!
        duration: Int!
        box_office: Int!
        release_date: String
        production_companies: [ProductionCompany]
    }


    type ProductionCompany {
        name: String,
        id: Int        
    }
    type TVShow implements Media {
        id: ID!
        type: ID!
        title: String!
        media_type: String!
        running: Boolean
    }

    enum Currency {
        EUR
        GBP
        USD
      }

    union SearchResult = Movie | TVShow 


`;

// | TVShowEpisode | Company | Person

// type TVShow implements Media {
//     id: ID!
//     title: String!
//     media_type: String!
//     running: Boolean
// }

// type TVShow implements Media {
//     id: ID!
//     title: String!
//     media_type: String!
//     episodes: [TVShowEpisode]!
//     running: Boolean
// }

const resolvers = {

};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema