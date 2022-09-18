import React from "react";

interface SaleModalProps {
  closeModal: () => void;
}

const SaleModal: React.FC<SaleModalProps> = ({ closeModal }) => {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex content-center items-center justify-center bg-[#00000080]">
      <div className="h-1/3 w-1/2 bg-white flex items-center justify-center px-8">
        <div className="grid grid-rows-5 gap-4">
          <div
            className="row-span-1 flex flex-row-reverse text-extrabold text-xl cursor-pointer"
            onClick={closeModal}
          >
            X
          </div>
          <div className="row-span-1 font-bold text-3xl">
            Get lifetime access to 1500+ AI prompts for $15
          </div>
          <div className="row-span-2 grid grid-cols-3 gap-4">
            <div>
              <span className="text-[#FFA693]">✓</span> Unlimited prompts
            </div>
            <div>
              <span className="text-[#FFA693]">✓</span> Lifetime access
            </div>
            <div>
              <span className="text-[#FFA693]">✓</span> 1500+ parameters
            </div>
            <div>
              <span className="text-[#FFA693]">✓</span> DALL-E
            </div>
            <div>
              <span className="text-[#FFA693]">✓</span> Midjourney
            </div>
            <div>
              <span className="text-[#FFA693]">✓</span> Stable Diffusion
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div
              className="row-span-1 font-semibold underline cursor-pointer"
              onClick={() => {
                window.open(
                  "https://shreyasprakash.gumroad.com/l/prompt-hero-pro",
                  "_blank"
                );
              }}
            >
              <button
                className=" bg-[#FFA693] text-black font-bold py-2 px-4 rounded"
                onClick={() => {}}
              >
                Get it now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleModal;
