(function(){var c=["vs/code/browser/workbench/workbench","require","exports","vs/workbench/workbench.web.api","vs/base/common/uri"],a=function(i){for(var s=[],r=0,o=i.length;r<o;r++)s[r]=c[i[r]];return s};define(c[0],a([1,2,3,4]),function(i,s,r,o){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),async function(){let e={};window.product?e=window.product:e=await(await fetch("/product.json")).json(),Array.isArray(e.staticExtensions)&&e.staticExtensions.forEach(n=>{n.extensionLocation=o.URI.revive(n.extensionLocation)});let t;if(e.folderUri?t={folderUri:o.URI.revive(e.folderUri)}:e.workspaceUri?t={workspaceUri:o.URI.revive(e.workspaceUri)}:t=void 0,t){const n={workspace:t,open:async()=>{},trusted:!0};e=Object.assign(Object.assign({},e),{workspaceProvider:n})}r.create(document.body,e)}()})}).call(this);

//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/f30a9b73e8ffc278e71575118b6bf568f04587c8/core/vs/code/browser/workbench/workbench.js.map
