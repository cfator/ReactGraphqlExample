const { GraphQLServer } = require('graphql-yoga');
const moment = require('moment');
const { name, date } = require('faker');

const mockHotelData = require('./Data/Hotels.json');

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
		hotelId: mockHotelData[Math.floor(Math.random() * mockHotelData.length)].id,
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
    lng: Float!
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
		hotels: () => mockHotelData
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
