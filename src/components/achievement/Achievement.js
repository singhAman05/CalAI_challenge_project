import React from "react";
import Achieve from "../../images/achievement.png";
import {
  SchoolRounded,
  VideoCameraBackRounded,
  PeopleAltRounded,
} from "@mui/icons-material";
const Achievement = () => {
  return (
    <section className="w-full bg-white p-5">
      <div className="md:max-w-[1100px] m-auto grid md:grid-cols-2 max-w-[400px]">
        <div className="flex flex-col justify-start gap-4">
          <h1 className="md:leading-[42px] py-2 text-3xl font-semibold">
            Our <span className="text-[#2898dd]">Achievements</span>
          </h1>
          <p className=" text-[#282828] text-2x1">
            Leading Companies use the same courses to help their employees keep
            skill up
          </p>
          <div className="grid md:grid-cols-2 grid-cols-1">
            <div className="py-6 flex">
              <div className="p-4 bg-[#e9f2f8] rounded-xl">
                <SchoolRounded size={30} style={{ color: "#1a9068" }} />
              </div>
              <div className="px-3">
                <h1 className="text-2xl font-semibold">100 +</h1>
                <p className="text-[#60737a]">Instructors</p>
              </div>
            </div>
            <div className="py-6 flex">
              <div className="p-4 bg-[#e9f2f8] rounded-xl">
                <VideoCameraBackRounded
                  size={30}
                  style={{ color: "#41B3D3" }}
                />
              </div>
              <div className="px-3">
                <h1 className="text-2xl font-semibold">10,000 +</h1>
                <p className="text-[#60737a]">Videos</p>
              </div>
            </div>
            <div className="py-6 flex">
              <div className="p-4 bg-[#e9f2f8] rounded-xl">
                <PeopleAltRounded size={30} style={{ color: "#212125" }} />
              </div>
              <div className="px-3">
                <h1 className="text-2xl font-semibold">3000 +</h1>
                <p className="text-[#60737a]">Users</p>
              </div>
            </div>
            <div className="py-6 flex">
              <div className="p-4 bg-[#e9f2f8] rounded-xl">
                <SchoolRounded size={30} style={{ color: "#FFC069" }} />
              </div>
              <div className="px-3">
                <h1 className="text-2xl font-semibold">300 +</h1>
                <p className="text-[#60737a]">Students</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border justify-center items-center">
          <img
            src={Achieve}
            alt="hero"
            className="md:order-last m-auto order-first"
          />
        </div>
      </div>
    </section>
  );
};

export default Achievement;
