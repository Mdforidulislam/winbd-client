const Title = ({ text }) => {
    return (
        <div className="flex h-[0.9rem] justify-start items-center gap-[6px]">
            <div className="h-full rounded-sm border-l-[3.5px] border-DarkGreen">
            </div>
            <h1 className="text-white capitalize flex-1 flex items-center" style={{ lineHeight: '0.7rem', fontSize: '0.9rem' }}>{text}</h1>
        </div>
    );
};

export default Title;
