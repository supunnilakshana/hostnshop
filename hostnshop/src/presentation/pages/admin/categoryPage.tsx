/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, {useState, useEffect} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components/ui/table";
import {Button} from "@/presentation/components/ui/button";
import {Input} from "@/presentation/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/presentation/components/ui/dialog";
import {PlusCircle, Pencil, Trash2, AlertCircle, Loader2} from "lucide-react";
import {Label} from "@/presentation/components/ui/label";

import {
  CreateCategoryDTO,
  ReadCategoryDTO,
  UpdateCategoryDTO,
} from "@/shared/dtos";
import AdminLayout from "@/presentation/components/admin/layout/adminLayout";
import {categoryService} from "@/lib/api/categoryService";

export default function CategoryPage() {
  const [categories, setCategories] = useState<ReadCategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] =
    useState<ReadCategoryDTO | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [categoryToDelete, setCategoryToDelete] =
    useState<ReadCategoryDTO | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await categoryService.getCategories();
      setCategories(response.data || []);
    } catch (err) {
      setError("An error occurred while fetching categories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) return;

    setIsSubmitting(true);
    try {
      const categoryData: CreateCategoryDTO = {
        name: categoryName.trim(),
      };

      await categoryService.createCategory(categoryData);
      await fetchCategories();
      setCategoryName("");
      setIsDialogOpen(false);
      setIsEditMode(false);
      setCurrentCategory(null);
    } catch (err) {
      setError("An error occurred while creating the category");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!currentCategory || !categoryName.trim()) return;

    setIsSubmitting(true);
    try {
      const categoryData: UpdateCategoryDTO = {
        name: categoryName.trim(),
      };

      await categoryService.updateCategory(currentCategory.id, categoryData);
      await fetchCategories();
      setCategoryName("");
      setIsDialogOpen(false);
      setIsEditMode(false);
      setCurrentCategory(null);
    } catch (err) {
      setError("An error occurred while updating the category");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;

    setIsSubmitting(true);
    try {
      await categoryService.deleteCategory(categoryToDelete.id);
      await fetchCategories();
      setIsDeleting(false);
      setCategoryToDelete(null);
    } catch (err) {
      setError("An error occurred while deleting the category");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openAddDialog = () => {
    setIsEditMode(false);
    setCurrentCategory(null);
    setCategoryName("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (category: ReadCategoryDTO) => {
    setIsEditMode(true);
    setCurrentCategory(category);
    setCategoryName(category.name);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (category: ReadCategoryDTO) => {
    setIsDeleting(true);
    setCategoryToDelete(category);
  };

  const resetForm = () => {
    setIsEditMode(false);
    setCurrentCategory(null);
    setCategoryName("");
    setError(null);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Category Management</h1>
          <Button
            className="bg-bg_primary hover:bg-btn_hover"
            onClick={openAddDialog}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="py-12 flex justify-center items-center">
              <Loader2 className="h-8 w-8 animate-spin text-bg_primary" />
            </div>
          ) : filteredCategories.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell>
                      {new Date(category.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(category)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => openDeleteDialog(category)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500">No categories found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Category Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditMode && currentCategory
                ? "Edit Category"
                : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                <p>{error}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="categoryName">Category Name</Label>
              <Input
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={isSubmitting || !categoryName.trim()}
              onClick={
                isEditMode && currentCategory
                  ? handleUpdateCategory
                  : handleCreateCategory
              }
              className="bg-bg_primary hover:bg-btn_hover"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>{isEditMode ? "Update" : "Create"}</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleting}
        onOpenChange={(open) => !open && setIsDeleting(false)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete the category &quot;
              {categoryToDelete?.name}&quot;? This action cannot be undone.
            </p>
            {error && (
              <div className="mt-4 bg-red-50 text-red-500 p-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                <p>{error}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleting(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteCategory}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
