if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return s[e]||(c=new Promise(async c=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=c}else importScripts(e),c()})),c.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},c=(c,s)=>{Promise.all(c.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(c)};self.define=(c,a,i)=>{s[c]||(s[c]=Promise.resolve().then(()=>{let s={};const n={uri:location.origin+c.slice(1)};return Promise.all(a.map(c=>{switch(c){case"exports":return s;case"module":return n;default:return e(c)}})).then(e=>{const c=i(...e);return s.default||(s.default=c),s})}))}}define("./sw.js",["./workbox-c2b5e142"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/ZQ1QMsyNEJNqOtB9NOxan/_buildManifest.js",revision:"593bee22a751cc6b6b8224f60be11b41"},{url:"/_next/static/ZQ1QMsyNEJNqOtB9NOxan/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/chunks/22e11cb5820c313b5cae739cfdf0f3bf66bf6645.25956e0355674b17ffdd.js",revision:"62c84164a7a9cb1ad45e1e4a26d4acd4"},{url:"/_next/static/chunks/33ed66dc5b417b500554de60adf8a7055052d94c.1ab5d3d86f5093426d2a.js",revision:"cb52a4693d6618245e0d55a5b1a3e1cf"},{url:"/_next/static/chunks/4159beaed50d9c573354501958c5070f03bdf990.90d6a01bb22733859ed0.js",revision:"88e460a5c6ca598de6e22c4b4107339a"},{url:"/_next/static/chunks/449de8967458b96457f665f444f224865766f30e.b3f19aa7deb58205d4f1.js",revision:"1ea8be5899dfe5321b427d57c5af6f41"},{url:"/_next/static/chunks/484bcb1e.cd20726fcce1b955bd47.js",revision:"06b480b0d7bf3375c2293b6bd745f25d"},{url:"/_next/static/chunks/52066749.33b43c732523bb546185.js",revision:"916847480836ead229917f860c15aab8"},{url:"/_next/static/chunks/8af16545f0d3a74a2a9683bb33dd46cef7300c8a.0a01836f61fc4b8d6d3d.js",revision:"55683db0be9f2d5f2b56b6681c127785"},{url:"/_next/static/chunks/a8f9ebba4babdad85f5155784665339e1eec3a17.67c1f84d46815f1f5481.js",revision:"c0ecd52f5b4aa45aab974dc583dccccb"},{url:"/_next/static/chunks/d27a74285a18893d84ef4a2380133b185dfac5dc.6047502592376c1bc7ed.js",revision:"d7d48fbb697d51480785dddb5b6d178a"},{url:"/_next/static/chunks/e449bc9822e7078fa7a6bf65dc8e9c0d542a5063.f340595a38fe41d76f12.js",revision:"a1b8b11b6dd582e98207459c35e5675f"},{url:"/_next/static/chunks/framework.cb05d56be993eb6b088a.js",revision:"18cf5f5d0de16c62614aa6853bc8704e"},{url:"/_next/static/chunks/main-e3373c5e2b1058fa500e.js",revision:"f3c3204c0e1c656237a4a02ff1f9de7b"},{url:"/_next/static/chunks/pages/_app-51e73cc695f1ab73b9a9.js",revision:"1abf75a528dccf112722bd5c09672bfe"},{url:"/_next/static/chunks/pages/_error-22a9cee7adca4be98e66.js",revision:"7af2e3652f7d52387a5f3cb13314c6c4"},{url:"/_next/static/chunks/pages/_offline-d5fd9492d74bc287f986.js",revision:"9bac40faf95ecabaaeea1a796f28f807"},{url:"/_next/static/chunks/pages/about-6df86b7ed6a44b2c6788.js",revision:"e6f59ccff1987704cdfd7e22d142960d"},{url:"/_next/static/chunks/pages/chanel-b1c18619d7255a4061d7.js",revision:"978170873d6ecf945ac2902a117f73e5"},{url:"/_next/static/chunks/pages/edit-bb514c68103425db9b51.js",revision:"2e9c7ccb4fd249e2e83f54b5e7063e78"},{url:"/_next/static/chunks/pages/index-ef6c8fd1c88d60ad2191.js",revision:"b9f8fe74c42885a97d90df9b43487749"},{url:"/_next/static/chunks/pages/login-e175d12b9afa7d707f2c.js",revision:"46ecac639b5619dd1843b56c215baa7b"},{url:"/_next/static/chunks/pages/logout-bd0764b6093dd9292714.js",revision:"53dba7e1a13d10e0625250acdd6b5abb"},{url:"/_next/static/chunks/pages/profile-a305b746db67321a2eaf.js",revision:"e81a2bf97e34f9e107626e75307961e2"},{url:"/_next/static/chunks/pages/register-459c4ae1f19f5e286f5f.js",revision:"3b8bfe82856810b663c4ea109892d410"},{url:"/_next/static/chunks/pages/search-a776fd1971dead045181.js",revision:"d01507221709ac31fd0e1c9c6ed4d240"},{url:"/_next/static/chunks/pages/upload-910118934df2d4400ad5.js",revision:"6a9edbd3444875b6d321ff62ecd7edbe"},{url:"/_next/static/chunks/pages/watch-693b63fd3fc946746f31.js",revision:"5362322c6e97f06b89fb2b2cd52c3189"},{url:"/_next/static/chunks/polyfills-7e33d56cf00e240514e7.js",revision:"f37fa0076b8da8ad61f872090b5ccb54"},{url:"/_next/static/chunks/webpack-e067438c4cf4ef2ef178.js",revision:"8c19f623e8389f11131a054a7e17ff95"},{url:"/_next/static/css/184fc494a6150827f584.css",revision:"991480cf5238f5d5b3317f50ab8066f6"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/icons/chevron-down.svg",revision:"c66b213d1dfff391c61146727032f068"},{url:"/icons/chevron-left.svg",revision:"5727f869509c87f4d25c2225f0968573"},{url:"/icons/chevron-right.svg",revision:"9c59704b1de34c9fbb54c100b907ac85"},{url:"/icons/chevron-up.svg",revision:"90f47098c8908802053427f30191c643"},{url:"/icons/down-arrow.svg",revision:"83f1b10f608db0f6d2bccef8dec2499e"},{url:"/icons/edit.svg",revision:"7a14112e034b1826aea15a675307768e"},{url:"/icons/list.svg",revision:"7da6f7a2623bd10a115cd15fc30b69e6"},{url:"/icons/logo.svg",revision:"7228fb0e9de10a76cb3e4b4d8e815565"},{url:"/icons/maximize.svg",revision:"f7c1938e9f2cd378b67945feff8cf13b"},{url:"/icons/menu.svg",revision:"ca394ec8a4754ab9db293dcac626bdcb"},{url:"/icons/minimize.svg",revision:"5a2d7706628196eedeeca2196aa009db"},{url:"/icons/more-vertical.svg",revision:"cb5a271abb22da2c93866b972f0f62c4"},{url:"/icons/pause.svg",revision:"7375c856ac1d6249eb005fb9faea66cb"},{url:"/icons/play.svg",revision:"34df31112e5959a1e5c0abf66851818d"},{url:"/icons/plus.svg",revision:"7c6c8212afc5044e4b60f59552e57e69"},{url:"/icons/search.svg",revision:"5437e5214c32dc0a8b1e3e3749edd831"},{url:"/icons/trash.svg",revision:"e688762277044cb8758d1ee0a5909169"},{url:"/icons/upload.svg",revision:"14dd1331c8efa5f93a329e56662a60f1"},{url:"/icons/volume-1.svg",revision:"e28b2925d0a65f6d6fcba582e571a08f"},{url:"/icons/volume-2.svg",revision:"f61b1e4cd0ac470a519160f6cd0c5d04"},{url:"/icons/volume-x.svg",revision:"60183b4be77c3348c3c9041fe8ed6898"},{url:"/icons/volume.svg",revision:"ce35a355a56308363663ed7f82b07166"},{url:"/icons/youtube.svg",revision:"1fe436a84ab9fcfd5cdb30d769c1ef0a"},{url:"/images/fallback.png",revision:"19ec25eae544c866296db7804d03c01f"},{url:"/logo-apple.png",revision:"bc986eee00e5bc4f625211b29c3cfd3c"},{url:"/logo.png",revision:"45bda3613f4c20c419ee36dfa30437a6"},{url:"/logo.svg",revision:"7228fb0e9de10a76cb3e4b4d8e815565"},{url:"/manifest.json",revision:"2fb1dde02977910e2f11ff94fedf487c"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"},{url:"/video-thumbnail-default.png",revision:"cd893f69a43c2537a583fd25f63c24a4"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
