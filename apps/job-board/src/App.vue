<script setup lang="ts">
import { ref } from 'vue'
import { Briefcase, MapPin, DollarSign, Search, Filter, X, ArrowRight } from 'lucide-vue-next'

const jobs = [
  { id: 1, title: 'Senior Frontend Engineer', company: 'TechCorp', logo: 'bg-blue-500', location: 'Remote', salary: '$120k - $160k', type: 'Full-time', tags: ['Vue', 'TypeScript', 'Tailwind'] },
  { id: 2, title: 'Product Designer', company: 'CreativeLabs', logo: 'bg-purple-500', location: 'New York, NY', salary: '$90k - $130k', type: 'Full-time', tags: ['Figma', 'UI/UX', 'Design System'] },
  { id: 3, title: 'Backend Developer', company: 'DataFlow', logo: 'bg-emerald-500', location: 'San Francisco, CA', salary: '$130k - $180k', type: 'Contract', tags: ['Go', 'PostgreSQL', 'AWS'] },
  { id: 4, title: 'Mobile Developer', company: 'AppWorks', logo: 'bg-orange-500', location: 'Remote', salary: '$110k - $150k', type: 'Full-time', tags: ['React Native', 'iOS', 'Android'] },
  { id: 5, title: 'DevOps Engineer', company: 'CloudScale', logo: 'bg-cyan-500', location: 'Austin, TX', salary: '$140k - $190k', type: 'Full-time', tags: ['Kubernetes', 'Terraform', 'CI/CD'] },
]

const selectedJob = ref<typeof jobs[0] | null>(null)
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-indigo-500/30 flex flex-col">
    
    <!-- Header -->
    <header class="bg-white border-b border-neutral-200 sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Briefcase class="w-5 h-5 text-white" />
          </div>
          <span class="font-black text-xl tracking-tight">Hire<span class="text-indigo-600">Hub</span></span>
        </div>
        <nav class="hidden sm:flex gap-6 font-medium text-sm">
          <a href="#" class="text-indigo-600">Find Jobs</a>
          <a href="#" class="text-neutral-500 hover:text-neutral-900 transition-colors">Companies</a>
          <a href="#" class="text-neutral-500 hover:text-neutral-900 transition-colors">Salaries</a>
        </nav>
        <button class="bg-neutral-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-neutral-800 transition-colors">Post a Job</button>
      </div>
    </header>

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 relative">
      
      <!-- Main Content (Job List) -->
      <div class="flex-1 min-w-0 flex flex-col">
        
        <!-- Search & Filter -->
        <div class="bg-white p-2 rounded-2xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row gap-2 mb-8">
          <div class="flex-1 relative flex items-center">
            <Search class="absolute left-3 w-5 h-5 text-neutral-400" />
            <input type="text" placeholder="Job title, keywords..." class="w-full pl-10 pr-4 py-3 bg-transparent outline-none font-medium" />
          </div>
          <div class="hidden sm:block w-px bg-neutral-200 my-2"></div>
          <div class="flex-1 relative flex items-center border-t sm:border-t-0 border-neutral-200 pt-2 sm:pt-0">
            <MapPin class="absolute left-3 w-5 h-5 text-neutral-400" />
            <input type="text" placeholder="City, state, or remote" class="w-full pl-10 pr-4 py-3 bg-transparent outline-none font-medium" />
          </div>
          <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-colors">Search</button>
        </div>

        <div class="flex justify-between items-end mb-4">
          <h2 class="text-2xl font-black">Recommended Jobs</h2>
          <button class="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors">
            <Filter class="w-4 h-4" /> Filters
          </button>
        </div>

        <!-- Job Cards -->
        <div class="space-y-4">
          <div 
            v-for="job in jobs" :key="job.id"
            @click="selectedJob = job"
            class="bg-white border rounded-2xl p-6 cursor-pointer transition-all duration-200 group relative overflow-hidden"
            :class="selectedJob?.id === job.id ? 'border-indigo-600 shadow-md ring-1 ring-indigo-600' : 'border-neutral-200 hover:border-indigo-300 hover:shadow-md'"
          >
            <!-- Highlight bar -->
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 transform scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300"></div>
            
            <div class="flex items-start gap-4 mb-4">
              <div :class="[job.logo, 'w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-white font-black text-xl shadow-inner']">
                {{ job.company.charAt(0) }}
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-lg text-neutral-900 group-hover:text-indigo-600 transition-colors">{{ job.title }}</h3>
                <p class="text-neutral-500 text-sm font-medium">{{ job.company }}</p>
              </div>
              <span class="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-bold uppercase tracking-wider rounded-lg border border-neutral-200">{{ job.type }}</span>
            </div>

            <div class="flex flex-wrap items-center gap-4 text-sm text-neutral-600 font-medium mb-4">
              <div class="flex items-center gap-1.5 bg-neutral-50 px-2 py-1 rounded"><MapPin class="w-4 h-4 text-neutral-400" /> {{ job.location }}</div>
              <div class="flex items-center gap-1.5 bg-neutral-50 px-2 py-1 rounded"><DollarSign class="w-4 h-4 text-neutral-400" /> {{ job.salary }}</div>
            </div>

            <div class="flex items-center gap-2">
              <span v-for="tag in job.tags" :key="tag" class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide-over Job Detail Pane (Desktop) / Modal (Mobile) -->
      <div 
        class="fixed inset-0 bg-neutral-900/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        :class="selectedJob ? 'opacity-100' : 'opacity-0 pointer-events-none'"
        @click="selectedJob = null"
      ></div>

      <div 
        class="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:relative md:transform-none md:shadow-none md:bg-transparent md:w-[400px] md:z-0 flex flex-col"
        :class="selectedJob ? 'translate-x-0' : 'translate-x-full md:hidden'"
      >
        <div v-if="selectedJob" class="h-full flex flex-col bg-white md:rounded-2xl md:border border-neutral-200 md:shadow-sm overflow-hidden">
          
          <!-- Sticky Detail Header -->
          <div class="p-6 border-b border-neutral-200 bg-white relative">
            <button @click="selectedJob = null" class="absolute top-6 right-6 p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors md:hidden">
              <X class="w-5 h-5" />
            </button>
            <div :class="[selectedJob.logo, 'w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-inner mb-4']">
              {{ selectedJob.company.charAt(0) }}
            </div>
            <h2 class="text-2xl font-black mb-1 leading-tight">{{ selectedJob.title }}</h2>
            <p class="text-indigo-600 font-bold mb-4">{{ selectedJob.company }}</p>
            <div class="flex gap-2 text-sm font-medium">
              <span class="flex items-center gap-1"><MapPin class="w-4 h-4 text-neutral-400" /> {{ selectedJob.location }}</span>
              <span class="text-neutral-300">•</span>
              <span class="flex items-center gap-1"><DollarSign class="w-4 h-4 text-neutral-400" /> {{ selectedJob.salary }}</span>
            </div>
          </div>

          <!-- Detail Body -->
          <div class="p-6 flex-1 overflow-y-auto custom-scrollbar prose prose-neutral prose-sm max-w-none">
            <h3 class="font-bold text-lg mb-2">About the role</h3>
            <p>We are looking for a highly skilled {{ selectedJob.title }} to join our dynamic team at {{ selectedJob.company }}. You will be responsible for building high-quality, scalable applications.</p>
            
            <h3 class="font-bold text-lg mt-6 mb-2">Requirements</h3>
            <ul class="list-disc pl-5 space-y-1">
              <li>5+ years of experience in related field</li>
              <li>Strong proficiency in modern frameworks</li>
              <li>Experience with cloud infrastructure</li>
              <li>Excellent communication skills</li>
            </ul>

            <h3 class="font-bold text-lg mt-6 mb-2">Benefits</h3>
            <ul class="list-disc pl-5 space-y-1">
              <li>Competitive equity package</li>
              <li>Unlimited PTO</li>
              <li>Health, Dental, Vision</li>
              <li>Home office stipend</li>
            </ul>
          </div>

          <!-- Sticky Apply Footer -->
          <div class="p-6 border-t border-neutral-200 bg-white shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
            <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
              Apply for this Job <ArrowRight class="w-5 h-5" />
            </button>
          </div>

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
