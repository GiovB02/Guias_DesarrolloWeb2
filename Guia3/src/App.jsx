import { useEffect, useState } from "react";
import { Logo, Nav, NumResults, Search } from "./components/Nav";
import { Box } from "./components/Box";
import { MovieList } from "./components/Movie";
import { WatchedMoviesContainer, WatchedMoviesList, WatchedSummary } from "./components/WatchedMovie";
import { useFetchMovies } from "./hooks/useFetchMovies";
import { MovieDetails } from "./components/MovieDetails";


/**
 * Componente principal de la aplicación.
 * Maneja la búsqueda, selección y almacenamiento de películas vistas.
 */
export default function App() {
    // Estado para la búsqueda de películas
    const [query, setQuery] = useState("");

    // Hook personalizado para obtener películas
    const { movies, isLoading, error } = useFetchMovies(query);

    // Estado que almacena las películas vistas con persistencia en localStorage
    const [watched, setWatched] = useState(() => {
        const savedWatched = localStorage.getItem("watchedMovies");
        return savedWatched ? JSON.parse(savedWatched) : [];
    });

    // Estado que almacena el ID de la película seleccionada
    const [selectedId, setSelectedId] = useState(null);

    // Efecto para guardar las películas vistas en localStorage
    useEffect(() => {
        localStorage.setItem("watchedMovies", JSON.stringify(watched));
    }, [watched]);

    /**
     * Maneja la selección de una película.
     */
    function handleSelectMovie(id) {
        setSelectedId(id);
    }

    /**
     * Cierra los detalles de la película seleccionada.
     */
    function handleCloseMovie() {
        setSelectedId(null);
    }

    /**
     * Agrega una película a la lista de películas vistas.
     * @param {Object} movie - Película a agregar.
     */
    function handleAddWatched(movie) {
        setWatched((watched) => [...watched, movie]);
    }

    /**
     * Elimina una película de la lista de películas vistas.
     * @param {string} imdbID - ID de la película a eliminar.
     */
    function handleDeleteWatched(imdbID) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== imdbID));
    }

    return (
        <>
            <Nav>
                <Logo />
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </Nav>

            <main className="main">
                <Box>
                    {isLoading && <p className="loader">Cargando...</p>}
                    {error && <p className="error">⛔ {error}</p>}
                    <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
                </Box>

                <Box>
                    <WatchedMoviesContainer>
                        {selectedId ? (
                            <MovieDetails
                                selectedId={selectedId}
                                onCloseMovie={handleCloseMovie}
                                onAddWatched={handleAddWatched}
                                watched={watched}
                            />
                        ) : (
                            <>
                                <WatchedSummary watched={watched} />
                                <WatchedMoviesList watched={watched} onDeleteMovie={handleDeleteWatched} />
                            </>
                        )}
                    </WatchedMoviesContainer>
                </Box>
            </main>
        </>
    );
}
