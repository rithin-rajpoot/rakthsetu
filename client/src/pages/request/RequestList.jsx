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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-transparent">
      {allRequests?.length > 0 ? (
        allRequests.map((request) => {
          return <RequestCard key={request?._id} request={request} locationName={locationNames[request?._id]} />;
        })
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Blood Requests</h3>
            <p className="text-gray-600">There are currently no blood donation requests in your area.</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default RequestList;