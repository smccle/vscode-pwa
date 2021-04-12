/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/(function(){var I=["require","exports","vs/base/common/platform","vs/base/common/extpath","vs/base/common/strings","vs/base/common/network","vs/base/common/uri","vs/base/common/path","vs/base/common/resources","vs/base/common/types","vs/workbench/contrib/output/common/outputLinkComputer","vs/editor/common/core/range"],S=function(O){for(var e=[],m=0,d=O.length;m<d;m++)e[m]=I[O[m]];return e};define(I[3],S([0,1,2,4,7,9]),function(O,e,m,d,c,w){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.parseLineAndColumnAware=e.indexOfPath=e.getDriveLetter=e.hasDriveLetter=e.isRootOrDriveLetter=e.sanitizeFilePath=e.isWindowsDriveLetter=e.isEqualOrParent=e.isEqual=e.isValidBasename=e.isUNC=e.getRoot=e.toSlashes=e.isPathSeparator=void 0;function A(i){return i===47||i===92}e.isPathSeparator=A;function l(i){return i.replace(/[\\/]/g,c.posix.sep)}e.toSlashes=l;function a(i,s=c.posix.sep){if(!i)return"";const u=i.length,C=i.charCodeAt(0);if(A(C)){if(A(i.charCodeAt(1))&&!A(i.charCodeAt(2))){let U=3;const q=U;for(;U<u&&!A(i.charCodeAt(U));U++);if(q!==U&&!A(i.charCodeAt(U+1))){for(U+=1;U<u;U++)if(A(i.charCodeAt(U)))return i.slice(0,U+1).replace(/[\\/]/g,s)}}return s}else if(r(C)&&i.charCodeAt(1)===58)return A(i.charCodeAt(2))?i.slice(0,2)+s:i.slice(0,2);let E=i.indexOf("://");if(E!==-1){for(E+=3;E<u;E++)if(A(i.charCodeAt(E)))return i.slice(0,E+1)}return""}e.getRoot=a;function g(i){if(!m.isWindows||!i||i.length<5)return!1;let s=i.charCodeAt(0);if(s!==92||(s=i.charCodeAt(1),s!==92))return!1;let u=2;const C=u;for(;u<i.length&&(s=i.charCodeAt(u),s!==92);u++);return!(C===u||(s=i.charCodeAt(u+1),isNaN(s)||s===92))}e.isUNC=g;const b=/[\\/:\*\?"<>\|]/g,R=/[\\/]/g,P=/^(con|prn|aux|clock\$|nul|lpt[0-9]|com[0-9])(\.(.*?))?$/i;function o(i,s=m.isWindows){const u=s?b:R;return!(!i||i.length===0||/^\s+$/.test(i)||(u.lastIndex=0,u.test(i))||s&&P.test(i)||i==="."||i===".."||s&&i[i.length-1]==="."||s&&i.length!==i.trim().length||i.length>255)}e.isValidBasename=o;function t(i,s,u){const C=i===s;return!u||C?C:!i||!s?!1:d.equalsIgnoreCase(i,s)}e.isEqual=t;function n(i,s,u,C=c.sep){if(i===s)return!0;if(!i||!s||s.length>i.length)return!1;if(u){if(!d.startsWithIgnoreCase(i,s))return!1;if(s.length===i.length)return!0;let U=s.length;return s.charAt(s.length-1)===C&&U--,i.charAt(U)===C}return s.charAt(s.length-1)!==C&&(s+=C),i.indexOf(s)===0}e.isEqualOrParent=n;function r(i){return i>=65&&i<=90||i>=97&&i<=122}e.isWindowsDriveLetter=r;function h(i,s){return m.isWindows&&i.endsWith(":")&&(i+=c.sep),c.isAbsolute(i)||(i=c.join(s,i)),i=c.normalize(i),m.isWindows?(i=d.rtrim(i,c.sep),i.endsWith(":")&&(i+=c.sep)):(i=d.rtrim(i,c.sep),i||(i=c.sep)),i}e.sanitizeFilePath=h;function f(i){const s=c.normalize(i);return m.isWindows?i.length>3?!1:v(s)&&(i.length===2||s.charCodeAt(2)===92):s===c.posix.sep}e.isRootOrDriveLetter=f;function v(i){return m.isWindows?r(i.charCodeAt(0))&&i.charCodeAt(1)===58:!1}e.hasDriveLetter=v;function L(i){return v(i)?i[0]:void 0}e.getDriveLetter=L;function y(i,s,u){return s.length>i.length?-1:i===s?0:(u&&(i=i.toLowerCase(),s=s.toLowerCase()),i.indexOf(s))}e.indexOfPath=y;function T(i){const s=i.split(":");let u,C,E;if(s.forEach(U=>{const q=Number(U);w.isNumber(q)?C===void 0?C=q:E===void 0&&(E=q):u=u?[u,U].join(":"):U}),!u)throw new Error("Format for `--goto` should be: `FILE:LINE(:COLUMN)`");return{path:u,line:C!==void 0?C:void 0,column:E!==void 0?E:C!==void 0?1:void 0}}e.parseLineAndColumnAware=T}),define(I[5],S([0,1,6,2]),function(O,e,m,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.FileAccess=e.RemoteAuthorities=e.Schemas=void 0;var c;(function(l){l.inMemory="inmemory",l.vscode="vscode",l.internal="private",l.walkThrough="walkThrough",l.walkThroughSnippet="walkThroughSnippet",l.http="http",l.https="https",l.file="file",l.mailto="mailto",l.untitled="untitled",l.data="data",l.command="command",l.vscodeRemote="vscode-remote",l.vscodeRemoteResource="vscode-remote-resource",l.userData="vscode-userdata",l.vscodeCustomEditor="vscode-custom-editor",l.vscodeNotebook="vscode-notebook",l.vscodeNotebookCell="vscode-notebook-cell",l.vscodeNotebookCellMetadata="vscode-notebook-cell-metadata",l.vscodeSettings="vscode-settings",l.vscodeWorkspaceTrust="vscode-workspace-trust",l.webviewPanel="webview-panel",l.vscodeWebview="vscode-webview",l.vscodeWebviewResource="vscode-webview-resource",l.extension="extension",l.vscodeFileResource="vscode-file"})(c=e.Schemas||(e.Schemas={}));class w{constructor(){this._hosts=Object.create(null),this._ports=Object.create(null),this._connectionTokens=Object.create(null),this._preferredWebSchema="http",this._delegate=null}setPreferredWebSchema(a){this._preferredWebSchema=a}setDelegate(a){this._delegate=a}set(a,g,b){this._hosts[a]=g,this._ports[a]=b}setConnectionToken(a,g){this._connectionTokens[a]=g}rewrite(a){if(this._delegate)return this._delegate(a);const g=a.authority;let b=this._hosts[g];b&&b.indexOf(":")!==-1&&(b=`[${b}]`);const R=this._ports[g],P=this._connectionTokens[g];let o=`path=${encodeURIComponent(a.path)}`;return typeof P=="string"&&(o+=`&tkn=${encodeURIComponent(P)}`),m.URI.from({scheme:d.isWeb?this._preferredWebSchema:c.vscodeRemoteResource,authority:`${b}:${R}`,path:"/vscode-remote-resource",query:o})}}e.RemoteAuthorities=new w;class A{constructor(){this.FALLBACK_AUTHORITY="vscode-app"}asBrowserUri(a,g,b){const R=this.toUri(a,g);return R.scheme===c.vscodeRemote?e.RemoteAuthorities.rewrite(R):d.isNative&&(b||d.isPreferringBrowserCodeLoad)&&R.scheme===c.file?R.with({scheme:c.vscodeFileResource,authority:R.authority||this.FALLBACK_AUTHORITY,query:null,fragment:null}):R}asFileUri(a,g){const b=this.toUri(a,g);return b.scheme===c.vscodeFileResource?b.with({scheme:c.file,authority:b.authority!==this.FALLBACK_AUTHORITY?b.authority:null,query:null,fragment:null}):b}toUri(a,g){return m.URI.isUri(a)?a:m.URI.parse(g.toUrl(a))}}e.FileAccess=new A}),define(I[8],S([0,1,3,7,6,4,5,2]),function(O,e,m,d,c,w,A,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.toLocalResource=e.DataUri=e.distinctParents=e.addTrailingPathSeparator=e.removeTrailingPathSeparator=e.hasTrailingPathSeparator=e.isEqualAuthority=e.isAbsolutePath=e.resolvePath=e.relativePath=e.normalizePath=e.joinPath=e.dirname=e.extname=e.basename=e.basenameOrAuthority=e.getComparisonKey=e.isEqualOrParent=e.isEqual=e.extUriIgnorePathCase=e.extUriBiasedIgnorePathCase=e.extUri=e.ExtUri=e.originalFSPath=void 0;function a(o){return c.uriToFsPath(o,!0)}e.originalFSPath=a;class g{constructor(t){this._ignorePathCasing=t}compare(t,n,r=!1){return t===n?0:w.compare(this.getComparisonKey(t,r),this.getComparisonKey(n,r))}isEqual(t,n,r=!1){return t===n?!0:!t||!n?!1:this.getComparisonKey(t,r)===this.getComparisonKey(n,r)}getComparisonKey(t,n=!1){return t.with({path:this._ignorePathCasing(t)?t.path.toLowerCase():void 0,fragment:n?null:void 0}).toString()}ignorePathCasing(t){return this._ignorePathCasing(t)}isEqualOrParent(t,n,r=!1){if(t.scheme===n.scheme){if(t.scheme===A.Schemas.file)return m.isEqualOrParent(a(t),a(n),this._ignorePathCasing(t))&&t.query===n.query&&(r||t.fragment===n.fragment);if(e.isEqualAuthority(t.authority,n.authority))return m.isEqualOrParent(t.path,n.path,this._ignorePathCasing(t),"/")&&t.query===n.query&&(r||t.fragment===n.fragment)}return!1}joinPath(t,...n){return c.URI.joinPath(t,...n)}basenameOrAuthority(t){return e.basename(t)||t.authority}basename(t){return d.posix.basename(t.path)}extname(t){return d.posix.extname(t.path)}dirname(t){if(t.path.length===0)return t;let n;return t.scheme===A.Schemas.file?n=c.URI.file(d.dirname(a(t))).path:(n=d.posix.dirname(t.path),t.authority&&n.length&&n.charCodeAt(0)!==47&&(console.error(`dirname("${t.toString})) resulted in a relative path`),n="/")),t.with({path:n})}normalizePath(t){if(!t.path.length)return t;let n;return t.scheme===A.Schemas.file?n=c.URI.file(d.normalize(a(t))).path:n=d.posix.normalize(t.path),t.with({path:n})}relativePath(t,n){if(!(t.scheme!==n.scheme||!e.isEqualAuthority(t.authority,n.authority))){if(t.scheme===A.Schemas.file){const f=d.relative(a(t),a(n));return l.isWindows?m.toSlashes(f):f}let r=t.path||"/",h=n.path||"/";if(this._ignorePathCasing(t)){let f=0;for(const v=Math.min(r.length,h.length);f<v&&!(r.charCodeAt(f)!==h.charCodeAt(f)&&r.charAt(f).toLowerCase()!==h.charAt(f).toLowerCase());f++);r=h.substr(0,f)+r.substr(f)}return d.posix.relative(r,h)}}resolvePath(t,n){if(t.scheme===A.Schemas.file){const r=c.URI.file(d.resolve(a(t),n));return t.with({authority:r.authority,path:r.path})}return n.indexOf("/")===-1&&(n=m.toSlashes(n),/^[a-zA-Z]:(\/|$)/.test(n)&&(n="/"+n)),t.with({path:d.posix.resolve(t.path,n)})}isAbsolutePath(t){return!!t.path&&t.path[0]==="/"}isEqualAuthority(t,n){return t===n||w.equalsIgnoreCase(t,n)}hasTrailingPathSeparator(t,n=d.sep){if(t.scheme===A.Schemas.file){const r=a(t);return r.length>m.getRoot(r).length&&r[r.length-1]===n}else{const r=t.path;return r.length>1&&r.charCodeAt(r.length-1)===47&&!/^[a-zA-Z]:(\/$|\\$)/.test(t.fsPath)}}removeTrailingPathSeparator(t,n=d.sep){return e.hasTrailingPathSeparator(t,n)?t.with({path:t.path.substr(0,t.path.length-1)}):t}addTrailingPathSeparator(t,n=d.sep){let r=!1;if(t.scheme===A.Schemas.file){const h=a(t);r=h!==void 0&&h.length===m.getRoot(h).length&&h[h.length-1]===n}else{n="/";const h=t.path;r=h.length===1&&h.charCodeAt(h.length-1)===47}return!r&&!e.hasTrailingPathSeparator(t,n)?t.with({path:t.path+"/"}):t}}e.ExtUri=g,e.extUri=new g(()=>!1),e.extUriBiasedIgnorePathCase=new g(o=>o.scheme===A.Schemas.file?!l.isLinux:!0),e.extUriIgnorePathCase=new g(o=>!0),e.isEqual=e.extUri.isEqual.bind(e.extUri),e.isEqualOrParent=e.extUri.isEqualOrParent.bind(e.extUri),e.getComparisonKey=e.extUri.getComparisonKey.bind(e.extUri),e.basenameOrAuthority=e.extUri.basenameOrAuthority.bind(e.extUri),e.basename=e.extUri.basename.bind(e.extUri),e.extname=e.extUri.extname.bind(e.extUri),e.dirname=e.extUri.dirname.bind(e.extUri),e.joinPath=e.extUri.joinPath.bind(e.extUri),e.normalizePath=e.extUri.normalizePath.bind(e.extUri),e.relativePath=e.extUri.relativePath.bind(e.extUri),e.resolvePath=e.extUri.resolvePath.bind(e.extUri),e.isAbsolutePath=e.extUri.isAbsolutePath.bind(e.extUri),e.isEqualAuthority=e.extUri.isEqualAuthority.bind(e.extUri),e.hasTrailingPathSeparator=e.extUri.hasTrailingPathSeparator.bind(e.extUri),e.removeTrailingPathSeparator=e.extUri.removeTrailingPathSeparator.bind(e.extUri),e.addTrailingPathSeparator=e.extUri.addTrailingPathSeparator.bind(e.extUri);function b(o,t){const n=[];for(let r=0;r<o.length;r++){const h=t(o[r]);o.some((f,v)=>v===r?!1:e.isEqualOrParent(h,t(f)))||n.push(o[r])}return n}e.distinctParents=b;var R;(function(o){o.META_DATA_LABEL="label",o.META_DATA_DESCRIPTION="description",o.META_DATA_SIZE="size",o.META_DATA_MIME="mime";function t(n){const r=new Map;n.path.substring(n.path.indexOf(";")+1,n.path.lastIndexOf(";")).split(";").forEach(v=>{const[L,y]=v.split(":");L&&y&&r.set(L,y)});const f=n.path.substring(0,n.path.indexOf(";"));return f&&r.set(o.META_DATA_MIME,f),r}o.parseMetaData=t})(R=e.DataUri||(e.DataUri={}));function P(o,t,n){if(t){let r=o.path;return r&&r[0]!==d.posix.sep&&(r=d.posix.sep+r),o.with({scheme:n,authority:t,path:r})}return o.with({scheme:n})}e.toLocalResource=P}),define(I[10],S([0,1,6,3,8,4,11,2,5]),function(O,e,m,d,c,w,A,l,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.create=e.OutputLinkComputer=void 0;class g{constructor(P,o){this.ctx=P,this.patterns=new Map,this.computePatterns(o)}computePatterns(P){const o=P.workspaceFolders.sort((t,n)=>n.length-t.length).map(t=>m.URI.parse(t));for(const t of o){const n=g.createPatterns(t);this.patterns.set(t,n)}}getModel(P){return this.ctx.getMirrorModels().find(t=>t.uri.toString()===P)}computeLinks(P){const o=this.getModel(P);if(!o)return[];const t=[],n=w.splitLines(o.getValue());for(const[r,h]of this.patterns){const f={toResource:v=>typeof v=="string"?c.joinPath(r,v):null};for(let v=0,L=n.length;v<L;v++)t.push(...g.detectLinks(n[v],v+1,h,f))}return t}static createPatterns(P){const o=[],t=P.scheme===a.Schemas.file?P.fsPath:P.path,n=[t];l.isWindows&&P.scheme===a.Schemas.file&&n.push(d.toSlashes(t));for(const r of n){const h='[^\\s\\(\\):<>"]',v=`${`(?:${h}| ${h})`}+\\.${h}+`,L=`${h}+`;o.push(new RegExp(w.escapeRegExpCharacters(r)+`(${v}) on line ((\\d+)(, column (\\d+))?)`,"gi")),o.push(new RegExp(w.escapeRegExpCharacters(r)+`(${v}):line ((\\d+)(, column (\\d+))?)`,"gi")),o.push(new RegExp(w.escapeRegExpCharacters(r)+`(${v})(\\s?\\((\\d+)(,(\\d+))?)\\)`,"gi")),o.push(new RegExp(w.escapeRegExpCharacters(r)+`(${L})(:(\\d+))?(:(\\d+))?`,"gi"))}return o}static detectLinks(P,o,t,n){const r=[];return t.forEach(h=>{h.lastIndex=0;let f,v=0;for(;(f=h.exec(P))!==null;){const L=w.rtrim(f[1],".").replace(/\\/g,"/");let y;try{const u=n.toResource(L);u&&(y=u.toString())}catch(u){continue}if(f[3]){const u=f[3];if(f[5]){const C=f[5];y=w.format("{0}#{1},{2}",y,u,C)}else y=w.format("{0}#{1}",y,u)}const T=w.rtrim(f[0],"."),i=P.indexOf(T,v);v=i+T.length;const s={startColumn:i+1,startLineNumber:o,endColumn:i+1+T.length,endLineNumber:o};if(r.some(u=>A.Range.areIntersectingOrTouching(u.range,s)))return;r.push({range:s,url:y})}}),r}}e.OutputLinkComputer=g;function b(R,P){return new g(R,P)}e.create=b})}).call(this);

//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/f30a9b73e8ffc278e71575118b6bf568f04587c8/core/vs/workbench/contrib/output/common/outputLinkComputer.js.map
