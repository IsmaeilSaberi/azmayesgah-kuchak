import React from "react";

const DownloadButton = ({ fileUrl, text }) => {
  const downloadFile = () => {
    window.open(fileUrl);
  };

  return (
    <div
      onClick={downloadFile}
      className="flex items-center text-sm text-indigo-600 cursor-pointer transition-all duration-200 hover:text-indigo-700 hover:font-bold"
    >
      {text}
    </div>
  );
};

export default DownloadButton;
