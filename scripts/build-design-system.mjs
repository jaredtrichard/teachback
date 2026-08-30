import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';

const root=path.resolve(import.meta.dirname,'..');
const namespace='TeachbackDesignSystem_417209';
const components=[
  ['Button','components/core/Button.jsx'],
  ['Card','components/core/Card.jsx'],
  ['IconButton','components/core/IconButton.jsx'],
  ['ProgressBar','components/core/ProgressBar.jsx'],
  ['StateBadge','components/core/StateBadge.jsx'],
  ['StreakBadge','components/core/StreakBadge.jsx'],
  ['CriterionRow','components/feedback/CriterionRow.jsx'],
  ['ResultBanner','components/feedback/ResultBanner.jsx'],
  ['TeachBackBox','components/forms/TeachBackBox.jsx'],
  ['TopicChip','components/forms/TopicChip.jsx']
];
const screenSources=['ui_kits/web/data.js','ui_kits/web/screens.jsx'];
const sourcePaths=[...components.map(([,sourcePath])=>sourcePath),...screenSources];
const componentManifest=components.map(([name,sourcePath])=>({name,sourcePath}));
const hash=source=>crypto.createHash('sha256').update(source).digest('hex').slice(0,12);
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');

const tscPath=fs.realpathSync(execFileSync('which',['tsc'],{encoding:'utf8'}).trim());
const require=createRequire(import.meta.url);
const ts=require(path.resolve(path.dirname(tscPath),'../lib/typescript.js'));

function compile(relative){
  let source=read(relative);
  source=source.replace(/^import React(?:,\{([^}]*)\})? from ['"]react['"];?\s*/m,(_,hooks)=>hooks?`const {${hooks}}=React;\n`:'');
  source=source.replace(/\bexport function\b/g,'function');
  if(relative==='ui_kits/web/screens.jsx') source=source.replaceAll(`window.${namespace}`,'__ds_scope');
  return ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.React,target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.None,removeComments:false}}).outputText.trim();
}

const bundleMetadata={
  format:4,
  namespace,
  components:componentManifest,
  sourceHashes:Object.fromEntries(sourcePaths.map(relative=>[relative,hash(read(relative))])),
  inlinedExternals:[],
  unexposedExports:[]
};

const blocks=[];
for(const [name,relative] of components){
  blocks.push(`// ${relative}\ntry { (() => {\n${compile(relative)}\nObject.assign(__ds_scope, { ${name} });\n})(); } catch (e) { __ds_ns.__errors.push({ path: ${JSON.stringify(relative)}, error: String((e && e.message) || e) }); }`);
}
for(const relative of screenSources){
  blocks.push(`// ${relative}\ntry { (() => {\n${compile(relative)}\n})(); } catch (e) { __ds_ns.__errors.push({ path: ${JSON.stringify(relative)}, error: String((e && e.message) || e) }); }`);
}
const exposes=components.map(([name])=>`__ds_ns.${name} = __ds_scope.${name};`).join('\n');
const bundle=`/* @ds-bundle: ${JSON.stringify(bundleMetadata)} */\n\n(() => {\nconst __ds_ns = (window.${namespace} = window.${namespace} || {});\nconst __ds_scope = {};\n(__ds_ns.__errors = __ds_ns.__errors || []);\n\n${blocks.join('\n\n')}\n\n${exposes}\n})();\n`;

const cardFiles=[
  'guidelines/brand-voice.html',
  'guidelines/brand-wordmark.html',
  'guidelines/colors-core.html',
  'guidelines/colors-neutrals.html',
  'guidelines/colors-states.html',
  'components/core/core.card.html',
  'components/feedback/feedback.card.html',
  'components/forms/forms.card.html',
  'guidelines/motion.html',
  'guidelines/shape-depth.html',
  'guidelines/spacing.html',
  'guidelines/type-body.html',
  'guidelines/type-display.html',
  'guidelines/type-labels.html',
  'ui_kits/web/index.html'
];

function cardMetadata(relative){
  const comment=read(relative).match(/<!--\s*@dsCard\s+([^]*?)-->/)?.[1]||'';
  const fields={};
  for(const match of comment.matchAll(/(\w+)="([^"]*)"/g)) fields[match[1]]=match[2];
  return {path:relative,group:fields.group,viewport:fields.viewport,subtitle:fields.subtitle,name:fields.name};
}

const tokenFiles=['tokens/colors.css','tokens/typography.css','tokens/spacing.css','tokens/effects.css'];
function tokenKind(relative,name){
  if(relative==='tokens/colors.css') return 'color';
  if(relative==='tokens/typography.css') return 'font';
  if(relative==='tokens/spacing.css') return 'spacing';
  if(name.startsWith('--radius-')) return 'radius';
  if(name==='--border-width') return 'spacing';
  if(name.startsWith('--edge-')) return 'shadow';
  return 'other';
}
const tokens=[];
for(const relative of tokenFiles){
  for(const match of read(relative).matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)){
    const kind=tokenKind(relative,match[1]);
    const token={name:match[1],value:match[2].trim(),kind,definedIn:relative};
    if(kind==='shadow'||kind==='other') token.annotation=kind;
    tokens.push(token);
  }
}

const manifest={
  namespace,
  components:componentManifest,
  startingPoints:[
    {name:'Button',path:'components/core/Button.jsx',previewPath:'components/core/core.card.html',kind:'component',section:'Components',subtitle:'Restrained pressable button with hard edge',viewport:'700x260'},
    {name:'web',path:'ui_kits/web/index.html',previewPath:'ui_kits/web/index.html',kind:'screen',section:'Screens',subtitle:'Overview dashboard, SIE map, sequential read-then-teach',viewport:'1240x820'}
  ],
  cards:cardFiles.map(cardMetadata),
  templates:[],
  hasThumbnailHtml:true,
  globalCssPaths:[...tokenFiles,'styles.css'],
  tokens,
  themes:[],
  fonts:[],
  brandFonts:[
    {family:'Sora',status:'ok',tokens:['--font-display'],path:'tokens/typography.css'},
    {family:'DM Sans',status:'ok',tokens:['--font-body'],path:'tokens/typography.css'},
    {family:'DM Mono',status:'ok',tokens:['--font-mono'],path:'tokens/typography.css'}
  ],
  source:'spa'
};

fs.writeFileSync(path.join(root,'_ds_bundle.js'),bundle);
fs.writeFileSync(path.join(root,'_ds_manifest.json'),JSON.stringify(manifest));
