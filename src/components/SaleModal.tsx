import React from "react";

interface SaleModalProps {
  closeModal: () => void;
}

const SaleModal: React.FC<SaleModalProps> = () => {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex content-center items-center justify-center bg-[#00000080]">
      <div className="h-1/3 w-1/2 bg-white flex items-center justify-center">
        <div className="grid grid-rows-5">
          <div className="row-span-2 font-bold text-3xl">
            Get lifetime access to 1500+ AI prompts for $10
          </div>
          <div className="row-span-2">Unlimited prompts | Lifetime access</div>
          <div
            className="row-span-1 font-semibold underline cursor-pointer"
            onClick={() => {
              window.open(
                "https://shreyasprakash.gumroad.com/l/prompt-hero-pro",
                "_blank"
              );
            }}
          >
            {/* <button
                            className=" bg-[#FFA693] text-black font-bold py-2 px-4 rounded my-[20vh]"
                            onClick={() => {
                            }}
                        >
                            Get it now
                        </button> */}
            Get it now
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleModal;
