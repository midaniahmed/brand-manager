export function PickCardResult() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-white text-[25px] text-center max-[800px]:text-[20px]">
      <div className="text-[40px] mb-7.5 font-bold max-[800px]:text-[30px]">Done! 🎉</div>
      <div>
        To check the source code of this project, please visit{' '}
        <a href="https://github.com/almond-bongbong/react-swipe-deck" target="_blank" rel="noopener noreferrer" className="underline">
          GitHub
        </a>
        .
      </div>
    </div>
  );
}
