import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";

const App = () => {
	const [title, setTitle] = useState("");
	const [movie, setMovie] = useState(null);
	const [error, setError] = useState("");

	const handleSearch = (e) => {
		e.preventDefault();
		searchMovie(title);
	};

	const searchMovie = async (title) => {
		setMovie(null);
		try {
			const response = await axios.get(`http://www.omdbapi.com/?apiKey=922db138&t=${title}`);

			setMovie(response.data);
		} catch (err) {
			setError(`Error occured ${err}`);
			console.log(err);
		}
	};

	const getGenres = (genre) => {
		if (genre.length) {
			return genre.split(",");
		}
		return [];
	};

	return (
		<Container fluid>
      <div className={'movie-head'}>
      <Form>
				<Form.Group controlId='title'>
					<Form.Label>Movie title</Form.Label>
					<Form.Control type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter title' />
					<Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
				</Form.Group>
				<Button variant='primary' onClick={handleSearch}>
					Search
				</Button>
			</Form>
      </div>
		
    <div>
			{movie && movie.Response === "True" && (
				<Card>
					<Card.Body>
						<Card.Title>{movie.Title}</Card.Title>
						<Card.Text>{movie.Plot}</Card.Text>
						<Card.Text>{new Date(movie.Released).getFullYear()}</Card.Text>
						<ul>
							{getGenres(movie.Genre).map((g, i) => (
								<li key={i}>{g}</li>
							))}
						</ul>
					</Card.Body>
				</Card>
			)}
			{movie && movie.Response === "False" && (
				<Card>
					<Card.Body>
						<Card.Title></Card.Title>
						<Card.Text>{movie.Error}</Card.Text>
					</Card.Body>
				</Card>
			)}
      </div>
      {error && <Alert variant="warning">{error}</Alert>}
		</Container>
	);
};

export default App;
