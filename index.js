const http = require('http');
const getBodyData = require('./utility/body');
let movies = [
  {
    "id": 46893,
    "url": "https://www.imdb.com/title/tt14179942/",
    "imdb_code": "tt14179942",
    "title": "Good Night Oppy",
    "title_english": "Good Night Oppy",
    "title_long": "Good Night Oppy (2022)",
    "slug": "good-night-oppy-2022",
    "year": 2022,
    "rating": 8.1,
    "runtime": 105,
    "genres": [
      "Documentary"
    ]
  },
  {
    id: 2,
    title: "Hello Code"
  }
]


const server = http.createServer(async (req, res) => {
  // !GET All Data
  if (req.url === '/movies' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'application/json charset=utf8'
    })

    const resp = {
      status: "OK",
      movies
    }

    res.end(JSON.stringify(resp))

  }else if (req.url === '/movies' && req.method === 'POST') {
    const data = await getBodyData(req)
    const { imdb_code, title, title_english, title_long, slug, year, rating, runtime } = JSON.parse(data)
    const newMovies = {
      imdb_code,
      title,
      title_english,
      title_long,
      slug, year,
      rating,
      runtime
    }
    movies.push(newMovies)
    const resp = {
      status: "OK",
      newMovies
    }

    res.writeHead(200, {
      'Content-Type': 'application/json charset=utf8'
    })
    res.end(JSON.stringify(resp))
  }else if (req.url.match(/\/movies\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[2]
    const movie = movies.find(m => m.id == id)

    res.writeHead(200, {
      'Content-Type': 'application/json charset=utf8'
    })

    const resp = {
      status: "OK",
      movie
    }
    res.end(JSON.stringify(resp))
  }else if (req.url.match(/\/movies\/\w+/) && req.method === 'PUT') {
    const id = req.url.split('/')[2]
    const data = await getBodyData(req)
    const { imdb_code, title, title_english, title_long, slug, year, rating, runtime } = JSON.parse(data)
    const idx = movies.findIndex(m => m.id == id)

    const changedMovies = {
      id: movies[idx].id,
      imdb_code: imdb_code || movies[idx].imdb_code,
      title: title || movies[idx].title,
      title_english: title_english || movies[idx].title_english,
      title_long: title_long || movies[idx].title_long,
      slug: slug || movies[idx].slug,
      year: year || movies[idx].year,
      rating: rating || movies[idx].rating,
      runtime: runtime || movies[idx].runtime
    }

    movies[idx] = changedMovies

    res.writeHead(200, {
      'Content-Type': 'application/json charset=utf8'
    })

    const resp = {
      status: "OK",
      movie: changedMovies
    }
    res.end(JSON.stringify(resp))
  }else if (req.url.match(/\/movies\/\w+/) && req.method === 'DELETE') {
    const id = req.url.split('/')[2]
    movies = movies.filter(m => m.id != id)

    res.writeHead(200, {
      'Content-Type': 'application/json charset=utf8'
    })

    const resp = {
      status: "OK"
    }

    res.end(JSON.stringify(resp))
  }

})
server.listen(8124, () => console.log('Server running on port: 8124'))