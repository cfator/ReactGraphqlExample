const { GraphQLServer } = require('graphql-yoga');
const moment = require('moment');
const { name, date } = require('faker');

// mock hotel data
let hotelList = [
    {id: 1, name: "Hilton Anatole", lat: 32.799964, long: -96.828223},
    {id: 2, name: "Hilton Dallas Lincoln Centre", lat: 32.924109, long: -96.817416},
    {id: 3, name: "Hilton Dallas/Rockwall Lakefront", lat: 32.888335, long: -96.480977},
    {id: 4, name: "Hilton DFW Lakes Executive Conference", lat: 32.959467, long: -97.046903},
    {id: 5, name: "Hilton Dallas/Park Cities", lat: 32.863399, long: -96.809848},
    {id: 6, name: "Hilton Dallas/Southlake Town Square", lat: 32.945837, long: -97.130669},
    {id: 7, name: "Hilton Austin", lat: 30.265449, long: -97.738661},
    {id: 8, name: "Hilton Austin Airport", lat: 30.211447, long: -97.663813},
    {id: 9, name: "Hilton Palacio del Rio", lat: 29.422398, long: -98.487785},
    {id: 10, name: "Hilton San Antonio Hill Country", lat: 29.465228, long: -98.686723},
    {id: 11, name: "Hilton San Antonio Airport", lat: 29.521535, long: -98.502451}
];

let i = 0;

const generateMockReservation = (id) => {
    let d1 = moment(date.future(23));
    let d2 = moment(date.future(23));

    let arrival, departure;
    if (moment(d1).isAfter(d2)) {
        arrival = d2;
        departure = d1;
    } else {
        arrival = d1;
        departure = d2;
    }

    return {
        id: ++i,
        name: name.firstName() + ' ' + name.lastName(),
        hotelId: hotelList[Math.floor(Math.random() * hotelList.length)].id,
        arrivalDate: arrival.format(),
        departureDate: departure.format(),
    };
};

// runtime persistence of reservations with a few mocks to start
let reservationList = new Array(5).fill(undefined).map((reservations, i) => {
    return generateMockReservation(i);
});

// defined schema and resolvers
const typeDefs = `
  type Query {
    reservations: [Reservation!]!
    hotels: [Hotel!]!
    reservation(id: ID): Reservation!
  }

  type Reservation {
    id: Int!
    name: String!
    hotelId: ID!
    arrivalDate: String!
    departureDate: String!
  }

  type Location {
    lat: Float!
    long: Float!
  }

  type Hotel {
    id: ID!
    name: String!
    location: Location!
  }

  type Mutation {
  	createReservation(name: String!, hotelId: ID!, arrivalDate: String!, departureDate: String!): ID!
  }
`;

const resolvers = {
    Query: {
        reservations: () => reservationList,
        reservation: (obj, args, context, info) => {
            // since we're just simulating not too concerned about O(n) lookup
            let hit = reservationList.filter(item => {
                return item.id == args.id;
            });

            return hit[0];
        },
        hotels: () => hotelList
    },
    Mutation: {
        createReservation: (obj, args, context, info) => {
            // todo: validate params

            reservationList.push({
                id: ++i,
                name: args.name,
                hotelId: args.hotelId,
                arrivalDate: args.arrivalDate,
                departureDate: args.departureDate
            });

            return i;
        }
    }
};

const options = {port: 4000};
const server = new GraphQLServer({typeDefs, resolvers});
server.start(options, () => console.log('Server is running on localhost:' + options.port));
