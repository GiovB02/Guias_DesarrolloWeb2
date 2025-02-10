/**
 * Componente que representa la barra de navegación de la aplicación.
 * @param {Object} props - Contiene los elementos hijos para renderizar en la barra de navegación.
 */
export const Nav = ({ children }) => (
    <nav className="nav-bar">{children}</nav>
);

/**
 * Componente que muestra el logo de la aplicación.
 */
export function Logo() {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>Palomitas de papel</h1>
        </div>
    );
}

/**
 * Componente que gestiona el campo de búsqueda de películas.
 * @param {Object} props - Contiene el estado y la función para modificar el término de búsqueda.
 */
export function Search({ query, setQuery }) {
    return (
        <input
            className="search"
            type="text"
            placeholder="Buscar películas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}

/**
 * Componente que muestra el número de resultados de búsqueda.
 * @param {Object} props - Contiene la lista de películas obtenidas.
 */
export function NumResults({ movies }) {
    return (
        <p className="num-results">
            <strong>{movies.length}</strong> resultados encontrados
        </p>
    );
}
