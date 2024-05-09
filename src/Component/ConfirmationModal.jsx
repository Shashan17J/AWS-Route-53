export default function ConfirmationModal({ modalData }) {
  console.log("...modalData", modalData);
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border p-10 pl-20">
        <p className="text-2xl font-semibold text-richblack-5 ">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-10 ">
          <button
            className="cursor-pointer rounded-md bg-red-500 py-2 px-4 font-semibold text-white"
            onClick={modalData?.btn1Handler}
          >
            {modalData?.btn1Text}
          </button>
          <button
            className="cursor-pointer rounded-md bg-blue-700 py-2 px-4 font-semibold text-white"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}
