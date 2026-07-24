const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="h-32 w-32 animate-spin rounded-full border-6 border-gray-200 border-t-app-orange"></div>
    </div>
  )
}

export default Loading

