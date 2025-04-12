export default function Chat() {
  return (
    <div className="flex h-[85vh] bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Sidebar - Danh sách bạn bè */}
      <div className="w-64 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>
        <ul className="space-y-3">
          {Array.from({ length: 20 }).map((_, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-xl"
            >
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full" />
              <div>
                <p className="font-medium">User {index + 1}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last message preview...
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="h-14 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mr-4" />
          <div>
            <p className="font-semibold">User Name</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Active now
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          {[...Array(50)].map((_, index) => (
            <div
              key={index}
              className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs ${
                  index % 2 === 0
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {index % 2 === 0 ? 'Hi there!' : 'Hello!'}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
