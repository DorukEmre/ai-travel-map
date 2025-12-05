const Header = ({ onRestartKey }: { onRestartKey: () => void }) => {

  return (
    <header className="flex justify-between items-center m-auto max-w-3xl p-4">
      <h1 className="font-bold text-2xl ">AI Travel</h1>
      <button
        className="border-2 border-red-900 py-2 px-4 rounded-lg hover:bg-red-900 transition-colors"
        onClick={onRestartKey}
      >
        New chat
      </button>
    </header>
  );
}

export default Header;
