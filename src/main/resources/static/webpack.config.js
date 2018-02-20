var config = {
   entry: './main.js',
   output: {
      filename: 'bundle.js'
   },
   devServer: {
      inline: true,
      port: 8090
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react', 'stage-2' ]
            }
         }
      ]
   }
}
module.exports = config;