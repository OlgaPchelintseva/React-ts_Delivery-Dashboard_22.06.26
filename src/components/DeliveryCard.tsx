import { DeliveryOrder } from "../types/delivery";

// контракт компонента 
interface DeliveryCardProps {
    order: DeliveryOrder; // пропс
    onSelectedOrder: (orderId: string) => void; // callback - функция обратного вызова  //void - пустота/ничего
}

export const DeliveryCard = ({order, onSelectedOrder}: DeliveryCardProps): JSX.Element => {
    const getStatusColor = (status: DeliveryOrder['status']): string => {
        switch (status){
            case 'Pending': return '#f59e0b';
            case 'In_Transit': return '#3bb2f6';
            case 'Delivered': return '#10b931';
            case 'Cancelled': return '#ef4444';
        }
    };

    return (
        <div style={{
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            padding: '15px',
            margin: '12px 0'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center' 
            }}>
                <h3>Заказ № {order.id}</h3>
                <span style={{
                    backgroundColor: getStatusColor(order.status),
                    color: '#fff',
                    padding: '4px, 8px',
                    borderRadius: '4px'
                }}>
                    {order.status}
                </span>
            </div>
            <p>Адрес: {order.customAdress}</p>
            <p>Количество товаров: {order.itemsCount}</p>
            <p>Сумма: {order.totalPrice}</p>
            
            {order.assignedCourier ? (
                <p style={{color: '#485563'}}>
                    <b>Курьер</b> {order.assignedCourier.name}({order.assignedCourier.transport})
                </p>
            ) : (
                <p style={{color: '#dc2626'}}>
                    Ожидает назначения курьера
                </p>
            )}
            <button
                onClick={() => onSelectedOrder(order.id)}
                style={{
                    backgroundColor: '#4f46e5',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 12px',
                    marginTop: '8px',
                    width: '100%',
                    cursor: 'pointer'
                }}
            >Управление заказом</button>
        </div>
    )
}
