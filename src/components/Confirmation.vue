<template>
<div>
<Loader v-if='isLodaing' />
<section v-if="hasTickest">
  <div class="container text-center">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="card card-inverse card-success mt-5 col-md-6">
        <div class="card-block">
          <h2 class="card-title">Your tickets are ready!</h2>
          <p class="card-text">{{this.$store.state.movieDetails[this.$store.state.selectedMovieId].original_title}}</p>
          <p class="card-text">{{this.$store.state.halls[this.$store.state.selectedMovieHallId].name}}, {{this.$store.state.selectedTime}}</p>
          <p class="card-text">{{this.$store.state.selectedSeats.join(', ')}}</p>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</section>
</div>
</template>

<script>
import MovieDetalies from './MovieDetalies.vue';
  export default{
    name: 'Confirmation',
    mixins: [ MovieDetalies ],
    data() {
      return {
        hasTickest: false
      }
    },
    computed: {
      movieId() {
        return this.$route.params.id;
      }
    },
    created() {
      const info = {
        movieId: this.$route.params.id,
        time: this.$store.state.selectedTime,
        hallId: this.$store.state.selectedMovieHallId
      };

      this.$store.dispatch('fetchTicketingInfo', info)
      .then(() => {
        this.hasTickest = true;
      });
    }
  };
</script>

<style scoped=true>
  .container{
    margin-top: 150px; 
    margin-left: 440px;
    padding: auto;
  }
  .card-block{
    width: 500px;
    height: 100px;
    background-image: linear-gradient(to right, rgb(3,37,70), rgb(3,38,75));
    padding-top: 30px;
  }
  h2{
    color: white;
  }
</style>