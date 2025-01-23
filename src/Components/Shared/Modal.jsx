import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function FormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Reset form after submission (optional)
  } = useForm();

  // Function to open the modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form submitted data:", data);
    // Optionally reset the form fields after submission
    reset();
    // Close modal after successful submission
    closeModal();
  };

  return (
    <div>
      {/* Button to open the modal */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-6 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition duration-300 shadow-md"
        >
          Add
        </button>
      </div>

      {/* Modal that is conditionally rendered */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-stone-900 bg-opacity-75 flex justify-center items-center z-50"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-content"
        >
          <div className="bg-slate-900 rounded-lg w-1/3 p-6 shadow-lg">
            <div className="border-b pb-4 flex justify-between items-center">
              <h1 id="modal-title" className="text-xl font-bold text-white">
                Connect
              </h1>
              {/* Close button for modal */}
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="text-white"
              >
                &times;
              </button>
            </div>
            {/* Form inside modal */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Example input fields */}
              <input defaultValue="test" {...register("example")} />
              <input
                {...register("exampleRequired", { required: true })}
                placeholder="Required field"
              />
              {errors.exampleRequired && <span>This field is required</span>}
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300 shadow-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
