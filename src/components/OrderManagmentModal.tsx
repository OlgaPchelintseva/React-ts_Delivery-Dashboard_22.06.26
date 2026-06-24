import { useState } from "react";
import { DeliveryStatus, DeliveryOrder } from "../types/delivery";

interface OrderManagmentModalProps{
    order: DeliveryOrder;
    onClose: () => void;
    onUpdateStatus: (orderId: string, nextStatus: DeliveryStatus) => void;
    onAssingCourier: (orderId: string, courierName: string) => void;
};

export const OrderManagmentModal = ({order, onClose, onUpdateStatus, onAssingCourier}: OrderManagmentModalProps): jsx.Element => {
    const [courierInput, setCourierInput] = useState<string>('');
    const allStatuses: DeliveryStatus[] = ['Pending', 'In_Transit', 'Delivered', 'Cancelled'];
    const handleCourierSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!courierInput.trim()) return;
        onAssingCourier(order.id, courierInput.trim());
        setCourierInput('');
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '24px',
                width: '100%',
                maxWidth: '500px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <h3>Управление заказом</h3>
                    <button 
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none'
                        }}    
                    >&times;</button>
                </div>
                <p style={{
                    color: '#687280',
                    marginBottom: '16px'
                }}>
                    <b>Текущий адрес доставки:</b> {order.customAdress}
                </p>
                <div>
                    <label>Изменить статус на: </label>
                    <select
                        value={order.status}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onUpdateStatus(order.id, e.target.value as DeliveryStatus)}
                    >
                        {allStatuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <form onSubmit={handleCourierSubmit}>
                        <label>Назначить нового курьера</label>
                        <input 
                            type="text"
                            value={courierInput}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCourierInput(e.target.value)}
                        />
                        <button
                            type="submit"
                        >
                            Назначить
                        </button>
                    </form>
                    {order.assignedCourier && (
                        <p>Сейчас заказ выполняет {order.assignedCourier.name}</p>
                    )}
                </div>
                <button onClick={onClose}>Готово</button>
            </div>
        </div>
    );
}