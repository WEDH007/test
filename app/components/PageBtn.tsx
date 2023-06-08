'use client'
import React from "react";

type Props = {
  pagenumber: number;
}

const PageBtn = ({pagenumber}: Props) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {pagenumber}
    </button>
  );
};

export default PageBtn;
