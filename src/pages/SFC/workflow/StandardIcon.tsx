import { tw } from 'twind';

export default () => {
  return (
    <div className={tw("w-[30px] rounded-sm bg-white shadow-xl ")}>
      <p className={tw("rounded-t-sm  px-1.5 py-[3px] bg-blue-500 text-white text-[4px]")}>
         Standard
      </p>
      <label className={tw("flex flex-col px-2 pt-1 pb-4 h-[20px]")}>
        <p className={tw("text-right text-xs")}> </p>
      </label>
    </div>
  );
}
