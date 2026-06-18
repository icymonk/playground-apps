<script setup lang="ts">
import { ref } from 'vue'
import { Search, Edit, Inbox, Star, Send, Archive, Trash2, Clock, AlertCircle, Settings, CornerUpLeft, CornerUpRight, MoreHorizontal, Link, Paperclip, Image as ImageIcon } from 'lucide-vue-next'

const emails = [
  { id: 1, sender: 'GitHub', subject: 'Your sponsorship of @icymonk', preview: 'Thank you for sponsoring icymonk on GitHub Sponsors. Your support helps them continue their open source work...', time: '10:42 AM', unread: true },
  { id: 2, sender: 'Alex Developer', subject: 'Re: Mega App Launch', preview: 'That sounds incredible. We should definitely sync up on how you managed the state across all 20 applications...', time: 'Yesterday', unread: true },
  { id: 3, sender: 'Stripe', subject: 'Payment successful', preview: 'We successfully processed your payment of $49.00 for the Pro Plan subscription. You can download your invoice...', time: 'Yesterday', unread: false },
  { id: 4, sender: 'Team Updates', subject: 'Weekly Sync Agenda', preview: 'Here is the agenda for our weekly sync. Please make sure to review the PRs before the meeting begins...', time: 'Oct 23', unread: false },
  { id: 5, sender: 'Linear', subject: 'New issues assigned to you', preview: 'You have 3 new issues assigned to you in the Frontend board. ENG-402: Fix memory leak in Kanban DND...', time: 'Oct 22', unread: false },
]

const selectedEmail = ref(emails[0])
const isComposing = ref(false)
</script>

<template>
  <div class="h-screen flex bg-white text-[#111111] font-sans selection:bg-indigo-500/30 overflow-hidden text-[14px]">
    
    <!-- Sidebar -->
    <aside class="w-64 border-r border-neutral-200 bg-[#F9F9F9] flex flex-col shrink-0">
      <!-- User / Workspace -->
      <div class="h-14 flex items-center px-4 border-b border-neutral-200 cursor-pointer hover:bg-neutral-100 transition-colors">
        <div class="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-xs mr-3">C</div>
        <span class="font-bold flex-1 truncate">cjmac@example.com</span>
        <span class="text-neutral-400 font-medium text-[11px] border border-neutral-200 rounded px-1.5 shadow-sm">⌘K</span>
      </div>

      <!-- Navigation -->
      <div class="p-3 flex-1 overflow-y-auto">
        <button 
          @click="isComposing = true"
          class="w-full bg-white border border-neutral-200 shadow-sm hover:shadow text-[#111111] font-medium py-2 rounded-lg flex items-center justify-center gap-2 mb-4 transition-all"
        >
          <Edit class="w-4 h-4" /> Compose <span class="text-neutral-400 text-[11px] ml-1 border border-neutral-200 rounded px-1">C</span>
        </button>

        <nav class="space-y-0.5 font-medium text-[#444444]">
          <a href="#" class="flex items-center justify-between px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700">
            <div class="flex items-center gap-3"><Inbox class="w-4 h-4" /> Inbox</div>
            <span class="text-xs font-bold">2</span>
          </a>
          <a href="#" class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors">
            <div class="flex items-center gap-3"><Star class="w-4 h-4" /> Starred</div>
          </a>
          <a href="#" class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors">
            <div class="flex items-center gap-3"><Send class="w-4 h-4" /> Sent</div>
          </a>
          <a href="#" class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors">
            <div class="flex items-center gap-3"><Clock class="w-4 h-4" /> Snoozed</div>
          </a>
          <a href="#" class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors">
            <div class="flex items-center gap-3"><AlertCircle class="w-4 h-4" /> Spam</div>
            <span class="text-xs font-bold text-neutral-400">12</span>
          </a>
        </nav>

        <div class="mt-8 mb-2 px-3 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Labels</div>
        <nav class="space-y-0.5 font-medium text-[#444444]">
          <a href="#" class="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors">
            <div class="w-2.5 h-2.5 rounded-full bg-rose-500"></div> Urgent
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors">
            <div class="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Work
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors">
            <div class="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> Personal
          </a>
        </nav>
      </div>

      <!-- Settings -->
      <div class="p-3 border-t border-neutral-200">
        <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors font-medium text-[#444444]">
          <Settings class="w-4 h-4" /> Settings
        </a>
      </div>
    </aside>

    <!-- Email List -->
    <div class="w-80 border-r border-neutral-200 bg-white flex flex-col shrink-0 relative">
      <!-- Search -->
      <div class="h-14 border-b border-neutral-200 flex items-center px-4 relative shrink-0">
        <Search class="w-4 h-4 text-neutral-400 absolute left-4" />
        <input type="text" placeholder="Search..." class="w-full pl-8 pr-4 py-2 outline-none text-[14px] placeholder:text-neutral-400" />
      </div>

      <!-- List -->
      <div class="flex-1 overflow-y-auto custom-scrollbar">
        <div 
          v-for="email in emails" :key="email.id"
          @click="selectedEmail = email"
          class="border-b border-neutral-100 p-4 cursor-pointer transition-colors relative"
          :class="selectedEmail.id === email.id ? 'bg-indigo-50/50' : 'hover:bg-neutral-50'"
        >
          <div v-if="selectedEmail.id === email.id" class="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600"></div>
          
          <div class="flex justify-between items-baseline mb-1">
            <h3 class="font-bold truncate pr-2" :class="email.unread ? 'text-[#111111]' : 'text-[#444444]'">
              <span v-if="email.unread" class="inline-block w-2 h-2 bg-indigo-600 rounded-full mr-1.5"></span>
              {{ email.sender }}
            </h3>
            <span class="text-[11px] font-medium shrink-0" :class="email.unread ? 'text-indigo-600' : 'text-neutral-400'">{{ email.time }}</span>
          </div>
          <p class="text-[13px] font-bold mb-0.5 truncate" :class="email.unread ? 'text-[#111111]' : 'text-[#444444]'">{{ email.subject }}</p>
          <p class="text-[13px] text-neutral-500 line-clamp-2 leading-relaxed">{{ email.preview }}</p>
        </div>
      </div>
    </div>

    <!-- Email Body -->
    <main class="flex-1 flex flex-col min-w-0 bg-white relative">
      <div v-if="selectedEmail" class="h-full flex flex-col">
        <!-- Toolbar -->
        <div class="h-14 border-b border-neutral-200 flex items-center justify-between px-6 shrink-0">
          <div class="flex items-center gap-1">
            <button class="p-2 text-neutral-500 hover:text-[#111111] hover:bg-neutral-100 rounded-lg transition-colors tooltip-target"><Archive class="w-4 h-4" /></button>
            <button class="p-2 text-neutral-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 class="w-4 h-4" /></button>
            <div class="w-px h-4 bg-neutral-200 mx-2"></div>
            <button class="p-2 text-neutral-500 hover:text-[#111111] hover:bg-neutral-100 rounded-lg transition-colors"><Clock class="w-4 h-4" /></button>
            <button class="p-2 text-neutral-500 hover:text-[#111111] hover:bg-neutral-100 rounded-lg transition-colors"><Star class="w-4 h-4" /></button>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[11px] font-medium text-neutral-400 border border-neutral-200 rounded px-1.5 py-0.5">J</span>
            <span class="text-[11px] font-medium text-neutral-400 border border-neutral-200 rounded px-1.5 py-0.5">K</span>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar">
          <h1 class="text-2xl font-black mb-8">{{ selectedEmail.subject }}</h1>
          
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-500">
                {{ selectedEmail.sender.charAt(0) }}
              </div>
              <div>
                <div class="font-bold">{{ selectedEmail.sender }} <span class="font-normal text-neutral-500 text-[13px]">hello@{{ selectedEmail.sender.toLowerCase().replace(' ', '') }}.com</span></div>
                <div class="text-[13px] text-neutral-500">to me • {{ selectedEmail.time }}</div>
              </div>
            </div>
            <div class="flex items-center gap-2 text-neutral-400">
              <CornerUpLeft class="w-4 h-4 hover:text-[#111111] cursor-pointer transition-colors" />
              <CornerUpRight class="w-4 h-4 hover:text-[#111111] cursor-pointer transition-colors" />
              <MoreHorizontal class="w-4 h-4 hover:text-[#111111] cursor-pointer transition-colors" />
            </div>
          </div>

          <!-- Mock Email Content -->
          <div class="prose prose-sm max-w-none text-[#333333] leading-relaxed">
            <p>Hi there,</p>
            <p>{{ selectedEmail.preview }} This is an expanded view of the email content. We are building 20 applications using Vue 3 and Tailwind CSS v4 to demonstrate the extreme power of modern frontend development.</p>
            <br>
            <p>In this email client clone, you'll notice:</p>
            <ul>
              <li>A sleek, minimalist 3-pane layout</li>
              <li>Subtle visual hints for keyboard shortcuts</li>
              <li>A beautiful Compose modal layer</li>
              <li>Fluid typography and spacing</li>
            </ul>
            <br>
            <p>Best regards,<br><strong>{{ selectedEmail.sender }}</strong></p>
          </div>
        </div>

        <!-- Quick Reply -->
        <div class="p-6 border-t border-neutral-100">
          <div class="border border-neutral-200 rounded-xl bg-[#F9F9F9] p-3 text-neutral-500 cursor-text hover:border-neutral-300 transition-colors flex items-center gap-2" @click="isComposing = true">
            <CornerUpLeft class="w-4 h-4" /> Reply to {{ selectedEmail.sender }}...
          </div>
        </div>
      </div>
      <div v-else class="h-full flex items-center justify-center text-neutral-400 font-medium">
        Select an email to read
      </div>

      <!-- Compose Overlay -->
      <div v-if="isComposing" class="absolute bottom-0 right-16 w-[500px] bg-white rounded-t-xl shadow-[0_-5px_40px_rgba(0,0,0,0.15)] border border-neutral-200 flex flex-col z-50">
        <div class="bg-[#111111] text-white px-4 py-2.5 rounded-t-xl flex justify-between items-center font-bold text-[13px]">
          <span>New Message</span>
          <button @click="isComposing = false" class="hover:bg-white/20 p-1 rounded transition-colors"><X class="w-4 h-4" /></button>
        </div>
        <div class="px-4 py-2 border-b border-neutral-100 flex items-center text-[13px]">
          <span class="text-neutral-500 w-10">To:</span>
          <input type="text" class="flex-1 outline-none" autofocus />
        </div>
        <div class="px-4 py-2 border-b border-neutral-100 flex items-center text-[13px]">
          <span class="text-neutral-500 w-10">Sub:</span>
          <input type="text" class="flex-1 outline-none font-bold" />
        </div>
        <div class="p-4 flex-1">
          <textarea class="w-full h-48 outline-none resize-none text-[14px]" placeholder="Write something..."></textarea>
        </div>
        <div class="p-3 border-t border-neutral-100 flex items-center justify-between bg-[#F9F9F9]">
          <div class="flex items-center gap-1">
            <button class="p-2 text-neutral-500 hover:bg-neutral-200 rounded transition-colors"><Link class="w-4 h-4" /></button>
            <button class="p-2 text-neutral-500 hover:bg-neutral-200 rounded transition-colors"><Paperclip class="w-4 h-4" /></button>
            <button class="p-2 text-neutral-500 hover:bg-neutral-200 rounded transition-colors"><ImageIcon class="w-4 h-4" /></button>
          </div>
          <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors">
            Send <span class="text-white/60 text-[11px] font-normal tracking-wide">⌘Enter</span>
          </button>
        </div>
      </div>

    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #D1D5DB;
}
</style>
