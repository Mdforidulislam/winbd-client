const Title = ({ text }) => {
    return (
        <div className="flex items-center gap-0.5">
            <div className="h-[14px] mt-0.5 rounded-sm border-l-[3.5px] border-DarkGreen">
            </div>
            <h1 className="text-white capitalize  pl-1 pb-[2px] text-sm">{text}</h1>
        </div>
    );
};

export default Title;