export default {
	fetchMovies() {
		return firebase.database().ref('/movies').once('value');
	},

	fetchMovieDetalies(id) {
		return firebase.database().ref(`/movieDetalies/${id}`).once('value');
	},

	fetMovieTickets(id) {
		return firebase.database().ref(`/movieTimes/${id}`).once('value');
	},

	fetchTicketPrices() {
		return firebase.database().ref('/ticketPrices').once('value');
	},

	fetchSeating(hallId) {
		return firebase.database().ref(`/halls/${hallId}`).once('value');
	},

	fetchSoldTickets({movieId, time}) {
		return firebase.database().ref(`/soldTickets/${movieId}/${time}`).once('value');
	}
  
}