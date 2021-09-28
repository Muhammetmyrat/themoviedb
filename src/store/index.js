import Vue from 'vue'
import Vuex from 'vuex'
import service from '../services/service'

Vue.use(Vuex)

export default new Vuex.Store({
state:{
  movies: [],
  movieDetalies: {},
  halls: {},
  movieTimes: {},
  ticketPrices: [],
  soldTickets: {},
  selectedTime: null,
  selectedTicketCounts: null,
  selectedMovieId: null,
  selectedMovieHallId: null,
  selectedSeats: null,
 },
getters: {
  movies(state){
  	return state.movies;
	},
  groupedMovies(state){
    const grouped = [];

    state.movies.forEach((movie, index) => {
  		if(index%3 === 0){
  			grouped.push([]);
  		}
  			grouped[grouped.length - 1].push(movie);
  	});	
  	return grouped;
 	}
},
mutations: {
  setMovies(state, movies) {
      state.movies = movies;
  },
  setMovieDetalies(state, payload) {
    const {id, data} = payload;
    state.movieDetalies[id] = data;
    },
  setMovieTickets(state, payload) {
    const {id, data} = payload;
    state.movieTimes[id] = data;
    },
  setTicketPrices(state, prices) {
    state.ticketPrices = prices;
    },
  setSelectedTime(state, time) {
      state.selectedTime = time;
    },
  setSelectedTicketOptions(state, tickets) {
      state.selectedTicketCounts = tickets;
    },
  setSelectedMovieId(state, id) {
      state.selectedMovieId = id;
    },
  setSelectedMovieHallId(state, id) {
      state.selectedMovieHallId = id;
    },
  setSeatingMap(state, data) {
    const { hallId, seating } = data;
    state.halls[hallId] = seating;
  },
  setSoldTickets(state, data) {
    const { movieId, time, tickets } = data;
    state.soldTickets[movieId] = state.soldTickets[movieId] || {};
    state.soldTickets[movieId][time] = tickets;
  },
  setSelectedSeats(state, seats) {
    state.selectedSeats = seats;
  }
},

actions: {
  fetchMovies(context) {
  	return service.fetchMovies()
  		.then(snapshot => { 
  			context.commit('setMovies', snapshot.val());
    });
  },

fetchMovieDetalies(context, id) {
  return service.fetchMovieDetalies(id)
   	.then(snapshot => {
   		context.commit('setMovieDetalies', {
   		id: id,
   		data: snapshot.val(),
   		});
  	});
	},

	fetchMovieTimes(context, id) {
		return service.fetMovieTickets(id)
		.then(snapshot => {
			context.commit('setMovieTickets', {
				id: id,
				data: snapshot.val(),
			});
		});
	},

  fetchTicketPrices(context) {
    return service.fetchTicketPrices()
    .then(snapshot => {
      context.commit('setTicketPrices', snapshot.val())
    });
  },
  fetchSeatMap(context, hallId) {
    return service.fetchSeating(hallId).then((snapshot) => {
      context.commit('setSeatingMap', { hallId, seating: snapshot.val() });
    });
  },
  fetchSoldTickets(context, { movieId, time }) {
    return service.fetchSoldTickets({ movieId, time }).then((snapshot) => {
      context.commit('setSoldTickets', { movieId, time, tickets: snapshot.val() });
    });
  },
  fetchTicketingInfo(context, id) {
    return context.dispatch('fetchTicketPrices').then(() => {
      return context.dispatch('fetchMovieTimes', id).then(() => {
        return context.dispatch('fetchSeatMap', hallId).then(() => {
          return context.dispatch('fetchSoldTickets', {movieId, time})
        })
      });
    });
  },
  fetchSeatingInfo(context, { movieId, time, hallId }) {
    return context.dispatch('fetchSeatMap', hallId).then(() => {
      return context.dispatch('fetchSoldTickets', { movieId, time });
    });
  }
},
modules: {
 }
})
