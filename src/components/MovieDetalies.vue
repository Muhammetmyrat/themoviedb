<template>
 <section>
 	<Loader v-if='isLodaing' />
 		<section v-if='hasImage'>
 			<BackdropImage :imageName="movie.backdrop_path" />
 				<div class="container pt-5">
 					<div class="row">
 						<div class="col-sm-4">
 							<Poster :posterName="movie.poster_path" />
 						</div>
 						<div class="col-sm-8 details">
 							<h2>{{ movie.title }}</h2>
 							<p>{{ movie.overview }}</p>
 							<div> Runtime: {{runtime}} </div>
 							<div>Average Rating: {{movie.vote_average.toFixed(1)}}</div>
 							<div>Budget: {{movie.budget}}</div>
 							<div>Production Company: {{movie.production_companies[0].name}}</div>
 							<div>Production Country: {{movie.production_countries[0].name}}</div>
 							<div>Release Date: {{movie.release_date}}</div>
 							<div>Popularity: {{movie.popularity}}</div>
 							<div>Spoken Languages: {{movie.spoken_languages[0].english_name}}</div>
 							<div>Tagline: {{movie.tagline}}</div>
 							<br />
 							<b><a :href="officalTrailer">Official Trailer</a></b>
 							<a :href="getTickets" class="btn btn-success tickets-button">Bilet alyň</a>
 						</div>
 					</div>
 				</div>
 		</section>
	</section>
</template>

<script>
import Loader from '../components/Loader.vue'
import BackdropImage from '../components/BackdropImage.vue'
import Poster from '../components/Poster.vue'
export default{
	data() {
		return {
			isLodaing: true,
			hasImage: false
		}
	},
components: { Loader, BackdropImage, Poster },
created() {
	this.$store.dispatch('fetchMovieDetalies', this.movieId)
		.then(() => {
			this.isLodaing = false;
			this.hasImage = true;
		});
	},
computed: { 
	movieId() {
			return this.$route.params.id;
		},
		movie() {
			return this.$store.state.movieDetalies[this.movieId];
		},
		runtime() {
			const {runtime} = this.movie;

			const hours = Math.floor(runtime/60);
			const minutes = runtime - (60*hours);

			return `${hours}h ${minutes}m`;
		},
		officalTrailer() {
			return this.movie.homepage;
		},
		getTickets() {
		return `/movie/${this.movieId}/tickets`;
	  }
},
	
};
</script>

<style>
.details{
	color: #fff;
}
.tickets-button{
	position: absolute;
	top: 0;
	right: 15px;
	border-radius: 30px;
}
</style>