import { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getCategories, createCategory, deleteCategory, updateCategory } from '../../api/reviewApi';
import { useNotification } from '../useNotification';

export const ReviewContext = createContext({} as any);


export const ReviewProvider = ({ children }: any) => {
    const queryClient = useQueryClient();
    const { showNotification } = useNotification()

    const { data: categories, isLoading, error } = useQuery('categories', getCategories);
    console.log("all reviews");
    const { mutate: createCategoryMutation } = useMutation(createCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
            showNotification('Activity created successfully', 'success')
        },

        onError: (error: any) => {
            showNotification(error.message, 'error')
        }

    });

    const { mutate: updateCategoryMutation } =
        useMutation((data: any) => updateCategory(data.id, data), {
            onSuccess: () => {
                queryClient.invalidateQueries('categories');
                showNotification('Activity updated successfully', 'success')
            },

            onError: (error: any) => {
                showNotification(error.message.response.data.message, 'error')
            }
        });


    const { mutate: deleteCategoryMutation } = useMutation(deleteCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
            showNotification('Activity deleted successfully', 'success')
        },

        onError: (error: any) => {
            showNotification(error.message.response.data.message, 'error')
        }
    });

    const value = {
        categories,
        isLoading,
        error,
        createCategoryMutation,
        updateCategoryMutation,
        deleteCategoryMutation,
    };

    return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>;
};

export const useReview = () => useContext(ReviewContext);