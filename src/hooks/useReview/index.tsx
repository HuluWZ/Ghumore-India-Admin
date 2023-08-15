import { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getCategories, createCategory, deleteCategory, updateCategory } from '../../api/reviewApi';
import { useNotification } from '../useNotification';

export const ReviewContext = createContext({} as any);


export const ReviewProvider = ({ children }: any) => {
    const queryClient = useQueryClient();
    const { showNotification } = useNotification()

    const { data: reviews, isLoading, error } = useQuery('reviews', getCategories);
    console.log("all reviews api level", reviews);
    const { mutate: createReviewMutation } = useMutation(createCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
            showNotification('Activity created successfully', 'success')
        },

        onError: (error: any) => {
            showNotification(error.message, 'error')
        }

    });

    const { mutate: updateReviewMutation } =
        useMutation((data: any) => updateCategory(data.id, data), {
            onSuccess: () => {
                queryClient.invalidateQueries('categories');
                showNotification('Activity updated successfully', 'success')
            },

            onError: (error: any) => {
                showNotification(error.message.response.data.message, 'error')
            }
        });


    const { mutate: deleteReviewMutation } = useMutation(deleteCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
            showNotification('Activity deleted successfully', 'success')
        },

        onError: (error: any) => {
            showNotification(error.message.response.data.message, 'error')
        }
    });

    const value = {
        reviews,
        isLoading,
        error,
        createReviewMutation,
        updateReviewMutation,
        deleteReviewMutation,
    };

    return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>;
};

export const useReview = () => useContext(ReviewContext);