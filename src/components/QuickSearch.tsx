import { useRef, useEffect } from "react";

interface QuickSearchProps{
    onSearchSubmit: (query: string) => void;
}

export const QuickSearch = ({onSearchSubmit}: QuickSearchProps): JSX.Element => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const debounceTimerRef = useRef<number | null>(null);
    useEffect(() => {
        if (inputRef.current){
            inputRef.current.focus();
        }
        return () => {
            if (debounceTimerRef.current){
                window.clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    const heandleInputChange = () => {
        if (!inputRef.current) return;
        const currentText = inputRef.current.value;
        // сброс предыдущего отложенного вызова
        if (debounceTimerRef.current){
            window.clearTimeout(debounceTimerRef.current);
        }
        // новый таймер без триггера обновления всего компонента
        debounceTimerRef.current = window.setTimeout(() => {
            onSearchSubmit(currentText);
        }, 500);
    }

    return (
        <div style={{
            marginBottom: '20px',
            backgroundColor: '#f3f4f5',
            padding: '12px'
        }}>
            <label 
                htmlFor="search-input"
                style={{
                    display: 'block',
                    marginBottom: '6px'
                }}
            >
                Мгновенный поиск по заказам:
            </label>
            <input 
                id="search-input"
                ref={inputRef}
                type="text" 
                onChange={heandleInputChange}
                placeholder="Введите адрес или номер заказа"
                style={{
                    width: '90%',
                    padding: '8px',
                    border: '1px solid #d1d5d8'
                }}
                />
        </div>
    );
}