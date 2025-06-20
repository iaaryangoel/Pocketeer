import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/APIpaths";

const ShowLoveButton = () => {
  const [count, setCount] = useState(0);
  const [loved, setLoved] = useState(false);

  useEffect(() => {
    fetchLoveCount();
  }, []);


  // GETTING LOVE COUNT
  const fetchLoveCount = async () => {
    try {
      const res = await axiosInstance.get(
        `${API_PATHS.LOVE.GET_LOVE}`
      )
      setCount(res.data.count);
    } catch (err) {
      console.error("Failed to fetch love count");
    }
  };

  // UPDATING LOVE COUNT
  const toggleLove = async () => {
    try {
      const res = await axiosInstance.post(
        `${API_PATHS.LOVE.UPDATE_LOVE}`,
        {
          increment: !loved,
        }
      );
      setCount(res.data.count);
      setLoved(!loved);
    } catch (err) {
      console.error("Failed to toggle love");
    }
  };

  return (
    <div className="text-center mt-4 mb-6">
      <div className="text-pink-600 text-2xl font-semibold">{count}</div>
      <div className="flex justify-center mt-1">
      <button
        onClick={toggleLove}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full border ${
          loved ? "bg-pink-500 text-white" : "bg-white text-pink-500"
        }`}
      >
        <FaHeart />
        Show Love
      </button>
    </div>
  </div>
  );
};

export default ShowLoveButton;
