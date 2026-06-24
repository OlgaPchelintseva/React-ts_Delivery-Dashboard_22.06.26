import React, { createContext, useContext, useState, ReactNode } from "react";
import { DeliveryOrder, DeliveryStatus } from "../types/delivery";


// Глобальное состояние для отслеживания жизненного цикла данных
type DeliveryState = 
    | {status: 'LOADING'}
    | {status: 'SUCCESS'; data: DeliveryOrder[]}
    | {status: 'ERROR'; message: string}

interface DeliveryContextType {
    state: DeliveryState;
    updateOrderStatus: (orderId: string, nextStatus: DeliveryStatus) => void;
    assignCourierToOrder: (orderId: string, courierName: string) => void;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined); // undefined для перехвата ошибок вызова вне провайдера

export const DeliveryProvider = ({children}: {children: ReactNode}): JSX.Element => {
    const [state, setState] = useState<DeliveryState>({
        status: 'SUCCESS',
        data: [
            {
                id: '101', 
                customAdress: 'Lenina st', 
                itemsCount: 3, 
                totalPrice: 1500,
                status: 'Pending',
                assignedCourier: null,
                createdAt: '2026-06-22'
            },
            {
                id: '102', 
                customAdress: 'Sovetskaya st', 
                itemsCount: 1, 
                totalPrice: 4500,
                status: 'In_Transit',
                assignedCourier: {
                    id: 'C-1',
                    name: 'Ivan Ivanov',
                    phone: '123',
                    transport: 'Car',
                    currentOrderId: '102'
                },
                createdAt: '2026-06-22'
            },
            {
                id: '103', 
                customAdress: 'Kirova st', 
                itemsCount: 2, 
                totalPrice: 2300,
                status: 'Delivered',
                assignedCourier: {
                    id: 'C-1',
                    name: 'Ivan Ivanov',
                    phone: '123',
                    transport: 'Foot',
                    currentOrderId: '103'
                },
                createdAt: '2026-06-22'
            },
        ]
    });

    const updateOrderStatus = (orderId: string, nextStatus: DeliveryStatus) => {
        if (state.status !== 'SUCCESS') return;
        const updateOrders = state.data.map(order => 
            order.id === orderId ? {...order, status: nextStatus} : order
        );
        setState({status: 'SUCCESS', data: updateOrders});
    };

    const assignCourierToOrder = (orderId: string, courierName: string) => {
        if (state.status !== 'SUCCESS') return;
        const updateOrders = state.data.map(order => {
            if (order.id === orderId){
                return {
                    ...order,
                    status: 'In_Transit' as DeliveryStatus,
                    assignedCourier: {
                        id: `C-${Date.now()}`,
                        name: courierName,
                        phone: '89876543210',
                        transport: 'Bicycle' as const,
                        currentOrderId: orderId
                    }
                };
            }
            return order;
        });
        setState({status: 'SUCCESS', data: updateOrders});
    };

    return(
        <DeliveryContext.Provider
            value={{state, updateOrderStatus, assignCourierToOrder}}
        >
            {children}
        </DeliveryContext.Provider>
    );
}

export const useDelivery = () => {
    const context = useContext(DeliveryContext);
    if (!context) {
        throw new Error('ERROR');
    }
    return context;
}