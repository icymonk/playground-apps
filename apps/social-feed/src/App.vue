<script setup lang="ts">
import { Home, Search, Bell, Mail, Bookmark, User, MoreHorizontal, MessageCircle, Repeat2, Heart, Share, PenSquare } from 'lucide-vue-next'

const posts = [
  { id: 1, author: 'Alex Developer', handle: '@alex_dev', time: '2h', content: 'Just finished building 10 complex frontend applications in a single day using Vue 3 and Tailwind v4. The composition API combined with modern CSS is absolutely mind-blowing! 🚀💻', likes: 1245, retweets: 342, comments: 89, avatar: 'bg-blue-500' },
  { id: 2, author: 'UI/UX Daily', handle: '@uiux_daily', time: '5h', content: 'Design Tip: Micro-interactions are the key to a premium feel. Even a simple transform on hover can make your button feel alive. Pay attention to the details. ✨', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600', likes: 8932, retweets: 1540, comments: 124, avatar: 'bg-rose-500' },
  { id: 3, author: 'Sarah Hacker', handle: '@sarah_codes', time: '8h', content: 'Finally solved that memory leak issue in production. PRO TIP: always check your event listeners in unmounted hooks when using SPAs. You can thank me later. 😅', likes: 432, retweets: 56, comments: 23, avatar: 'bg-emerald-500' },
]

const trends = [
  { topic: 'Vue3', category: 'Technology · Trending', posts: '124K' },
  { topic: '#TailwindCSS', category: 'Web Design · Trending', posts: '89.4K' },
  { topic: 'JavaScript', category: 'Programming · Trending', posts: '452K' },
]
</script>

<template>
  <div class="min-h-screen bg-black text-[#E7E9EA] font-sans selection:bg-[#1D9BF0]/30 flex justify-center">
    
    <!-- Left Sidebar -->
    <header class="w-[68px] sm:w-[88px] xl:w-[275px] shrink-0 h-screen sticky top-0 flex flex-col items-center xl:items-start py-4 xl:px-4 border-r border-[#2F3336]">
      <div class="w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#181818] cursor-pointer transition-colors xl:ml-2 mb-2">
        <svg viewBox="0 0 24 24" aria-hidden="true" class="w-7 h-7 fill-[#E7E9EA]"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.007 4.15H5.078z"></path></g></svg>
      </div>

      <nav class="flex flex-col gap-2 xl:w-full mt-2">
        <a href="#" class="flex items-center gap-5 p-3 rounded-full hover:bg-[#181818] transition-colors xl:w-max">
          <Home class="w-7 h-7" /> <span class="hidden xl:inline text-xl font-bold">Home</span>
        </a>
        <a href="#" class="flex items-center gap-5 p-3 rounded-full hover:bg-[#181818] transition-colors xl:w-max">
          <Search class="w-7 h-7" /> <span class="hidden xl:inline text-xl">Explore</span>
        </a>
        <a href="#" class="flex items-center gap-5 p-3 rounded-full hover:bg-[#181818] transition-colors xl:w-max">
          <Bell class="w-7 h-7" /> <span class="hidden xl:inline text-xl">Notifications</span>
        </a>
        <a href="#" class="flex items-center gap-5 p-3 rounded-full hover:bg-[#181818] transition-colors xl:w-max">
          <Mail class="w-7 h-7" /> <span class="hidden xl:inline text-xl">Messages</span>
        </a>
        <a href="#" class="flex items-center gap-5 p-3 rounded-full hover:bg-[#181818] transition-colors xl:w-max">
          <Bookmark class="w-7 h-7" /> <span class="hidden xl:inline text-xl">Bookmarks</span>
        </a>
        <a href="#" class="flex items-center gap-5 p-3 rounded-full hover:bg-[#181818] transition-colors xl:w-max">
          <User class="w-7 h-7" /> <span class="hidden xl:inline text-xl">Profile</span>
        </a>
      </nav>

      <button class="w-12 h-12 xl:w-full bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white rounded-full font-bold text-lg mt-6 transition-colors flex items-center justify-center shadow-lg shadow-[#1D9BF0]/20">
        <PenSquare class="w-6 h-6 xl:hidden" />
        <span class="hidden xl:inline">Post</span>
      </button>

      <div class="mt-auto xl:w-full p-3 rounded-full hover:bg-[#181818] transition-colors cursor-pointer flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-indigo-500 shrink-0"></div>
        <div class="hidden xl:flex flex-col flex-1 min-w-0">
          <span class="font-bold truncate text-[15px]">Cjmac</span>
          <span class="text-[#71767B] text-[15px] truncate">@cjmac</span>
        </div>
        <MoreHorizontal class="hidden xl:block w-5 h-5 text-[#E7E9EA]" />
      </div>
    </header>

    <!-- Main Feed -->
    <main class="w-full sm:w-[600px] shrink-0 border-r border-[#2F3336]">
      
      <!-- Top Bar -->
      <div class="sticky top-0 bg-black/60 backdrop-blur-md z-10 border-b border-[#2F3336]">
        <h2 class="text-xl font-bold p-4">Home</h2>
        <div class="flex">
          <div class="flex-1 hover:bg-[#181818] transition-colors cursor-pointer flex justify-center pt-4 pb-0 relative">
            <span class="font-bold pb-4 border-b-4 border-[#1D9BF0]">For you</span>
          </div>
          <div class="flex-1 hover:bg-[#181818] transition-colors cursor-pointer flex justify-center pt-4 pb-0 text-[#71767B]">
            <span class="font-bold pb-4">Following</span>
          </div>
        </div>
      </div>

      <!-- Composer -->
      <div class="p-4 border-b border-[#2F3336] flex gap-4">
        <div class="w-10 h-10 rounded-full bg-indigo-500 shrink-0"></div>
        <div class="flex-1">
          <textarea placeholder="What is happening?!" class="w-full bg-transparent text-xl outline-none resize-none pt-2 mb-2 min-h-[50px] placeholder:text-[#71767B]" rows="2"></textarea>
          <div class="flex items-center justify-between border-t border-[#2F3336] pt-3">
            <div class="flex text-[#1D9BF0]">
              <!-- Mock Toolbar Icons -->
              <div class="p-2 hover:bg-[#1D9BF0]/10 rounded-full cursor-pointer transition-colors"><svg viewBox="0 0 24 24" class="w-5 h-5 fill-current"><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></svg></div>
            </div>
            <button class="bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white px-4 py-1.5 rounded-full font-bold text-[15px] transition-colors disabled:opacity-50">Post</button>
          </div>
        </div>
      </div>

      <!-- Feed -->
      <article v-for="post in posts" :key="post.id" class="p-4 border-b border-[#2F3336] hover:bg-[#080808] transition-colors cursor-pointer flex gap-3">
        <div :class="[post.avatar, 'w-10 h-10 rounded-full shrink-0']"></div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1 text-[15px] truncate">
              <span class="font-bold hover:underline">{{ post.author }}</span>
              <span class="text-[#71767B]">{{ post.handle }}</span>
              <span class="text-[#71767B]">·</span>
              <span class="text-[#71767B] hover:underline">{{ post.time }}</span>
            </div>
            <MoreHorizontal class="w-5 h-5 text-[#71767B] hover:text-[#1D9BF0] transition-colors" />
          </div>
          
          <p class="mt-1 text-[15px] whitespace-pre-wrap">{{ post.content }}</p>
          
          <div v-if="post.image" class="mt-3 rounded-2xl overflow-hidden border border-[#2F3336]">
            <img :src="post.image" class="w-full h-auto object-cover max-h-[500px]" />
          </div>

          <div class="flex items-center justify-between mt-3 text-[#71767B] max-w-md">
            <button class="flex items-center gap-2 group">
              <div class="p-2 rounded-full group-hover:bg-[#1D9BF0]/10 group-hover:text-[#1D9BF0] transition-colors"><MessageCircle class="w-4 h-4" /></div>
              <span class="text-sm group-hover:text-[#1D9BF0]">{{ post.comments }}</span>
            </button>
            <button class="flex items-center gap-2 group">
              <div class="p-2 rounded-full group-hover:bg-[#00BA7C]/10 group-hover:text-[#00BA7C] transition-colors"><Repeat2 class="w-4 h-4" /></div>
              <span class="text-sm group-hover:text-[#00BA7C]">{{ post.retweets }}</span>
            </button>
            <button class="flex items-center gap-2 group">
              <div class="p-2 rounded-full group-hover:bg-[#F91880]/10 group-hover:text-[#F91880] transition-colors"><Heart class="w-4 h-4" /></div>
              <span class="text-sm group-hover:text-[#F91880]">{{ post.likes }}</span>
            </button>
            <button class="flex items-center gap-2 group">
              <div class="p-2 rounded-full group-hover:bg-[#1D9BF0]/10 group-hover:text-[#1D9BF0] transition-colors"><Share class="w-4 h-4" /></div>
            </button>
          </div>
        </div>
      </article>

    </main>

    <!-- Right Sidebar -->
    <aside class="hidden lg:block w-[350px] pl-8 py-4">
      <!-- Search -->
      <div class="bg-[#202327] rounded-full flex items-center px-4 py-2 border border-transparent focus-within:border-[#1D9BF0] focus-within:bg-black transition-colors mb-4 group">
        <Search class="w-5 h-5 text-[#71767B] group-focus-within:text-[#1D9BF0]" />
        <input type="text" placeholder="Search" class="bg-transparent outline-none flex-1 ml-4 text-[15px]" />
      </div>

      <!-- Trends -->
      <div class="bg-[#16181C] rounded-2xl pt-3">
        <h3 class="text-xl font-black px-4 pb-3">What's happening</h3>
        
        <div v-for="trend in trends" :key="trend.topic" class="px-4 py-3 hover:bg-[#1D1F23] transition-colors cursor-pointer flex justify-between">
          <div class="flex flex-col">
            <span class="text-[13px] text-[#71767B]">{{ trend.category }}</span>
            <span class="font-bold text-[15px] mt-0.5">{{ trend.topic }}</span>
            <span class="text-[13px] text-[#71767B] mt-0.5">{{ trend.posts }} posts</span>
          </div>
          <MoreHorizontal class="w-5 h-5 text-[#71767B]" />
        </div>
        
        <div class="px-4 py-4 text-[#1D9BF0] hover:bg-[#1D1F23] rounded-b-2xl cursor-pointer transition-colors text-[15px]">
          Show more
        </div>
      </div>
    </aside>

  </div>
</template>

<style>
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
}
</style>
