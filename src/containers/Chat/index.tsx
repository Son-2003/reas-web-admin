import ChatSidebar from './components/ChatSidebar';
import ChatMain from './components/ChatMain';

export default function Chat() {
  return (
    <div className="flex h-[85vh] bg-white dark:bg-gray-900 text-black dark:text-white">
      <ChatSidebar />
      <ChatMain />
    </div>
  );
}
