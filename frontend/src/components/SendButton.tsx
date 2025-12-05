import sendIcon from "@/assets/send_24dp_E5E7EB_FILL0_wght400_GRAD0_opsz24.svg";

const SendButton = () => {

  return (
    <button
      type="submit"
      className="flex bg-green-800 px-4 py-2 rounded-lg ml-2 justify-center items-center hover:bg-green-900 transition-colors"
    >
      Send
      <img src={sendIcon} alt="Send" className="inline-block ml-2 w-5 h-5" />
    </button>
  );
};

export default SendButton;
