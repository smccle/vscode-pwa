"use strict";const perf=require("./vs/base/common/performance");perf.mark("code/didStartMain");const path=require("path"),fs=require("fs"),os=require("os"),{getNLSConfiguration}=require("./vs/base/node/languagePacks"),bootstrap=require("./bootstrap"),bootstrapNode=require("./bootstrap-node"),{getDefaultUserDataPath}=require("./vs/base/node/userDataPath"),product=require("../product.json"),{app,protocol,crashReporter}=require("electron");app.allowRendererProcessReuse=!1;const portable=bootstrapNode.configurePortable(product);bootstrap.enableASARSupport(void 0);const args=parseCLIArgs(),userDataPath=getUserDataPath(args);app.setPath("userData",userDataPath);const argvConfig=configureCommandlineSwitchesSync(args);configureCrashReporter(),portable&&portable.isPortable&&app.setAppLogsPath(path.join(userDataPath,"logs")),setCurrentWorkingDirectory(),protocol.registerSchemesAsPrivileged([{scheme:"vscode-webview",privileges:{standard:!0,secure:!0,supportFetchAPI:!0,corsEnabled:!0}},{scheme:"vscode-webview-resource",privileges:{secure:!0,standard:!0,supportFetchAPI:!0,corsEnabled:!0}},{scheme:"vscode-file",privileges:{secure:!0,standard:!0,supportFetchAPI:!0,corsEnabled:!0}}]),registerListeners();const nodeCachedDataDir=getNodeCachedDir();let nlsConfigurationPromise;const metaDataFile=path.join(__dirname,"nls.metadata.json"),locale=getUserDefinedLocale(argvConfig);locale&&(nlsConfigurationPromise=getNLSConfiguration(product.commit,userDataPath,metaDataFile,locale)),app.once("ready",function(){if(args.trace){const e=require("electron").contentTracing,r={categoryFilter:args["trace-category-filter"]||"*",traceOptions:args["trace-options"]||"record-until-full,enable-sampling"};e.startRecording(r).finally(()=>onReady())}else onReady()});function startup(e,r){r._languagePackSupport=!0,process.env.VSCODE_NLS_CONFIG=JSON.stringify(r),process.env.VSCODE_NODE_CACHED_DATA_DIR=e||"",perf.mark("code/willLoadMainBundle"),require("./bootstrap-amd").load("vs/code/electron-main/main",()=>{perf.mark("code/didLoadMainBundle")})}async function onReady(){perf.mark("code/mainAppReady");try{const[e,r]=await Promise.all([nodeCachedDataDir.ensureExists(),resolveNlsConfiguration()]);startup(e,r)}catch(e){console.error(e)}}function configureCommandlineSwitchesSync(e){const r=["disable-hardware-acceleration","disable-color-correct-rendering","force-color-profile"];process.platform==="linux"&&r.push("force-renderer-accessibility");const t=["enable-proposed-api","enable-browser-code-loading"],a=readArgvConfigSync();Object.keys(a).forEach(s=>{const n=a[s];if(r.indexOf(s)!==-1)s==="force-color-profile"?n&&app.commandLine.appendSwitch(s,n):(n===!0||n==="true")&&(s==="disable-hardware-acceleration"?app.disableHardwareAcceleration():app.commandLine.appendSwitch(s));else if(t.indexOf(s)!==-1)switch(s){case"enable-proposed-api":Array.isArray(n)?n.forEach(i=>i&&typeof i=="string"&&process.argv.push("--enable-proposed-api",i)):console.error("Unexpected value for `enable-proposed-api` in argv.json. Expected array of extension ids.");break;case"enable-browser-code-loading":typeof n=="string"&&(process.env.ENABLE_VSCODE_BROWSER_CODE_LOADING=n);break}});const o=getJSFlags(e);return o&&app.commandLine.appendSwitch("js-flags",o),e.__sandbox&&(process.env.ENABLE_VSCODE_BROWSER_CODE_LOADING="bypassHeatCheck"),a}function readArgvConfigSync(){const e=getArgvConfigPath();let r;try{r=JSON.parse(stripComments(fs.readFileSync(e).toString()))}catch(t){t&&t.code==="ENOENT"?createDefaultArgvConfigSync(e):console.warn(`Unable to read argv.json configuration file in ${e}, falling back to defaults (${t})`)}return r||(r={"disable-color-correct-rendering":!0}),r}function createDefaultArgvConfigSync(e){try{const r=path.dirname(e);fs.existsSync(r)||fs.mkdirSync(r);const t=["// This configuration file allows you to pass permanent command line arguments to VS Code.","// Only a subset of arguments is currently supported to reduce the likelihood of breaking","// the installation.","//","// PLEASE DO NOT CHANGE WITHOUT UNDERSTANDING THE IMPACT","//","// NOTE: Changing this file requires a restart of VS Code.","{","	// Use software rendering instead of hardware accelerated rendering.","	// This can help in cases where you see rendering issues in VS Code.",'	// "disable-hardware-acceleration": true,',"","	// Enabled by default by VS Code to resolve color issues in the renderer","	// See https://github.com/microsoft/vscode/issues/51791 for details",'	"disable-color-correct-rendering": true',"}"];fs.writeFileSync(e,t.join(`
`))}catch(r){console.error(`Unable to create argv.json configuration file in ${e}, falling back to defaults (${r})`)}}function getArgvConfigPath(){const e=process.env.VSCODE_PORTABLE;if(e)return path.join(e,"argv.json");let r=product.dataFolderName;return process.env.VSCODE_DEV&&(r=`${r}-dev`),path.join(os.homedir(),r,"argv.json")}function configureCrashReporter(){let e=args["crash-reporter-directory"],r="";if(e){if(e=path.normalize(e),path.isAbsolute(e)||(console.error(`The path '${e}' specified for --crash-reporter-directory must be absolute.`),app.exit(1)),!fs.existsSync(e))try{fs.mkdirSync(e)}catch(o){console.error(`The path '${e}' specified for --crash-reporter-directory does not seem to exist or cannot be created.`),app.exit(1)}console.log(`Found --crash-reporter-directory argument. Setting crashDumps directory to be '${e}'`),app.setPath("crashDumps",e)}else{const o=product.appCenter;if(o&&argvConfig["enable-crash-reporter"]&&!args["disable-crash-reporter"]){const s=process.platform==="win32",n=process.platform==="linux",i=process.platform==="darwin",c=argvConfig["crash-reporter-id"];if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(c)){if(s)switch(process.arch){case"ia32":r=o["win32-ia32"];break;case"x64":r=o["win32-x64"];break;case"arm64":r=o["win32-arm64"];break}else if(i)if(product.darwinUniversalAssetId)r=o["darwin-universal"];else switch(process.arch){case"x64":r=o.darwin;break;case"arm64":r=o["darwin-arm64"];break}else n&&(r=o["linux-x64"]);r=r.concat("&uid=",c,"&iid=",c,"&sid=",c);const l=process.argv,u=l.indexOf("--");u===-1?l.push("--crash-reporter-id",c):l.splice(u,0,"--crash-reporter-id",c)}}}const t=(product.crashReporter?product.crashReporter.productName:void 0)||product.nameShort,a=(product.crashReporter?product.crashReporter.companyName:void 0)||"Microsoft";crashReporter.start({companyName:a,productName:process.env.VSCODE_DEV?`${t} Dev`:t,submitURL:r,uploadToServer:!e,compress:!0})}function getJSFlags(e){const r=[];return e["js-flags"]&&r.push(e["js-flags"]),e["max-memory"]&&!/max_old_space_size=(\d+)/g.exec(e["js-flags"])&&r.push(`--max_old_space_size=${e["max-memory"]}`),r.length>0?r.join(" "):null}function getUserDataPath(e){return portable.isPortable?path.join(portable.portableDataPath,"user-data"):path.resolve(e["user-data-dir"]||getDefaultUserDataPath())}function parseCLIArgs(){return require("minimist")(process.argv,{string:["user-data-dir","locale","js-flags","max-memory","crash-reporter-directory"]})}function setCurrentWorkingDirectory(){try{process.platform==="win32"?(process.env.VSCODE_CWD=process.cwd(),process.chdir(path.dirname(app.getPath("exe")))):process.env.VSCODE_CWD&&process.chdir(process.env.VSCODE_CWD)}catch(e){console.error(e)}}function registerListeners(){const e=[];global.macOpenFiles=e,app.on("open-file",function(a,o){e.push(o)});const r=[],t=function(a,o){a.preventDefault(),r.push(o)};app.on("will-finish-launching",function(){app.on("open-url",t)}),global.getOpenUrls=function(){return app.removeListener("open-url",t),r}}function getNodeCachedDir(){return new class{constructor(){this.value=this._compute()}async ensureExists(){if(typeof this.value=="string")try{return await mkdirp(this.value),this.value}catch(e){}}_compute(){if(!(process.argv.indexOf("--no-cached-data")>0)&&!process.env.VSCODE_DEV){const e=product.commit;if(!!e)return path.join(userDataPath,"CachedData",e)}}}}function mkdirp(e){const r=require("fs");return new Promise((t,a)=>{r.mkdir(e,{recursive:!0},o=>o&&o.code!=="EEXIST"?a(o):t(e))})}async function resolveNlsConfiguration(){let e=nlsConfigurationPromise?await nlsConfigurationPromise:void 0;if(!e){let r=app.getLocale();r?(r=r.toLowerCase(),e=await getNLSConfiguration(product.commit,userDataPath,metaDataFile,r),e||(e={locale:r,availableLanguages:{}})):e={locale:"en",availableLanguages:{}}}return e}function stripComments(e){const r=/("(?:[^\\"]*(?:\\.)?)*")|('(?:[^\\']*(?:\\.)?)*')|(\/\*(?:\r?\n|.)*?\*\/)|(\/{2,}.*?(?:(?:\r?\n)|$))/g;return e.replace(r,function(t,a,o,s,n){if(s)return"";if(n){const i=n.length;return i>2&&n[i-1]===`
`?n[i-2]==="\r"?`\r
`:`
`:""}else return t})}function getUserDefinedLocale(e){const r=args.locale;return r?r.toLowerCase():e.locale&&typeof e.locale=="string"?e.locale.toLowerCase():void 0}

//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/f30a9b73e8ffc278e71575118b6bf568f04587c8/core/main.js.map