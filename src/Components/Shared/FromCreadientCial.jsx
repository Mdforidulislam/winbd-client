import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';

export const FromCreadiencial = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle form submission
  const onSubmit = async (info) => {

    const {data} = await axios.post("https://server.win-pay.xyz/marchent-add",{
      marchentinfo : info
    });

    console.log(data,'check submit data here !!')

    if(data?.data?.message === "Merchant already exists"){
      console.log('Merchant already exists');
      const {data} = await axios.put("https://server.win-pay.xyz/marchent-update",{
        marchentinfo: info
      });

      console.log(data)
    }

    // Close modal after submitting data
    setIsModalOpen(false);
  };

  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = localStorage.getItem("userData");
        const userId = JSON.parse(response)?.uniqueId || "defaultUser";
  
        // Make the API call
        const { data } = await axios.get(`https://server.win-pay.xyz/margent-get?marchent_Id=${userId}`);
        console.log(data, 'Check if data exists or not!');
  
        // Dynamically reset form fields with default and dynamic values
        reset({
          marchent_Id: userId,
          username: data?.data?.username || "defaultPass", // Use data from API if available
          password: data?.data?.password || "defaultSecretKey",
          api_key: data?.data?.api_key || "defaultApiKey",
          secret_key: data?.data?.secret_key || "defaultSecretKey",
          method: data?.data?.method || "defaultItem",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    // Call the async function
    fetchData();
  }, [reset]);
  

  return (
    <div>
      <div className="flex gap-3">
        {/* Open Modal Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 bg-slate-800 text-white rounded-md hover:bg-blue-500 transition duration-200"
        >
          Add Account Credential
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 bg-slate-800 text-white rounded-md hover:bg-blue-500 transition duration-200"
        >
          Edit Account Credential
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-2/5">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-xl text-gray-400 hover:text-white"
            >
              X
            </button>

            <h2 className="text-xl font-semibold mb-6 text-center text-white">User Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         
              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: "Username is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter your username"
                      className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700"
                    />
                  )}
                />
                {errors.username && (
                  <span className="text-red-500 text-sm">
                    {errors.username.message}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                      className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700"
                    />
                  )}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* API Key Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  API Key
                </label>
                <Controller
                  name="api_key"
                  control={control}
                  rules={{ required: "API key is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter your API key"
                      className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700"
                    />
                  )}
                />
                {errors.api_key && (
                  <span className="text-red-500 text-sm">
                    {errors.api_key.message}
                  </span>
                )}
              </div>

              {/* Secret Key Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Secret Key
                </label>
                <Controller
                  name="secret_key"
                  control={control}
                  rules={{ required: "Secret key is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter your secret key"
                      className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700"
                    />
                  )}
                />
                {errors.secret_key && (
                  <span className="text-red-500 text-sm">
                    {errors.secret_key.message}
                  </span>
                )}
              </div>

              {/* Seleted Items Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Seleted method
                </label>
                <Controller
                  name="method"
                  control={control}
                  render={({ field }) => (
                     <select
                      {...field}
                      className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700"
                    >
                      <option value="defaultItem">Select Method</option>
                      <option value="bkash">Bkash</option>
                      <option value="nagad">Nagad</option>
                      <option value="rocket">Rocket</option>
                    </select>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
