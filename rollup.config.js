import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import { uglify } from 'rollup-plugin-uglify';

export default [{
  input: 'index.js',
  output: {
    format: 'umd',
    name: 'CallApp',
    file: 'dist/callapp.umd.min.js',
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    eslint({
      exclude: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    uglify(),
  ],
}, {
  input: 'index.js',
  output: {
    format: 'umd',
    name: 'CallApp',
    file: 'dist/callapp.umd.js',
    banner: '// https://github.com/jihonghai/callapp-lib',
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    eslint({
      exclude: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
  ],
}];
