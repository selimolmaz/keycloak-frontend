interface LoadingProps {
  message?: string;
}

const Loading = ({ message = 'YÜKLENİYOR...' }: LoadingProps) => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="inline-block border-8 border-black border-t-zinc-300 w-16 h-16 rounded-full animate-spin mb-6"></div>
        <div className="text-4xl font-black tracking-tighter">{message}</div>
      </div>
    </div>
  );
};

export default Loading;