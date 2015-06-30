module.exports = {
  prefix: '',
  default_middleware: [ 'middleware.middleware1', 'middleware.middleware2'],
  routes: [
    [ 'get'    , '/users'                 , [ 'middleware.middleware3', 'middleware.middleware4' ] , 'users.index'   ],
    [ 'get'    , '/users.format'          , [ 'middleware.middleware3', 'middleware.middleware4' ] , 'users.index'   ],
    [ 'get'    , '/users/new'             , [ 'middleware.middleware3', 'middleware.middleware4' ] , 'users.new'     ],
    [ 'get'    , '/users/new.format'      , [ 'middleware.middleware3', 'middleware.middleware4' ] , 'users.new'     ],
    [ 'post'   , '/users'                 , [ 'middleware.middleware3', 'middleware.middleware4' ] , 'users.create'  ],
    [ 'post'   , '/users.format'          , [ 'middleware.middleware3', 'middleware.middleware4' ] , 'users.create'  ],
    [ 'get'    , '/users/:id'             , [ 'middleware.middleware3', 'middleware.middleware4' ] , 'users.show'    ],
    [ 'get'    , '/users/:id.format'      , [ 'middleware.middleware3', 'middleware.middleware4' ] , 'users.show'    ],
    [ 'get'    , '/users/:id/edit'        , [ 'middleware.middleware3', 'middleware.middleware4' ] , 'users.edit'    ],
    [ 'get'    , '/users/:id/edit.format' , [ 'middleware.middleware3', 'middleware.middleware4' ] , 'users.edit'    ],
    [ 'post'   , '/users/:id'             , [ 'middleware.middleware3', 'middleware.middleware4' ] , 'users.update'  ],
    [ 'post'   , '/users/:id.format'      , [ 'middleware.middleware3', 'middleware.middleware4' ] , 'users.update'  ],
    [ 'delete' , '/users/:id'             , [ 'middleware.middleware3', 'middleware.middleware4' ] , 'users.destroy' ],
    [ 'delete' , '/users/:id.format'      , [ 'middleware.middleware3', 'middleware.middleware4' ] , 'users.destroy' ]
  ]
};