module.exports = {
  prefix: '/landing-pages',
  default_middleware: [ 'middleware.middleware1', 'middleware.middleware2' ],
  routes: [
    [ 'get' , '/'                    , [ 'middleware.middleware3', 'middleware.middleware4' ], 'landing-pages.index'           ],
    [ 'get' , '/first-landing-page'  , [ 'middleware.middleware3', 'middleware.middleware4' ], 'landing-pages.first_lp'        ],
    [ 'get' , '/another-landing-page', [ 'middleware.middleware3', 'middleware.middleware4' ], 'landing-pages.another_lp'      ],
    [ 'get' , '/online-services'     , [ ]                                                   , 'landing-pages.online_services' ]
  ]
};