type Props = {
  title?: string;
  children?: ReactNode;
};

export default function browserWindow(props: Props): ReactNode {
  const { title, children } = props;
  return (
    <div className="mockup-window border pt-0 before:content-none not-prose">
      <div className="flex gap-2 w-full px-4 py-2 bg-base-content/10">
        <div>
          <div className="bg-red-600 inline-block h-3 w-3 rounded-full mr-1" />
          <div className="bg-yellow-500 inline-block h-3 w-3 rounded-full mr-1" />
          <div className="bg-green-500 inline-block h-3 w-3 rounded-full" />
        </div>
        <div className="flex-grow text-left inline-block bg-base-200 rounded-full px-2 truncate text-sm transition-[background-color] duration-500">
          {title}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
