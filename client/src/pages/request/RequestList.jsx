import React, { useEffect } from "react";
import RequestCard from "./RequestCard";
import { getAllRequestsThunk } from "../../store/slice/request/requestThunk";
import { useDispatch, useSelector } from "react-redux";

const RequestList = () => {
  const dispatch = useDispatch();
  const { allRequests } = useSelector((state) => state.requestReducer);
  // console.log(allRequests)

  useEffect(() => {
    dispatch(getAllRequestsThunk());
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50">
      {allRequests?.map((request) => {
        return <RequestCard key={request?.seekerId} request={request} />;
      })}
    </div>
  );
};

export default RequestList;
