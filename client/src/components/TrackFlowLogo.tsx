import React from "react";

const TrackFlowLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-gray-600 rounded-lg flex items-center justify-center shadow-sm">
          <div className="w-5 h-5 relative">
            {/* Flow lines representing tracking/workflow */}
            <div className="absolute inset-0 flex flex-col justify-center space-y-0.5">
              <div className="h-0.5 w-4 bg-white rounded-full opacity-90"></div>
              <div className="h-0.5 w-3 bg-white rounded-full opacity-70 ml-1"></div>
              <div className="h-0.5 w-2 bg-white rounded-full opacity-50 ml-2"></div>
            </div>
            {/* Arrow indicating flow direction */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <div className="w-0 h-0 border-l-[3px] border-l-white border-t-[2px] border-t-transparent border-b-[2px] border-b-transparent opacity-90"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight">
          TrackFlow
        </h1>
      </div>
    </div>
  );
};

export default TrackFlowLogo;
