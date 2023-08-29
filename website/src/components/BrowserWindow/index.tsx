import React from "react";

type Props = {
  title?: string;
  children?: React.ReactNode;
};

export default function browserWindow(props: Props): JSX.Element {
  const { title, children } = props;
  return (
    <div className="mockup-window border bg-base-300 pt-0 before:content-none">
      <div className="flex gap-2 w-full px-4 py-2">
        <div>
          <div className="bg-red-600 inline-block h-3 w-3 rounded-full mr-1"></div>
          <div className="bg-yellow-500 inline-block h-3 w-3 rounded-full mr-1"></div>
          <div className="bg-green-500 inline-block h-3 w-3 rounded-full"></div>
        </div>
        <div className="flex-grow text-left inline-block bg-white rounded-full px-2 truncate text-sm">
          {title}
        </div>
      </div>
      <div className="bg-white p-4">{children}</div>
    </div>
  );
}
