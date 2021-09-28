<template>
	<img :src="posterPath" class="poster" />
</template>

<script>
	export default{
		data() {
			return {

			}
		},
props: {
	posterName: {
		type: String,
		required: true
		},
	},
computed: {
	posterPath() {
		return `https://image.tmdb.org/t/p/w500${this.posterName}`;
		}
	},
};
</script>

<style>
.poster{
		width: 100%;
}
</style>