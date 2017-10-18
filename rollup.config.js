import uglify from 'rollup-plugin-uglify';
export default {
	input: 'js/index.js',
	output: {
		file: 'js/index.min.js',
		format: 'iife',
		plugins: [
			uglify(),
		],
		sourcemap: true,
	}
};
