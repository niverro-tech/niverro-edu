const fs = require('fs');
const files = ['index.html', 'about.html', 'courses.html', 'admissions.html', 'contact.html'];

const navLogoReplacement = `
        <a href="index.html" class="flex items-center gap-3 group shrink-0">
          <div class="flex flex-col justify-center transform group-hover:scale-105 transition-transform duration-300 origin-left">
            <div class="text-2xl font-black text-slate-900 leading-none tracking-tight">BRIGHT<span class="text-blue-700">FUTURE</span></div>
            <div class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Education Centre</div>
          </div>
        </a>
`.trim();

const footerLogoReplacement = `
          <div class="flex items-center gap-3 group shrink-0">
            <div class="flex flex-col justify-center transform group-hover:scale-105 transition-transform duration-300 origin-left">
              <div class="text-2xl font-black text-white leading-none tracking-tight">BRIGHT<span class="text-blue-400">FUTURE</span></div>
              <div class="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Education Centre</div>
            </div>
          </div>
`.trim();

// Regex matching the previous BF block
const navRegex = /<a href="index\.html" class="flex items-center gap-3 group">[\s\S]*?<div class="relative flex items-center justify-center w-11 h-11[\s\S]*?<\/div>[\s\S]*?<div class="flex flex-col justify-center">[\s\S]*?<div class="text-xl font-black text-slate-900 leading-none tracking-tight">BRIGHT<span class="text-blue-700">FUTURE<\/span><\/div>[\s\S]*?<div class="text-\[10px\] font-bold text-slate-400 uppercase tracking-\[0\.2em\] mt-1">Education Centre<\/div>[\s\S]*?<\/div>[\s\S]*?<\/a>/g;

const footerRegex = /<div class="flex items-center gap-3 group">[\s\S]*?<div class="relative flex items-center justify-center w-11 h-11[\s\S]*?<\/div>[\s\S]*?<div class="flex flex-col justify-center">[\s\S]*?<div class="text-xl font-black text-white leading-none tracking-tight">BRIGHT<span class="text-blue-400">FUTURE<\/span><\/div>[\s\S]*?<div class="text-\[10px\] font-bold text-slate-500 uppercase tracking-\[0\.2em\] mt-1">Education Centre<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>/g;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    content = content.replace(navRegex, navLogoReplacement);
    content = content.replace(footerRegex, footerLogoReplacement);

    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
});
