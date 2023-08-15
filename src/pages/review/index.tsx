import React, { useState } from "react";
import PageView from "../../components/PageView";
import LoadingComponent from "../../components/LoadingComponent";
import CategoriesView from "./CategoryList";
import FormDialog from "./CategoryModal";
import { AddCircleRounded } from "@mui/icons-material";
import ConfirmModal from "../../components/ConfirmModal";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getCategories, createCategory, deleteCategory, updateCategory } from '../../api/reviewApi';
import { useNotification } from "../../hooks/useNotification";



const Categories = () => {
  

  
  
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
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

  if (isLoading) return (
    <PageView
      title="Feedback"
      backPath="/app/dashboard"
      actions={[
        {
          icon: <AddCircleRounded style={{ fontSize: "1rem" }} />,
          label: "Add Feedback",
          handler: () => setOpen(true),
          otherProps: {
            sx: {
              ml: "auto",
              fontSize: "10px",
            },
            variant: "contained",
          },
        },
      ]}
    >
      <LoadingComponent />
    </PageView>
  )

  return (
    <PageView
      title="Feedback"
      backPath="/app/dashboard"
      actions={[
        {
          icon: <AddCircleRounded style={{ fontSize: "1rem" }} />,
          label: "Add Feedback",
          handler: () => setOpen(true),
          otherProps: {
            sx: {
              ml: "auto",
              fontSize: "10px",
            },
            variant: "contained",
          },
        },
      ]}
    >
      <FormDialog
        open={open}
        handleClose={() => {
          setOpen(false)
          setSelectedCategory(null)
        }
        }
        handleAdd={createReviewMutation}
        selectedCategory={selectedCategory}
        handleEdit={updateReviewMutation}
        setSelectedCategory={setSelectedCategory}
      />

      <ConfirmModal
        open={openConfirm}
        handleClose={() => setOpenConfirm(false)}
        handleConfirm={() => {
          console.log(selectedCategory," Selected Category ")
          deleteReviewMutation(selectedCategory.id);
          setOpenConfirm(false);
        }}
        title="Delete Feedback"
        description="Are you sure you want to delete this feedback?"
        confirmText="Delete"
        cancelText="Cancel"
      />


      <CategoriesView
        categories={reviews}
        setSelectedCategory={setSelectedCategory}
        setOpen={setOpen}
        setOpenConfirm={setOpenConfirm}
      /> 
    </PageView>
  );
};



export default Categories;