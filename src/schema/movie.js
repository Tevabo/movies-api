import { makeExecutableSchema } from 'graphql-tools'
import http from 'request-promise-json'

const MOVIE_DB_API_KEY = process.env.MOVIE_DB_API_KEY
const OMDB_API_KEY =  process.env.OMDB_API_KEY

const typeDefs = `
    type Query {
        movies(year: String!): [Movie]
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
        tagline: String
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
//     episodes: [TVShowEpisode]!
//     running: Boolean
// }

const resolvers = {
    Query: {
      movie: async (obj, args, context, info) => {
        if (args.id) {
          return http
            .get(`https://api.themoviedb.org/3/movie/${args.id}?api_key=${MOVIE_DB_API_KEY}&language=en-US`)
        }
        if (args.imdb_id) {
          const results = await http
            .get(`https://api.themoviedb.org/3/find/${args.imdb_id}?api_key=${MOVIE_DB_API_KEY}&language=en-US&external_source=imdb_id`)
  
          if (results.movie_results.length > 0) {
            const movieId = results.movie_results[0].id
            return http
              .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIE_DB_API_KEY}&language=en-US`)
          }
        }
      },
      movies: async (obj, args, context, info) => {
        if(args.year)
          return http
          .get(`https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_DB_API_KEY}&primary_release_year=${args.year}&sort_by=vote_average.desc`)
          .then(response => response.results)

 
        
      },
    },
  };

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema