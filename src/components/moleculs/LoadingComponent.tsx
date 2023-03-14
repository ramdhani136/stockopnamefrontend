import React from "react";
import RiseLoader from "react-spinners/RiseLoader";
import LoadingBar from "react-top-loading-bar";

interface ILoading {
  showProgress?: IProgressInfo;
}

interface IProgressInfo {
  currentIndex: number;
  totalIndex: number;
  onProgress: String;
  currentPercent: number;
}

const LoadingComponent: React.FC<ILoading> = ({ showProgress }) => {
  return (
    <>
      {showProgress && (
        <LoadingBar
          color="red"
          progress={20}
          // onLoaderFinished={() => alert}
        />
      )}
      <div className="flex items-center justify-center flex-col   w-full h-[calc(100vh-150px)] ">
        <div className="w-full   flex justify-center items-center relative flex-col ">
          <RiseLoader
            color="#36d7b6"
            loading={true}
            // cssOverride={override}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          {showProgress && (
            <>
              <h5 className="mt-4 text-[0.89em] font-normal  text-gray-500">
                progress 1 Of 230 (50%)
              </h5>
              <h5 className="mt-1 text-[0.9em] font-medium  text-gray-500">
                SCH202303017
              </h5>
            </>
          )}
          {/* <ReactLoading type="spin" color="#e5e7ef" />
        {progressInfo && (
          <h4 className="absolute text-[0.64em] italic text-gray-300">
            {currentPercent?.toFixed(2)}%
          </h4>
        )} */}
        </div>
      </div>
    </>
  );
};

export default LoadingComponent;
