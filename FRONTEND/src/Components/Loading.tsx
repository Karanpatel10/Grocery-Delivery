// // const Loading = () => {
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
// //       <div className="h-32 w-32 animate-spin rounded-full border-6 border-gray-200 border-t-app-orange"></div>
// //     </div>
// //   )
// // }

// // export default Loading


type LoadingProps = {variant?: "fullscreen" | "content";};

const Loading = ({ variant = "fullscreen" }: LoadingProps) => {
  const wrapperClass =
    variant === "fullscreen"
      ? "fixed inset-0 z-60 flex items-center justify-center bg-app-cream/60 backdrop-blur-sm"
      : "absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm bg-app-cream";

  const spinnerSize =variant === "fullscreen"? "h-24 w-24 border-[8px]": "h-12 w-12 border-[5px]"; 

  return (
    <div className={wrapperClass}>
      <div
        className={`${spinnerSize} animate-spin rounded-full border-gray-200 border-t-app-orange`}
      />
    </div>
  );
};

export default Loading;

