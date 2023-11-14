import React from 'react';

interface MessageProps {
  id?: string;
  message?: string;
  role?: string;
}

export default function Message({ id, message, role }: MessageProps) {
  const classNameMess =
    role === 'user'
      ? 'dark:bg-[#444654] bg-[#f5f5fa] p-4 justify-center text-base md:gap-6 md:py-6 m-auto'
      : 'dark:bg-gray-800 bg-[#e5e5ea] p-4 justify-center text-base md:gap-6 md:py-6 m-auto';
  return (
    <div className={classNameMess} key={id}>
      <div className="flex flex-1 gap-4 text-base mx-auto md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl">
        <div>
          {role === 'user' && (
            <img
              alt="User"
              loading="lazy"
              width="36"
              height="36"
              src="https://randomuser.me/api/portraits/men/36.jpg"
            />
          )}
          {role === 'assistant' && (
            <img
              alt="User"
              loading="lazy"
              width="36"
              height="36"
              src="https://randomuser.me/api/portraits/men/30.jpg"
            />
          )}
        </div>
        <div className="relative flex w-[calc(100%-50px)] flex-col lg:w-[calc(100%-115px)]">
          <div className="flex-col gap-1 md:gap-3">
            <div className="flex flex-grow flex-col gap-3 max-w-full">
              <div className="min-h-[20px] flex flex-col items-start gap-3 whitespace-pre-wrap break-words overflow-x-auto">
                <div>{message}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
