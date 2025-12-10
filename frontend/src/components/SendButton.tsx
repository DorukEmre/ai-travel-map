import sendIcon from "@/assets/send_24dp_E5E7EB_FILL0_wght400_GRAD0_opsz24.svg";
import loadIcon from "@/assets/progress_activity_24dp_E5E7EB_FILL0_wght400_GRAD0_opsz24.svg"

const SendButton = ({ isSending }: { isSending: boolean }) => {

  return (
    <>
      {isSending ?
        <button
          type="submit"
          className="flex bg-green-800 px-4 py-2 rounded-lg ml-2 justify-center items-center hover:bg-green-900 transition-colors cursor-not-allowed"
        >
          Send
          <img src={loadIcon} alt="Loading" className="inline-block ml-2 w-5 h-5  animate-spin" />
        </button>
        :
        <button
          type="submit"
          className="flex bg-green-800 px-4 py-2 rounded-lg ml-2 justify-center items-center hover:bg-green-900 transition-colors cursor-pointer"
        >
          Send
          <img src={sendIcon} alt="Send" className="inline-block ml-2 w-5 h-5" />
        </button>
      }
    </>
  );
};

export default SendButton;
