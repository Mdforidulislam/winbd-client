import React, { useState, useEffect } from 'react';
import { IoMdAdd } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

const UpdateModal = ({ setNewNote, setOpenModal, openModal, data }) => {
    const [formData, setFormData] = useState({
        title: data?.note?.title || '',
        list: data?.note?.list || [''],
        remainder: data?.note?.remainder || ''
    });


    useEffect(() => {
        setFormData({
            title: data?.note?.title || '',
            list: data?.note?.list || [''],
            remainder: data?.note?.remainder || ''
        });
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleListChange = (index, value) => {
        const newList = [...formData.list];
        newList[index] = value;
        setFormData({
            ...formData,
            list: newList,
        });
    };

    const addListItem = () => {
        setFormData({
            ...formData,
            list: [...formData.list, ''],
        });
    };

    const removeListItem = (index) => {
        const newList = formData.list.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            list: newList,
        });
    };

    const handleSubmit = () => {
        setNewNote(formData);
        setOpenModal(false);
    };

    return (
        <div className="flex items-center justify-start">
            <div onClick={() => setOpenModal(false)} className={`fixed z-[100] flex items-center justify-center ${openModal ? "opacity-1 visible" : "invisible opacity-0"} inset-0 bg-black/20 backdrop-blur-sm duration-100`}>
                <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-[90%] md:w-1/3 rounded-lg bg-GlobalDarkGray p-2 text-center drop-shadow-2xl ${openModal ? "opacity-1 translate-y-0 duration-300" : "translate-y-20 opacity-0 duration-1000"}`} >
                    <div className="relative flex flex-col items-center justify-center space-y-4 w-full py-4">
                        <div className="">
                            <span onClick={() => setOpenModal(false)} className="absolute top-2 right-0 md:top-0 rounded-md text-white cursor-pointer text-2xl bg-red-600"><IoCloseSharp /></span>
                        </div>
                        <div className="w-full px-8 overflow-auto max-h-[80vh]">
                            <div className="mb-2">
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full py-2 px-3 rounded-sm bg-GlobalGray focus:outline-none" placeholder="Start title.."
                                />
                            </div>
                            {/* list item here */}
                            <div className="">
                                {
                                    formData.list.map((item, index) => (
                                        <div key={index} className="flex justify-center mb-2 gap-2 items-center">
                                            <input
                                                type="text"
                                                name={`listItem${index}`}
                                                value={item}
                                                onChange={(e) => handleListChange(index, e.target.value)}
                                                className="w-full py-2 px-3 rounded-sm bg-GlobalGray focus:outline-none" placeholder="List item.." />
                                            
                                            {/* remove button here */}
                                            
                                            <button
                                                type="button"
                                                onClick={() => removeListItem(index)}
                                                className="bg-red-500 text-sm text-white py-2 px-3 rounded-sm hover:bg-red-600 transition duration-200"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                            {/* list item add button here  */}
                            <div className="flex justify-center my-2 mb-3">
                                <button
                                    type="button" // Ensure this button does not submit the form
                                    onClick={addListItem}
                                    className="bg-[#17936C] flex justify-center items-center text-white py-1 px-2 text-sm rounded-sm hover:bg-[#127354] transition duration-200"
                                >
                                    Add 
                                </button>
                            </div>
                            {/* last remainder title here */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="remainder"
                                    value={formData.remainder}
                                    onChange={handleChange}
                                    className="w-full py-2 px-3 rounded-sm bg-GlobalGray focus:outline-none" placeholder="End title.."
                                />
                            </div>
                            {/* note done or save button */}
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-[#17936C] text-white py-2 px-4 rounded-lg hover:bg-[#127354] transition duration-200"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateModal;
