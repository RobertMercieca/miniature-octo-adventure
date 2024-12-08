export default function Loader() {
  return (
    <div className='flex h-5/6 items-center justify-center p-6'>
      <div className='relative inline-flex'>
        <div className='h-14 w-14 rounded-full bg-white/100'></div>
        <div className='absolute left-0 top-0 h-14 w-14 animate-ping rounded-full bg-white'></div>
        <div className='absolute left-0 top-0 h-14 w-14 animate-pulse rounded-full bg-white'></div>
      </div>
    </div>
  );
}
