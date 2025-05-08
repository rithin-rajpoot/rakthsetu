import React from "react";
import { useSelector } from "react-redux";
import Heading from "./Heading";
import ProfileBar from "./ProfileBar";
import InfoSlice from "./InfoSlice";

const UserProfile = () => {
  const { userProfile } = useSelector((state) => state.userReducer);

  const logo = userProfile?.fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const personalInfo = [
    {
      Name: "Email Address",
      value: userProfile?.email,
    },
    {
      Name: "Phone Number",
      value: userProfile?.phone,
    },
    {
      Name: "Blood Type",
      value: userProfile?.bloodType,
    },
  ];
  const accountInfo = [
    {
      Name: "Member Since",
      value: userProfile?.createdAt.substring(0, 10),
    },
    {
      Name: "User Id",
      value: userProfile?._id,
    },
    {
      Name: "Account Status",
      value: "* Active",
    },
  ];

  return (
    <div className="mx-auto relative top-[2rem] h-fit md:h-[85vh] w-[90vw] bg-[#F4F6FF] rounded-md">
      <ProfileBar
        logo={logo}
        fullName={userProfile?.fullName}
        username={userProfile?.username}
      />
      <div className="w-full h-[75%] grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 w-full h-full p-2">
          <Heading name="Personal Info" />
          {personalInfo?.map((item, idx) => (
            <InfoSlice key={idx} name={item.Name} value={item.value} />
          ))}
        </div>
        <div className="flex flex-col gap-2 w-full h-full p-2 ">
          <Heading name="Account Info" />
          {accountInfo?.map((item, idx) => (
            <InfoSlice key={idx} name={item.Name} value={item.value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
