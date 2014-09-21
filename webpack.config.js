module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        './js/App.js'
    ],
    output: {
        path: './build',
        filename: 'App.bundle.js'
    }
};
