import { useState } from "react";
import { Courier, TransportType } from "../types/delivery";


export const CourierManager = () : JSX.Element => {
    const [couriers, setCouriers] = useState<Courier[]>([
        {
            id: 'C-1',
            name: 'Иван Петров',
            phone: '+79012345678',
            transport: 'Car',
            currentOrderId: null
        },
        {
            id: 'C-2',
            name: 'Алексей Сидоров',
            phone: '+79011112233',
            transport: 'Bicycle',
            currentOrderId: null
        },
        {
            id: 'C-3',
            name: 'Петр Александров',
            phone: '+79023334455',
            transport: 'Foot',
            currentOrderId: null
        },
    ]);

    const [selectedTransport, setSelectedTransport] = useState<TransportType | null>(null);

    const [newCourierName, setNewCourierName] = useState<string>('');

    const handleAddCourier = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCourierName.trim() || !selectedTransport) return;

        const newCourier: Courier = {
            id: `C-${Date.now()}`,
            name: newCourierName,
            phone: '000',
            transport: selectedTransport,
            currentOrderId: null
        };
        setCouriers((prev) => [...prev, newCourier]);
        setNewCourierName('');
        setSelectedTransport(null);
    };

    return(
        <div style={{
            padding: '16px',
            border: '1px dashed #a584fc'
        }}>
            <h3>Регистрация курьеров подразделения</h3>
            <form 
                onSubmit={handleAddCourier} 
                style={{
                    marginBottom: '16px',
                    display: 'flex',
                    gap: '8px'
                }}
            >
                <input 
                    type="text" 
                    value={newCourierName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCourierName(e.target.value)}
                    placeholder="ФИО курьера"
                    style={{
                        padding: '6px',
                        border: '1px solid #ccc'
                    }}
                />
                <select
                    style={{
                        padding: '6px',
                        border: '1px solid #ccc'
                    }}
                    value={selectedTransport || ''}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedTransport(e.target.value as TransportType)}
                >
                    <option value="" disabled>Выберете транспорт</option>
                    <option value="Foot">Пешком</option>
                    <option value="Bicycle">Велосипед</option>
                    <option value="Car">Автомобиль</option>
                </select>
                <button 
                    type="submit"
                    style={{
                        backgroundColor: '#10b981',
                        color: '#fff',
                        padding: '6px, 12px',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Добавить
                </button>
            </form>
            <ul>
                {couriers.map(c => (
                    <li key={c.id}>
                        <b>{c.name}</b> - {c.transport}
                        {c.currentOrderId ? `(В пути: №${c.currentOrderId})` : ' (Свободен)'}
                    </li>
                ))}
            </ul>
        </div>
    );
}