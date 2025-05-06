import RequestCard from "./RequestCard";
import { getAllRequestsThunk } from "../../store/slice/request/requestThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const RequestList = () => {
  const dispatch = useDispatch();
  const { allRequests } = useSelector((state) => state.requestReducer);
  // console.log(allRequests)

  useEffect(() => {
    dispatch(getAllRequestsThunk());
  }, []);
  // console.log("her")
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50">
      {allRequests?.map((request) => {
        return <RequestCard key={request?._id} request={request} />;
      })}
    </div>
  );
};

export default RequestList;