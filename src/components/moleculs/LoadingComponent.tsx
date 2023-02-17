import React from "react";
import ReactLoading from "react-loading";

interface ILoading {
  progressInfo?: boolean;
  currentPercent?: number;
  currentIndex?: number;
  totalIndex?: number;
  progressData?: string;
}

const LoadingComponent: React.FC<ILoading> = ({
  progressInfo,
  currentIndex,
  currentPercent,
  totalIndex,
  progressData,
}) => {
  return (
    <div className="flex items-center justify-center flex-col   w-full h-[calc(100vh-150px)] ">
      <div className="w-full   flex justify-center items-center relative">
        <ReactLoading type="spin" color="#e5e7ef" />
        {progressInfo && (
          <h4 className="absolute text-[0.64em] italic text-gray-300">
            {currentPercent?.toFixed(2)}%
          </h4>
        )}
      </div>
      {progressInfo && (
        <>
          <h4 className="text-[0.8em] text-gray-300 italic mt-3">
            {progressData}
          </h4>
          <h4 className="text-[0.8em] text-gray-300 italic mt-1">
            progress {currentIndex} of {totalIndex}
          </h4>
        </>
      )}
    </div>
  );
};

export default LoadingComponent;