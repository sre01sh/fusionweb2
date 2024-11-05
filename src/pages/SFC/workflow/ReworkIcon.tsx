import { tw } from 'twind';
 
export default () => {
  return (
    <div className={tw("w-[30px] rounded-sm bg-white shadow-xl ")}>
      <p className={tw("rounded-t-sm  px-2 py-[2px] bg-pink-500 text-white text-[4px]")}>
         Rework
      </p>
      <label className={tw("flex flex-col px-2 pt-1 pb-4 h-[20px]")}>
        <p className={tw("text-right text-xs")}> </p>
      </label>
    </div>
  );
}
