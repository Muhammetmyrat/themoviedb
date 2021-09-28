<template>
<div>
	<Loader v-if='isLodaing' />
 		<section v-if='hasTicketingInfo'>
 			<BackdropImage :imageName="movie.backdrop_path" />
 				<div class="container pt-5">
 					<div class="row">
 						<div class="col-sm-4">
 							<Poster :posterName="movie.poster_path" />
 						</div>
 						<div class="col-sm-8 details">
 							<div class="movie-details">
 							<h2>{{ movie.title }}</h2>
 							<p>{{ movie.overview }}</p>
 							<div class="movie-times">
                <h5>{{movieTimes.hallName}}</h5>
                <p
                  v-for="(time, i) in movieTimes.times"
                  :key="i"
                  @click="selectTime(time)" :class="{ selected: time ===  selectedTime}">
                  {{time}}
                </p>
              </div>
              <div class="ticket-types">
                <div v-for="(ticket, i) in ticketPrices" :key="i">
                  <p @click="removeTicket(ticket.label)" 
                  		:class="{ disabled: !selectedTickets[ticket.label]}">-</p>
                  <div class="text">
                    <span class="label">
                      <span class="count" v-if="selectedTickets[ticket.label] > 0">
                        {{selectedTickets[ticket.label]}}
                      </span>
                      {{ticket.label}}
                    </span>
                    <span class="price">{{parseInt(ticket.price, 10).toFixed(2)}} TMT</span>
                  </div>
                  <p @click="addTicket(ticket.label)">+</p>
                </div>
                </div>
              		<button
                    @click="navigateToSeatSelection"
                    :disabled="!isTimeAndTicketCountSelected"
                    type="button"
                    class="btn btn-success">
                      Oturjak ýeriňizi saýlaň!
                  </button>
 						  </div>
 					  </div>
 				  </div>
 				</div>
 		</section>
</div>
</template>

<script>
import MovieDetalies from './MovieDetalies.vue';
export default{
	name: 'TicketSelection',
	mixins: [ MovieDetalies ],
	data() {
		return {
			hasTicketingInfo: false,
			selectedTime: null,
			selectedTickets: {}
		}
	},
 	created() {
 		this.$store.commit('setSelectedMovieId', this.movieId);
		this.$store.dispatch('fetchMovieTimes', this.movieId)
		.then(() => {
			this.hasTicketingInfo = true;
			this.setTicketTypes();
		});
		this.$store.dispatch('fetchTicketPrices');
	},
	computed: {
		movieId() {
			return this.$route.params.id;
		},
		movieTimes() {
			return this.$store.state.movieTimes[this.movieId];
		},
		ticketPrices() {
			let varbl =  this.$store.getters.setTicketPrices;
      console.log(varbl)
      return varbl
		},
		seatSelectionPath() {
      return `/movie/${this.movieId}/seat-selection`;
    },
    isTimeAndTicketCountSelected() {
      let selected = false;

      for (const key in this.selectedTickets) {
        if (this.selectedTickets[key] > 0) {
          selected = true;
        }
      }

      return selected && this.selectedTime;
    }
	},
	methods: {
		 selectTime(time) {
      this.selectedTime = time;
    },
    setTicketTypes() {
      let types = {};

      this.ticketPrices.forEach((ticket) => {
        types[ticket.label] = 0;
      });
      console.log(types)
      this.selectedTickets = types;
      console.log(this.selectedTickets)
    },
    addTicket(type) {
      this.selectedTickets[type] = Math.max(++this.selectedTickets[type], 0);
    },
     removeTicket(type) {
      this.selectedTickets[type] = Math.max(--this.selectedTickets[type], 0);
    },
     navigateToSeatSelection() {
      this.$store.commit('setSelectedTime', this.selectedTime);
      this.$store.commit('setSelectedTicketOptions', this.selectedTickets);
      this.$store.commit('setSelectedMovieHallId', this.movieTimes.hallId);
      this.$router.push(this.seatSelectionPath);
    },
	},
};
</script>

<style>
.movie-times p {
  display: inline-block;
  padding: 5px 20px;
  border: 1px solid #FFF;
  border-radius: 20px;
  margin-right: 10px;
  cursor: pointer;
}
.movie-times p.selected,
.movie-times p:hover,
.ticket-types p:not(.disabled):hover {
  background-color: #FFF;
  color: #000;
}
.ticket-types {
  margin-top: 30px;
}
.ticket-types p {
  font-size: 22px;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 2px solid #FFF;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  user-select: none;
  position: relative;
  top: -15px;
}
.ticket-types p.disabled {
  opacity: .33;
}
.ticket-types .text {
  display: inline-block;
  width: 175px;
  text-align: center;
}
.ticket-types .label {
  display: block;
  font-size: 24px;
  font-weight: bold;
}
</style>