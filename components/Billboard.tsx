import useBillboard from "@/hooks/useBillboard";
import React from "react";

const Billboard = () => {
    const { data } = useBillboard();

    return (
        <div className="relative h-[56.25vw]">
            <video
                className="
                w-full
                h-[56.25vw]
                object-cover
                brightness-[60%]"
                autoPlay
                muted
                loop
                poster={data?.thumbnailUrl}
                src={data?.videoUrl}>
            </video>
            <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
                <p>

                </p>
            </div>
        </div>
    )
}

export default Billboard;