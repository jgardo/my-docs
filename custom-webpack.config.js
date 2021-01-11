const webpack = require('webpack')

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                BITBUCKET_CLIENT_ID: JSON.stringify(process.env.BITBUCKET_CLIENT_ID)
            }
        })
    ]
}
