import React, { useState } from "react";
import PageView from "../../components/PageView";
import { useCategory } from "../../hooks/useReview";
import LoadingComponent from "../../components/LoadingComponent";
import CategoriesView from "./CategoryList";
import FormDialog from "./CategoryModal";
import { AddCircleRounded } from "@mui/icons-material";
import ConfirmModal from "../../components/ConfirmModal";


const Categories = () => {
  const { categories, isLoading, error, deleteCategoryMutation, createCategoryMutation, updateCategoryMutation } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  console.log(" All Review = ", categories);

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
        handleAdd={createCategoryMutation}
        selectedCategory={selectedCategory}
        handleEdit={updateCategoryMutation}
        setSelectedCategory={setSelectedCategory}
      />

      <ConfirmModal
        open={openConfirm}
        handleClose={() => setOpenConfirm(false)}
        handleConfirm={() => {
          console.log(selectedCategory," Selected Category ")
          deleteCategoryMutation(selectedCategory.id);
          setOpenConfirm(false);
        }}
        title="Delete Feedback"
        description="Are you sure you want to delete this feedback?"
        confirmText="Delete"
        cancelText="Cancel"
      />


      <CategoriesView
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        setOpen={setOpen}
        setOpenConfirm={setOpenConfirm}
      />

      
    </PageView>
  );
};



export default Categories;