// rollup.config.js

export default {
  entry: 'src/cssobj-plugin-stylize.js',
  moduleName: 'cssobj_plugin_stylize',
  moduleId: 'cssobj_plugin_stylize',
  targets: [
    { format: 'iife', dest: 'dist/cssobj-plugin-stylize.iife.js' },
    { format: 'amd',  dest: 'dist/cssobj-plugin-stylize.amd.js'  },
    { format: 'cjs',  dest: 'dist/cssobj-plugin-stylize.cjs.js'  },
    { format: 'es',   dest: 'dist/cssobj-plugin-stylize.es.js'   }
  ]
}
