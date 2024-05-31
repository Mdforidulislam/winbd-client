
const GlobalSearch = () => {
    return (
        <div>
             <div  className="w-full flex justify-end  ">
                    <form className="flex" >
                        <input className="py-2 px-4 w-full rounded-l-md focus:outline-none bg-neutral-900 text-white" type="text" name="search" placeholder="Search" />
                        <button className="bg-[#333953] px-6 text-xl text-white py-2 rounded-r-md" type="submit">Search</button>
                    </form>
                    
                </div>
        </div>
    );
};

export default GlobalSearch;