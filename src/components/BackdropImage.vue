<template>
	<img :src="imagePath" class="backdrop-image" />
</template>

<script>
	export default{
		data() {
			return {

			}
		},
props: {
	imageName: {
		type: String,
		required: true
		},
	},
computed: {
	imagePath() {
		return `https://image.tmdb.org/t/p/w1280${this.imageName}`;
		}
	},
};
</script>

<style>
.backdrop-image{
	width: 100%;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	filter: blur(5px);
	transform: scale(1.1);
}
</style>