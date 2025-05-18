/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/account/AddressBook.tsx
"use client";

import {useState, useEffect} from "react";
import {Button} from "@/presentation/components/ui/button";
import {Input} from "@/presentation/components/ui/input";
import {Label} from "@/presentation/components/ui/label";
import {Checkbox} from "@/presentation/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog";
import {Plus, Pencil, Trash2} from "lucide-react";
import {ReadShippingAddressDTO} from "@/shared/dtos";
import {apiClient} from "@/lib/api/client";

export default function AddressBook() {
  const [addresses, setAddresses] = useState<ReadShippingAddressDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] =
    useState<ReadShippingAddressDTO | null>(null);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postal_code: "",
    country: "US",
    is_default: false,
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setIsLoading(true);

    try {
      const response = await apiClient.get<{data: ReadShippingAddressDTO[]}>(
        "shipping-addresses"
      );

      // if (response.success) {
      setAddresses(response.data);
      // }
    } catch (error) {
      // console.error("Failed to fetch addresses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({...prev, is_default: checked}));
  };

  const resetForm = () => {
    setFormData({
      address: "",
      city: "",
      postal_code: "",
      country: "US",
      is_default: false,
    });
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiClient.post<{data: ReadShippingAddressDTO}>(
        "shipping-addresses",
        formData
      );

      // if (response.success) {
      setAddresses((prev) => [...prev, response.data]);
      setIsAddDialogOpen(false);
      resetForm();
      // }
    } catch (error) {
      console.error("Failed to add address:", error);
      alert("Failed to add address. Please try again.");
    }
  };

  const handleEditAddress = (address: ReadShippingAddressDTO) => {
    setCurrentAddress(address);
    setFormData({
      address: address.address,
      city: address.city,
      postal_code: address.postal_code,
      country: address.country,
      is_default: address.is_default,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentAddress) return;

    try {
      const response = await apiClient.put<{data: ReadShippingAddressDTO}>(
        `shipping-addresses/${currentAddress.id}`,
        formData
      );

      // if (response.success) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === currentAddress.id ? response.data : addr
        )
      );
      setIsEditDialogOpen(false);
      setCurrentAddress(null);
      resetForm();
      // }
    } catch (error) {
      console.error("Failed to update address:", error);
      alert("Failed to update address. Please try again.");
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      const response = await apiClient.delete<{success: boolean}>(
        `shipping-addresses/${id}`
      );

      if (response.success) {
        setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete address:", error);
      alert("Failed to delete address. Please try again.");
    }
  };

  const handleSetDefaultAddress = async (id: string) => {
    try {
      const response = await apiClient.post<{data: ReadShippingAddressDTO}>(
        `shipping-addresses/${id}/default`,
        {}
      );

      // if (response.success) {
      setAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          is_default: addr.id === id,
        }))
      );
      // }
    } catch (error) {
      console.error("Failed to set default address:", error);
      alert("Failed to set default address. Please try again.");
    }
  };

  const renderAddressForm = (
    submitHandler: (e: React.FormEvent) => Promise<void>
  ) => (
    <form onSubmit={submitHandler} className="space-y-4">
      <div>
        <Label htmlFor="address">Street Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="postal_code">Postal Code</Label>
          <Input
            id="postal_code"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
            {/* Add more countries as needed */}
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_default"
          checked={formData.is_default}
          onCheckedChange={handleCheckboxChange}
        />
        <Label htmlFor="is_default">Set as default address</Label>
      </div>

      <div className="pt-4 flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsAddDialogOpen(false);
            setIsEditDialogOpen(false);
            setCurrentAddress(null);
            resetForm();
          }}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-bg_primary hover:bg-btn_hover">
          {currentAddress ? "Update Address" : "Add Address"}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-textPrimary">Address Book</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-bg_primary hover:bg-btn_hover">
              <Plus className="mr-2 h-4 w-4" />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            {renderAddressForm(handleAddAddress)}
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bg_primary"></div>
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-textSecondary mb-4">
            You don&apos;t have any saved addresses yet.
          </p>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-bg_primary hover:bg-btn_hover"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Address
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`border rounded-md p-4 relative ${
                address.is_default
                  ? "border-bg_primary bg-purple-50"
                  : "border-gray-200"
              }`}
            >
              {address.is_default && (
                <span className="absolute top-2 right-2 bg-bg_primary text-white text-xs px-2 py-1 rounded-full">
                  Default
                </span>
              )}

              <div className="mt-2">
                <p className="text-textPrimary">{address.address}</p>
                <p className="text-textSecondary">
                  {address.city}, {address.postal_code}
                </p>
                <p className="text-textSecondary">{address.country}</p>
              </div>

              <div className="mt-4 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditAddress(address)}
                >
                  <Pencil className="mr-1 h-3 w-3" />
                  Edit
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="mr-1 h-3 w-3" />
                  Delete
                </Button>

                {!address.is_default && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefaultAddress(address.id)}
                  >
                    Set as Default
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
          </DialogHeader>
          {renderAddressForm(handleUpdateAddress)}
        </DialogContent>
      </Dialog>
    </div>
  );
}
