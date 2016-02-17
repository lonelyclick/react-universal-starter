require("babel-core/register")({
     presets: ['es2015-node5', 'stage-3', 'react'],
     plugins: [
       'transform-react-constant-elements',
       'transform-react-inline-elements'
     ]
});

require('./server')
