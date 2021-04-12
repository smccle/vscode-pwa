const sw=self,VERSION=1,resourceCacheName=`vscode-resource-cache-${VERSION}`,rootPath=sw.location.pathname.replace(/\/service-worker.js$/,""),resourceRoot=rootPath+"/vscode-resource",resolveTimeout=3e4;class RequestStore{constructor(){this.map=new Map,this.requestPool=0}get(e){const t=this.map.get(e);return t&&t.promise}create(){const e=++this.requestPool;let t;const o=new Promise(l=>t=l),a={resolve:t,promise:o};this.map.set(e,a);const i=()=>{if(clearTimeout(r),this.map.get(e)===a)return this.map.delete(e)},r=setTimeout(i,resolveTimeout);return{requestId:e,promise:o}}resolve(e,t){const o=this.map.get(e);return o?(o.resolve(t),this.map.delete(e),!0):!1}}const resourceRequestStore=new RequestStore,localhostRequestStore=new RequestStore,notFound=()=>new Response("Not Found",{status:404});sw.addEventListener("message",async n=>{switch(n.data.channel){case"version":{const e=n.source;sw.clients.get(e.id).then(t=>{t&&t.postMessage({channel:"version",version:VERSION})});return}case"did-load-resource":{let e;const t=n.data.data;switch(t.status){case 200:{e={type:"response",body:t.data,mime:t.mime,etag:t.etag};break}case 304:{e={type:"not-modified",mime:t.mime};break}}resourceRequestStore.resolve(t.id,e)||console.log("Could not resolve unknown resource",t.path);return}case"did-load-localhost":{const e=getWebviewIdForClient(n.source),t=n.data.data;localhostRequestStore.resolve(t.id,t.location)||console.log("Could not resolve unknown localhost",t.origin);return}}console.log("Unknown message")}),sw.addEventListener("fetch",n=>{const e=new URL(n.request.url);if(e.origin===sw.origin&&e.pathname.startsWith(resourceRoot+"/"))return n.respondWith(processResourceRequest(n,e));if(e.origin!==sw.origin&&e.host.match(/^localhost:(\d+)$/))return n.respondWith(processLocalhostRequest(n,e))}),sw.addEventListener("install",n=>{n.waitUntil(sw.skipWaiting())}),sw.addEventListener("activate",n=>{n.waitUntil(sw.clients.claim())});async function processResourceRequest(n,e){const t=await sw.clients.get(n.clientId);if(!t)return console.log("Could not find inner client for request"),notFound();const o=getWebviewIdForClient(t),a=e.pathname.startsWith(resourceRoot+"/")?e.pathname.slice(resourceRoot.length):e.pathname;async function i(s,h){if(!s)return notFound();if(s.type==="not-modified"){if(h)return h.clone();throw new Error("No cache found")}const m=s.etag?{ETag:s.etag,"Cache-Control":"no-cache"}:{},p=new Response(s.body,{status:200,headers:{"Content-Type":s.mime,...m}});return s.etag&&caches.open(resourceCacheName).then(g=>g.put(n.request,p)),p.clone()}const r=await getOuterIframeClient(o);if(!r)return console.log("Could not find parent client for request"),notFound();const c=await(await caches.open(resourceCacheName)).match(n.request),{requestId:u,promise:d}=resourceRequestStore.create();return r.postMessage({channel:"load-resource",id:u,path:a,ifNoneMatch:c==null?void 0:c.headers.get("ETag")}),d.then(s=>i(s,c))}async function processLocalhostRequest(n,e){const t=await sw.clients.get(n.clientId);if(!!t){const o=getWebviewIdForClient(t),a=e.origin,i=u=>{if(!u)return fetch(n.request);const d=n.request.url.replace(new RegExp(`^${e.origin}(/|$)`),`${u}$1`);return new Response(null,{status:302,headers:{Location:d}})},r=await getOuterIframeClient(o);if(!r)return console.log("Could not find parent client for request"),notFound();const{requestId:l,promise:c}=localhostRequestStore.create();return r.postMessage({channel:"load-localhost",origin:a,id:l}),c.then(i)}}function getWebviewIdForClient(n){return new URL(n.url).search.match(/\bid=([a-z0-9-]+)/i)[1]}async function getOuterIframeClient(n){return(await sw.clients.matchAll({includeUncontrolled:!0})).find(t=>{const o=new URL(t.url);return(o.pathname===`${rootPath}/`||o.pathname===`${rootPath}/index.html`)&&o.search.match(new RegExp("\\bid="+n))})}

//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/f30a9b73e8ffc278e71575118b6bf568f04587c8/core/vs/workbench/contrib/webview/browser/pre/service-worker.js.map
