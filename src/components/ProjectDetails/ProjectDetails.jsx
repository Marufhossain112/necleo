/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { backend_url } from "../../utils";
import { IoArrowBack } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState("");
  const { id } = useParams();
  //   console.log(id);
  useEffect(() => {
    fetch(`${backend_url}/projects/${id}`)
      .then((res) => res.json())
      .then((data) => setProjectData(data));
  }, []);
  //   console.log({ projectData });
  const handleDelete = () => {
    // console.log("I am deleting.");
    const confirmation = confirm("Are you sure, you want to delete ?");
    // console.log(confirmation);
    if (confirmation) {
      fetch(`${backend_url}/projects/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Successfully deleted the project");
          navigate("/projects");
          console.log(data);
        });
    }
  };
  return (
    <div className="bg-dashboardBg min-h-screen">
      <div className="mb-5">
        <Link to={"/projects"}>
          <IoArrowBack className="text-3xl ml-4 mt-1" />
        </Link>
      </div>
      <div className="flex justify-center">
        <div
          key={projectData._id}
          className="justify-self-center bg-white p-5   rounded-[10px]"
        >
          {/* img part */}
          <div className="w-[400px]  h-[280px] flex items-center justify-center rounded-[10px] overflow-hidden">
            <div className="max-w-full max-h-full">
              <img
                src={projectData?.image}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="flex justify-between">
            {/* text part */}
            <div>
              <div className="mt-[5px]">
                <span className="font-semibold text-base">Author : </span>
                <span className="font-normal text-base ">
                  {projectData?.author}
                </span>
              </div>
              <div className="mt-[5px]">
                <span className="font-semibold text-base">Width : </span>
                <span className="font-normal text-base ">
                  {projectData?.width}
                </span>
              </div>
              <div className="mt-[5px]">
                <span className="font-semibold text-base">Height : </span>
                <span className="font-normal text-base ">
                  {projectData?.height}
                </span>
              </div>
            </div>
            {/* icons */}
            <div className="flex gap-5 text-xl mt-2">
              <Link to={`/update/${projectData?._id}`}>
                <MdEdit />
              </Link>
              <MdDelete onClick={handleDelete} className="text-[#FF0000]" />
            </div>
          </div>
        </div>
      </div>
    </div>
    // <p>Hello</p>
  );
};

export default ProjectDetails;
