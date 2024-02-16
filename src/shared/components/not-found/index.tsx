import React from "react";
import Lottie from "react-lottie";
import notFoundLottie from "../../../../public/lottie/not-found.json";
import Image from "next/image";
import { noResult } from "@/shared/lib/image-config";

interface IProps {
  height?: number;
  width?: number;
}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: notFoundLottie,
  height: 100,
  width: 100,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const NotFoundLottie = ({ height, width }: IProps) => {
  return (
    <div className="my-20">
      {/* <Lottie
        height={height ? height : 150}
        width={width ? width : 150}
        options={defaultOptions}
      /> */}
      <Image
        src={noResult}
        width={width ? width : 160}
        height={height ? height : 150}
        alt="No Result"
        className="m-auto"
      />
      <p className="text-base text-zinc-500">No Results Found</p>
    </div>
  );
};

export default NotFoundLottie;
