require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;
  
    beforeAll(async done => {
      execSync('npm run setup-db');
  
      client.connect();
  
      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });
      
      token = signInData.body.token; // eslint-disable-line
  
      return done();
    });
  
    afterAll(done => {
      return client.end(done);
    });

    test('returns location', async() => {

      const expectation = 
        {
          'formatted_query': 'Portland, Multnomah, Oregon, USA',
          'latitude': '45.5202471',
          'longitude': '-122.6741949'
        };

      const data = await fakeRequest(app)
        .get('/location?search=portland')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    //TEST FOR MUNGEWEATHER MUNGING FUNCTION 
    test('returns MUNGEWEATHER FUNCTION', async() => {
      const expectation =   [
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) },
        { forecast: expect.any(String), time: expect.any(String) }
      ];


      const data = await fakeRequest(app)
        .get('/weather?latitude=45.5202471&longitude=-122.6741949')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

 
    test('returns YELP MUNGE DATA', async() => {
      const expectation = [
        {
          'name': 'Voodoo Doughnut - Old Town',
          'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/qHrzQy5ih2Sjhn7MdsCASw/o.jpg',
          'price': '$',
          'rating': 3.5,
          'url': 'https://www.yelp.com/biz/voodoo-doughnut-old-town-portland-2?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Andina Restaurant',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/Ij9yv97Ch6NwKhNdpezRhw/o.jpg',
          'price': '$$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/andina-restaurant-portland?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Lechon',
          'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/wxLJSjqdB0v3wZSRqyNweg/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/lechon-portland?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Luc Lac',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/azr6sD6VeJbdaiO2aKvSsw/o.jpg',
          'price': '$$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/luc-lac-portland-7?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Deschutes Brewery Portland Public House',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/a-Av4dG6Xv3f1_XysFj4ow/o.jpg',
          'price': '$$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/deschutes-brewery-portland-public-house-portland?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Portland City Grill',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/-N8P6cTACCKnSuJaqeCyXg/o.jpg',
          'price': '$$$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/portland-city-grill-portland-7?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Cheryl’s on 12th',
          'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/w1tcp-5xJyQz19HH05JoVA/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/cheryl-s-on-12th-portland?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Screen Door',
          'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/lqmMYlLRV-aoH73koWA6Ew/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/screen-door-portland?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Q Restaurant & Bar',
          'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/jAH0XyZe5N8YTrOy71SuJg/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/q-restaurant-and-bar-portland?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Nong\'s Khao Man Gai',
          'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/jtp9n8HTjid4lEeXlcKKiA/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/nongs-khao-man-gai-portland-2?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Grassa',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/zloG1rU5-15Q4MVmf8inbA/o.jpg',
          'price': '$$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/grassa-portland?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Cuon - Vietnamese Street Food',
          'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/Zetji_yDJJDG8eksunYiTg/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/cuon-vietnamese-street-food-portland-3?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Salt & Straw',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/r6y-0Q2z3cnx1bQKxn-iHw/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/salt-and-straw-portland-2?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Stumptown Coffee Roasters',
          'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/ZRKWUoGRDo1FryxlHfooRw/o.jpg',
          'price': '$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/stumptown-coffee-roasters-portland?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Ground Kontrol Classic Arcade',
          'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/oU5nd95LfA3okpd9J_uPWg/o.jpg',
          'price': '$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/ground-kontrol-classic-arcade-portland-2?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Le Pigeon',
          'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/ARlFgwCNq62izXYf1TUQiA/o.jpg',
          'price': '$$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/le-pigeon-portland-2?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Olympia Provisions',
          'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/w8w2mkIrowArbwpzIInq9g/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/olympia-provisions-portland-2?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Lardo',
          'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/b0E-cDYYiWuvBxFH-YPONA/o.jpg',
          'price': '$$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/lardo-portland-4?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Mediterranean Exploration Company',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/AwxZ3eb04OiVH-92xKf_jg/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/mediterranean-exploration-company-portland-2?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        },
        {
          'name': 'Lan Su Chinese Garden',
          'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/gY4shaDsFS6IfRH2fyMTnw/o.jpg',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/lan-su-chinese-garden-portland?adjust_creative=yqz6mYcyIrsbuXKZ6eNw6Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=yqz6mYcyIrsbuXKZ6eNw6Q'
        }
      ];
      const data = await fakeRequest(app)
        .get('/reviews?latitude=45.5202471&longitude=-122.6741949')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(data.body).toEqual(expectation);
    });
  });
});
