import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { AuthContext } from "../../../../Authentication/Authentication";

const Drawer = ({ isOpen, onClose }) => {
  const [statuses, setStatuses] = useState(['Processing', 'Rejected', 'Approved', 'verify']);
  const [paymentTypes, setPaymentTypes] = useState(['deposite', 'withdraw']);
  const [dates, setDates] = useState(['Today', 'Yesterday', 'Last 7 days']);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedPaymentTypes, setSelectedPaymentTypes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [userName, setUsername] = useState('');
  const { setUserSearchData, setSelectedFilters, selectedFilters } = useContext(AuthContext);

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem('userData'))?.userName);
  }, []);

  useEffect(() => {
    const getingSearchValue = async () => {
      if (userName) {
        const getingResponse = await axios.get(`https://server.win-pay.xyz/userHistory?userName=${encodeURIComponent(userName)}`);
        const userSearchData = getingResponse?.data?.data;
        setUserSearchData(userSearchData);
      }
    };
    getingSearchValue();
  }, [userName, setUserSearchData]);

  const handleButtonClick = (type, value) => {
    if (type === 'status') {
      setSelectedStatuses(prevSelected => {
        const isSelected = prevSelected.includes(value);
        const newSelected = isSelected ? prevSelected.filter(status => status !== value) : [...prevSelected, value];
        const remainingStatuses = statuses.filter(status => !newSelected.includes(status));
        setStatuses([...newSelected, ...remainingStatuses]);
        // Update selected filters with current state values
        setSelectedFilters([...newSelected, ...selectedPaymentTypes, selectedDate]);
        return newSelected;
      });
    } else if (type === 'paymentType') {
      setSelectedPaymentTypes(prevSelected => {
        const isSelected = prevSelected.includes(value);
        const newSelected = isSelected ? prevSelected.filter(type => type !== value) : [...prevSelected, value];
        const remainingPaymentTypes = paymentTypes.filter(type => !newSelected.includes(type));
        setPaymentTypes([...newSelected, ...remainingPaymentTypes]);
        // Update selected filters with current state values
        setSelectedFilters([...selectedStatuses, ...newSelected, selectedDate]);
        return newSelected;
      });
    } else if (type === 'date') {
      setSelectedDate(value);
      setDates(prevDates => [value, ...prevDates.filter(date => date !== value)]);
      // Update selected filters with current state values
      setSelectedFilters([...selectedStatuses, ...selectedPaymentTypes, value]);
    }
  };

  if (!isOpen) {
    return null;
  }

  const handleActiongetingValueGeting = async () => {
    try {
      const queryString = selectedFilters
        .filter(item => item) 
        .map(item => `searchList=${encodeURIComponent(item)}`)
        .join('&');

      const getingResponse = await axios.get(`https://server.win-pay.xyz/userHistory?userName=${encodeURIComponent(userName)}&${queryString}`);
      const userSearchData = getingResponse.data.data;

      setUserSearchData(userSearchData);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 w-full pb-16 min-h-screen bg-black flex flex-col justify-between bg-opacity-100 transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div>
        <div className=" ">
          <div className="flex justify-start items-center gap-4 border-b-[0.5px] border-gray-800">
            <button onClick={onClose} className="p-3 border-[0.5px] border-gray-800 flex justify-center items-center">
              <span className="text-white text-xl"><IoIosArrowBack /></span>
            </button>
            <h2 className="text-[10.5px] md:text-xl font-bold pb-1 text-white/50">Transaction Record Filter</h2>
          </div>
        </div>

        <div className="px-2 py-1">
          <h3 className="text-[11px] text-white/90 mb-2">Status</h3>
          <div className="w-full grid grid-cols-3 gap-1.5">
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => handleButtonClick('status', status)}
                className={`py-1.5 rounded-sm text-[12px] text-white ${selectedStatuses.includes(status) ? 'bg-DarkGreen' : 'bg-GlobalDarkGray'}`}
              >
                <p className="capitalize">{status}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="px-2 py-1 mt-3">
          <h3 className="text-[11px] text-white/90 mb-2">Payment Type</h3>
          <div className="w-full grid grid-cols-3 gap-1.5">
            {paymentTypes.map(type => (
              <button
                key={type}
                onClick={() => handleButtonClick('paymentType', type)}
                className={`py-1.5 rounded-sm text-[12px] text-white ${selectedPaymentTypes.includes(type) ? 'bg-DarkGreen' : 'bg-GlobalDarkGray'}`}
              >
                <h1 className="capitalize">{type}</h1>
              </button>
            ))}
          </div>
        </div>

        <div className="px-2 py-1 mt-3">
          <h3 className="text-[11px] text-white/90 mb-2">Date</h3>
          <div className="w-full grid grid-cols-3 gap-1.5">
            {dates.map(date => (
              <button
                key={date}
                onClick={() => handleButtonClick('date', date)}
                className={`py-1.5 rounded-sm text-[12px] text-white ${selectedDate === date ? 'bg-DarkGreen' : 'bg-GlobalDarkGray'}`}
              >
                {date}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-2">
        <button
          onClick={handleActiongetingValueGeting}
          className="w-full bg-DarkGreen py-3 text-[13px] rounded text-center text-white"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Drawer;
