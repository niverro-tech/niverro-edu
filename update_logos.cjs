const fs = require('fs');
const files = ['index.html', 'about.html', 'courses.html', 'admissions.html', 'contact.html'];

const navLogoReplacement = `
        <a href="index.html" class="flex items-center gap-3 group">
          <div class="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 shadow-lg shadow-blue-700/30 overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
            <div class="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span class="text-white font-black text-xl tracking-tighter mix-blend-overlay">BF</span>
          </div>
          <div class="flex flex-col justify-center">
            <div class="text-xl font-black text-slate-900 leading-none tracking-tight">BRIGHT<span class="text-blue-700">FUTURE</span></div>
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Education Centre</div>
          </div>
        </a>
`.trim();

const footerLogoReplacement = `
          <div class="flex items-center gap-3 group">
            <div class="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
              <div class="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span class="text-white font-black text-xl tracking-tighter mix-blend-overlay">BF</span>
            </div>
            <div class="flex flex-col justify-center">
              <div class="text-xl font-black text-white leading-none tracking-tight">BRIGHT<span class="text-blue-400">FUTURE</span></div>
              <div class="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Education Centre</div>
            </div>
          </div>
`.trim();

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace Nav Logo (flexible whitespace matching)
    content = content.replace(
        /<a href="index\.html" class="flex items-center gap-3">[\s\S]*?<div class="bg-blue-700 p-2\.5 rounded-xl shadow-md shadow-blue-700\/30">[\s\S]*?<span class="material-symbols-outlined text-white text-2xl">school<\/span>[\s\S]*?<\/div>[\s\S]*?<div>[\s\S]*?<div class="text-lg font-bold text-blue-800 leading-none">Bright Future<\/div>[\s\S]*?<div class="text-xs text-slate-400 font-medium">Education Centre<\/div>[\s\S]*?<\/div>[\s\S]*?<\/a>/,
        navLogoReplacement
    );

    // Replace Footer Logo
    content = content.replace(
        /<div class="flex items-center gap-3">[\s\S]*?<div class="bg-blue-700 p-2\.5 rounded-xl">[\s\S]*?<span class="material-symbols-outlined text-white text-xl">school<\/span>[\s\S]*?<\/div>[\s\S]*?<div>[\s\S]*?<div class="text-white font-bold text-lg leading-none">Bright Future<\/div>[\s\S]*?<div class="text-xs text-slate-500">Education Centre<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>/,
        footerLogoReplacement
    );

    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
});
