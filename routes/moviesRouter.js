    const express = require('express');
    const router = express.Router();

    let movies = [
        { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 , category: "Sci-Fi" },
        { id: 2, title: "The Matrix", director: "The Wachowskis", year: 1999 , category: "Sci-Fi"},
        { id: 3, title: "Interstellar", director: "Christopher Nolan", year: 2014 , category: "Sci-Fi" },
        { id: 4, title: "The Godfather", director: "Francis Ford Coppola", year: 1972 , category: "Crime" },
        { id: 5, title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994 , category: "Crime" },
        { id: 6, title: "The Dark Knight", director: "Christopher Nolan", year: 2008 , category: "Action" },
        { id: 7, title: "Forrest Gump", director: "Robert Zemeckis", year: 1994 , category: "Drama" },
        { id: 8, title: "The Shawshank Redemption", director: "Frank Darabont", year: 1994 , category: "Drama" },
        { id: 9, title: "Fight Club", director: "David Fincher", year: 1999 , category: "Drama" },
        { id: 10, title: "The Lord of the Rings: The Return of the King", director: "Peter Jackson", year: 2003 , category: "Fantasy" },
        { id: 11, title: "The Avengers", director: "Joss Whedon", year: 2012 , category: "Action" },
        { id: 12, title: "Gladiator", director: "Ridley Scott", year: 2000 , category: "Action" },
        { id: 13, title: "Titanic", director: "James Cameron", year: 1997 , category: "Romance" },
        { id: 14, title: "Avatar", director: "James Cameron", year: 2009 , category: "Sci-Fi" },
        { id: 15, title: "The Lion King", director: "Roger Allers and Rob Minkoff", year: 1994 , category: "Animation" },
        { id: 16, title: "Jurassic Park", director: "Steven Spielberg", year: 1993 , category: "Sci-Fi" },
        { id: 17, title: "The Silence of the Lambs", director: "Jonathan Demme", year: 1991 , category: "Thriller" },
        { id: 18, title: "Saving Private Ryan", director: "Steven Spielberg", year: 1998 , category: "War" },
        { id: 19, title: "Braveheart", director: "Mel Gibson", year: 1995 , category: "War" },
        { id: 20, title: "Schindler's List", director: "Steven Spielberg", year: 1993 , category: "History" },
        { id: 21, title: "The Departed", director: "Martin Scorsese", year: 2006 , category: "Crime" },
        { id: 22, title: "Whiplash", director: "Damien Chazelle", year: 2014 , category: "Drama" },

    ];
    //obtener todos los movies
    router.get('/', (req, res) => {
        res.json(movies);
    });

    //obtener una pelicula por id
    router.get('/:id', (req, res) => {
        const { id } = req.params;
        const movie = movies.find(m => m.id === id);
        if (movie) {
            res.json(movie);
        }else {
            res.status(404).json({ message: 'Movie not found' });
        }
    }); 

    router.post('/', (req, res) => {
        const { title, director, year, category } = req.body;
        const newMovie = {
            id: movies.length + 1,
            title,
            director,
            year,
            category
        };
        movies.push(newMovie);
        res.status(201).json({ // ✅ 201 Created
            message: 'created',
            data: newMovie
        });
    });


    //Actualizar Pelicula 
    router.patch('/:id', (req, res) => {
        const { id } = req.params;
        const { title, director, year, category } = req.body;
        const movie = movie.find(m => m.id == id);
        if (movie) {
            if (title) movie.title = title;
            if (director) movie.director = director;
            if (year) movie.year = year;
            if (category) movie.category = category;
            res.json({
                message: 'updated',
                data: movie
            });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    });

    router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex(m => m.id == id); // Corregido
    if (movieIndex !== -1) {
        movies.splice(movieIndex, 1);
        res.json({ 
        message: 'deleted',
        id
        });
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
    });

    router.get('/', (req, res) => {
        res.json(movies); // ✅ 200 OK
    });
    module.exports = router;