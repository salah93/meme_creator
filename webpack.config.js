module.exports = {
    output: {
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              query: {
                presets: [
                  'react',
                  'stage-0',
                ],
              },
            },
            {
              test: /\.css$/,
              loader: 'style-loader!css-loader',
            },
        ],
    },
};
