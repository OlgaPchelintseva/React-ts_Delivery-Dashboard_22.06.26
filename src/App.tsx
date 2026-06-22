import { useState } from 'react';
import { GenericList } from './components/GenericList';
import { DeliveryCard } from './components/DeliveryCard';

const DashboardConsole = (): JSX.Element => {
  const filteredOrders;

  const handleInteractOrder = (id: string) => {
    const courierName = prompt ('Введите имя курьера');
    if (courierName) {

    }
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px'
    }}>
      <header style={{
        borderBottom: '3px solid #4f46e5',
        paddingBottom: '12px',
        marginBottom: '24px'
      }}>
        <h1>Операционная панель управления заказами</h1>
      </header>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px'
      }}>
        <h2>Активные заказы</h2>
        <GenericList
          items={filteredOrders}
          emptyPlaceholder='Заказы не найдены'
          renderItem={(order) => {
            <DeliveryCard 
              order={order}
              onSelectedOrder={handleInteractOrder}
            />
          }}
        />
      </div>
    </div>
  );
}