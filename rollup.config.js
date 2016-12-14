// rollup.config.js

export default {
  entry: 'src/cssobj-helper-stylize.js',
  moduleName: 'cssobj_helper_stylize',
  moduleId: 'cssobj_helper_stylize',
  targets: [
    { format: 'iife', dest: 'dist/cssobj-helper-stylize.iife.js' },
    { format: 'amd',  dest: 'dist/cssobj-helper-stylize.amd.js'  },
    { format: 'cjs',  dest: 'dist/cssobj-helper-stylize.cjs.js'  },
    { format: 'es',   dest: 'dist/cssobj-helper-stylize.es.js'   }
  ]
}
