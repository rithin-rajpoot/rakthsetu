import { useSelector } from "react-redux";
import DonorCard from "./DonorCard";
import Header from "../home/Header";

const MatchedDonors = () => {
  const { matchedDonors } = useSelector((state) => state.requestReducer);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 p-4 bg-gray-50">
        {matchedDonors?.map((donor) => (
          <DonorCard key={donor?._id} donor={donor} />
        ))}
      </div>
    </>
  );
};

export default MatchedDonors;
