const webpack = require('webpack')

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                BITBUCKET_CLIENT_ID: JSON.stringify(process.env.BITBUCKET_CLIENT_ID),
                FIXED_WORKSPACE_ID: JSON.stringify(process.env.FIXED_WORKSPACE_ID)
            }
        })
    ]
}
