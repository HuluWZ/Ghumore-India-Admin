import { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getSales, createSale, updateSale, deleteSale, getAllReport } from "../../api/salesApi";
import { useNotification } from '../useNotification';

export const SalesContext = createContext({} as any);


export const SalesProvider = ({ children }: any) => {
    const queryClient = useQueryClient();
    const { showNotification } = useNotification()

    const { data: sales, isLoading, error } = useQuery('sales', getSales);




    const { mutate: createSaleMutation } = useMutation(createSale, {
        onSuccess: () => {
            queryClient.invalidateQueries('sales');
            showNotification('Category Added successfully', 'success')
        },

        onError: (error: any) => {
            showNotification(error.message, 'error')
        }

    });

    const { mutate: updateSaleMutation } =
        useMutation((data: any) => updateSale(data.id, data), {
            onSuccess: () => {
                queryClient.invalidateQueries('sales');
                showNotification('Category updated successfully', 'success')
            },

            onError: (error: any) => {
                showNotification(error.message.response.data.message, 'error')
            }
        });


    const { mutate: deleteSaleMutation } = useMutation(deleteSale, {
        onSuccess: () => {
            queryClient.invalidateQueries('sales');
            showNotification('Category deleted successfully', 'success')
        },

        onError: (error: any) => {
            showNotification(error.message.response.data.message, 'error')
        }
    });



    const value = {
        sales,
        isLoading,
        error,
        createSaleMutation,
        updateSaleMutation,
        deleteSaleMutation,
    };

    return (
        <SalesContext.Provider value={value}>
            {children}
        </SalesContext.Provider>
    )
}


export const useSales = () => useContext(SalesContext);
