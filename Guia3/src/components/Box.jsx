import { useState } from "react";

/**
 * Componente que permite mostrar u ocultar su contenido.
 * @param {Object} props - Contiene los elementos hijos a mostrar.
 */
export const Box = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    );
};
