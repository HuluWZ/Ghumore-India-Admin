import { createContext, useContext } from 'react';
import { getCustomers, createCustomer, getCustomerById, updateCustomer, deleteCustomer } from '../../api/locationApi';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNotification } from '../useNotification';

export const CustomerContext = createContext({} as any);


export const CustomerProvider = ({ children }: any) => {
    const queryClient = useQueryClient();
    const { showNotification } = useNotification();

    const { data: customers, isLoading: customersLoading, isError, error } = useQuery('customers', getCustomers);
    console.log(" Locations  All ",customers)
    const { mutate: createCustomerMutation, isLoading: createCustomerLoading } = useMutation(createCustomer, {
        onSuccess: () => {
            showNotification(' Location Added  successfully', 'success');
            queryClient.invalidateQueries('customers');
        },

        onError: (error: any) => {
            showNotification(error.message, 'error');
        }

    });

    const { mutate: updateCustomerMutation, isLoading: updateCustomerLoading } = useMutation((data: any) => updateCustomer(data.id, data), {
        onSuccess: () => {
            showNotification('Location updated successfully', 'success');
            queryClient.invalidateQueries('customers');
        },

        onError: (error: any) => {
            showNotification(error.message, 'error');
        }
    });

    const { mutate: deleteCustomerMutation, isLoading: deleteCustomerLoading } = useMutation(deleteCustomer, {
        onSuccess: () => {
            showNotification('Location Deleted  successfully', 'success');
            queryClient.invalidateQueries('customers');
        },

        onError: (error: any) => {
            showNotification(error.message, 'error');
        }
    });


    const value={
                customers,
                customersLoading,
                isError,
                createCustomerMutation,
                createCustomerLoading,
                updateCustomerMutation,
                updateCustomerLoading,
                deleteCustomerMutation,
                deleteCustomerLoading,
            }
    
    return 
    <CustomerContext.Provider value={value}>{children}
        </CustomerContext.Provider>
    
};


export const useLocation = () => useContext(CustomerContext);
