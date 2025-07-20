import RequestCard from "./RequestCard";
import { getAllRequestsThunk } from "../../store/slice/request/requestThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getLocationName } from "../../../components/utils/latLongToName";
import { setLocationNameCache } from "../../store/slice/request/requestSlice";

const RequestList = () => {
  const dispatch = useDispatch();
  const { allRequests, locationNameCache } = useSelector((state) => state.requestReducer);
  const [locationNames, setLocationNames] = useState({});

  useEffect(() => {
    dispatch(getAllRequestsThunk());
  }, []);

  useEffect(() => {
    const fetchNames = async () => {
      const namesMap = { ...locationNameCache }; // Start with cached values
      const newNames = {}; // To be dispatched to Redux if fetched
  
      for (const request of allRequests) {
        const coords = request?.location?.coordinates;
        if (!coords) continue;
  
        const cached = locationNameCache[request?._id];
        if (cached) continue;
  
        const name = await getLocationName(coords[0], coords[1]);
        namesMap[request._id] = name; // to render we have to store in namesMap
        newNames[request._id] = name; // to chache it, store in newNames
      }
  
      if (Object.keys(newNames).length > 0) {
        dispatch(setLocationNameCache(newNames));
      }
  
      setLocationNames(namesMap);
    };
  
    if (allRequests?.length > 0) {
      fetchNames();
    }
  }, [allRequests, locationNameCache]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 items-stretch">
      {allRequests?.map((request) => {
        return <RequestCard key={request?._id} request={request} locationName={locationNames[request?._id]} />;
      })}
    </div>
  );
};
export default RequestList;