// src/contexts/EventContext.js
import React, { createContext, useContext, useCallback } from 'react';

const EventContext = createContext();

export const useEvent = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
    const emit = useCallback((event, data) => {
        // Aqui você pode implementar a lógica de manipulação de eventos
        // Por exemplo, usando o PubSub pattern, EventEmitter ou outra solução
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    }, []);

    return (
        <EventContext.Provider value={{ emit }}>
            {children}
        </EventContext.Provider>
    );
};
