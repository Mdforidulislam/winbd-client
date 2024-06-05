const Title = ({ text }) => {
    return (
        <div className="flex h-[0.9rem] items-start gap-[3px]">
            <div className="h-[90%] rounded-sm border-l-[3.5px] border-DarkGreen">
            </div>
            <h1 className="text-white capitalize flex-1 flex items-center" style={{ lineHeight: '0.7rem', fontSize: '0.9rem' }}>{text}</h1>
        </div>
    );
};

export default Title;
