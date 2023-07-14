import { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getOrders, createOrder, updateOrder, deleteOrder, approveOrder ,orderReport} from "../../api/ordersApi";
import { useNotification } from '../useNotification';


export const OrderContext = createContext({} as any);

export const OrderProvider = ({ children }: any) => {
    const queryClient = useQueryClient();
    const { showNotification } = useNotification()

    const { data: orders, isLoading, isError } = useQuery('orders', getOrders);
    const { data: report, isLoading: reportLoading, isError: reportError } = useQuery('reportOrder', orderReport);

    console.log(" Orders L =  ", orders);

    const { mutate: createOrderMutation } = useMutation(createOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries('orders');
            showNotification('Booking created successfully', 'success')
        },

        onError: (error: any) => {
            showNotification(error.message, 'error')
        }

    });

    const { mutate: updateOrderMutation } =
        useMutation((data: any) => updateOrder(data.id, data), {
            onSuccess: () => {
                queryClient.invalidateQueries('orders');
                showNotification('Booking Status Changed successfully', 'success')
            },

            onError: (error: any) => {
                showNotification(error.message.response.data.message, 'error')
            }
        });

    const { mutate: approveOrderMutation } =
        useMutation((id: any) => approveOrder(id), {
            onSuccess: () => {
                queryClient.invalidateQueries('orders');
                showNotification('Booking approved successfully', 'success')
            },

            onError: (error: any) => {
                showNotification(error.message, 'error')
            }
        });

    const { mutate: deleteOrderMutation } = useMutation(deleteOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries('orders');
            showNotification('Booking deleted successfully', 'success')
        },

        onError: (error: any) => {
            showNotification(error.message.response.data.message, 'error')
        }
    });

    const value = {
        orders,
        isLoading,
        isError,
        report,
        reportLoading,
        reportError,
        createOrderMutation,
        updateOrderMutation,
        deleteOrderMutation,
        approveOrderMutation
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => useContext(OrderContext);
