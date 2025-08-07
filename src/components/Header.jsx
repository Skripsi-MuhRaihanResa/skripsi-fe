const Header = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white text-xl font-bold tracking-wide">T</span>
            </div>
            <div className="text-2xl font-bold">
              <span className="text-orange-500">Troto</span>
              <span className="text-gray-700">Track</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-3 py-1">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow">
              <span className="text-white font-semibold">A</span>
            </div>
            <div className="text-sm font-medium text-gray-700">Admin</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Header
