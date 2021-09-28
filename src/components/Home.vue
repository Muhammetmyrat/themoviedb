<template>
	<section>
		<Header />
			<Loader v-if="isLoading" />
				<section class="container py-5">
					<div v-for="group in groupedMovies" class="card-deck">
						<Movies v-for="movie in group"  :key="movie.id" :movie="movie" />
					</div>
				</section>
	</section>
</template>

<script >
import Header from './Header.vue'
import Loader from '../components/Loader.vue'
import Movies from './Movies.vue'
import {mapGetters} from 'vuex'

export default{
	data() {
	return{
		isLoading: true,
	}
},
	components: { Header, Loader, Movies },
	 methods: {
},
	computed: {
		...mapGetters(['movies','groupedMovies'])
},
	created() {
		this.$store.dispatch('fetchMovies')
		.then(() => {
		this.isLoading = false;
	});
 }
};
</script>
