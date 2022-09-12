import React from "react";

const FieldsetLegend = ({ title, children, className }) => {
  return (
    <div
      className={
        "mx-6 py-16 px-16 rounded-16 border-2 border-gray-300 relative " + className
      }
    >
      <div className="absolute -top-10 right-32 text-gray-600 font-bold bg-white px-6 rounded-16">
        {title}
      </div>

      {children}
    </div>
  );
};

export default FieldsetLegend;
