"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[103],{4262:(e,n,t)=>{t.r(n),t.d(n,{default:()=>R});var i=t(7294),s=t(512),a=t(1944),o=t(5281),l=t(9460),r=t(7846),c=t(4424),d=t(5999),u=t(2244),m=t(5893);function g(e){const{nextItem:n,prevItem:t}=e;return(0,m.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,d.I)({id:"theme.blog.post.paginator.navAriaLabel",message:"Blog post page navigation",description:"The ARIA label for the blog posts pagination"}),children:[t&&(0,m.jsx)(u.Z,{...t,subLabel:(0,m.jsx)(d.Z,{id:"theme.blog.post.paginator.newerPost",description:"The blog post button label to navigate to the newer/previous post",children:"Newer Post"})}),n&&(0,m.jsx)(u.Z,{...n,subLabel:(0,m.jsx)(d.Z,{id:"theme.blog.post.paginator.olderPost",description:"The blog post button label to navigate to the older/next post",children:"Older Post"}),isNext:!0})]})}function h(){const{assets:e,metadata:n}=(0,l.C)(),{title:t,description:i,date:s,tags:o,authors:r,frontMatter:c}=n,{keywords:d}=c,u=e.image??c.image;return(0,m.jsxs)(a.d,{title:t,description:i,keywords:d,image:u,children:[(0,m.jsx)("meta",{property:"og:type",content:"article"}),(0,m.jsx)("meta",{property:"article:published_time",content:s}),r.some((e=>e.url))&&(0,m.jsx)("meta",{property:"article:author",content:r.map((e=>e.url)).filter(Boolean).join(",")}),o.length>0&&(0,m.jsx)("meta",{property:"article:tag",content:o.map((e=>e.label)).join(",")})]})}var f=t(6668);function v(e){const n=e.map((e=>({...e,parentIndex:-1,children:[]}))),t=Array(7).fill(-1);n.forEach(((e,n)=>{const i=t.slice(2,e.level);e.parentIndex=Math.max(...i),t[e.level]=n}));const i=[];return n.forEach((e=>{const{parentIndex:t,...s}=e;t>=0?n[t].children.push(s):i.push(s)})),i}function p(e){let{toc:n,minHeadingLevel:t,maxHeadingLevel:i}=e;return n.flatMap((e=>{const n=p({toc:e.children,minHeadingLevel:t,maxHeadingLevel:i});return function(e){return e.level>=t&&e.level<=i}(e)?[{...e,children:n}]:n}))}function x(e){const n=e.getBoundingClientRect();return n.top===n.bottom?x(e.parentNode):n}function b(e,n){let{anchorTopOffset:t}=n;const i=e.find((e=>x(e).top>=t));if(i){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(x(i))?i:e[e.indexOf(i)-1]??null}return e[e.length-1]??null}function j(){const e=(0,i.useRef)(0),{navbar:{hideOnScroll:n}}=(0,f.L)();return(0,i.useEffect)((()=>{e.current=n?0:document.querySelector(".navbar").clientHeight}),[n]),e}function L(e){const n=(0,i.useRef)(void 0),t=j();(0,i.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:i,linkActiveClassName:s,minHeadingLevel:a,maxHeadingLevel:o}=e;function l(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(i),l=function(e){let{minHeadingLevel:n,maxHeadingLevel:t}=e;const i=[];for(let s=n;s<=t;s+=1)i.push(`h${s}.anchor`);return Array.from(document.querySelectorAll(i.join()))}({minHeadingLevel:a,maxHeadingLevel:o}),r=b(l,{anchorTopOffset:t.current}),c=e.find((e=>r&&r.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,t){t?(n.current&&n.current!==e&&n.current.classList.remove(s),e.classList.add(s),n.current=e):e.classList.remove(s)}(e,e===c)}))}return document.addEventListener("scroll",l),document.addEventListener("resize",l),l(),()=>{document.removeEventListener("scroll",l),document.removeEventListener("resize",l)}}),[e,t])}var C=t(9960);function H(e){let{toc:n,className:t,linkClassName:i,isChild:s}=e;return n.length?(0,m.jsx)("ul",{className:s?void 0:t,children:n.map((e=>(0,m.jsxs)("li",{children:[(0,m.jsx)(C.Z,{to:`#${e.id}`,className:i??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,m.jsx)(H,{isChild:!0,toc:e.children,className:t,linkClassName:i})]},e.id)))}):null}const N=i.memo(H);function k(e){let{toc:n,className:t="table-of-contents table-of-contents__left-border",linkClassName:s="table-of-contents__link",linkActiveClassName:a,minHeadingLevel:o,maxHeadingLevel:l,...r}=e;const c=(0,f.L)(),d=o??c.tableOfContents.minHeadingLevel,u=l??c.tableOfContents.maxHeadingLevel,g=function(e){let{toc:n,minHeadingLevel:t,maxHeadingLevel:s}=e;return(0,i.useMemo)((()=>p({toc:v(n),minHeadingLevel:t,maxHeadingLevel:s})),[n,t,s])}({toc:n,minHeadingLevel:d,maxHeadingLevel:u});return L((0,i.useMemo)((()=>{if(s&&a)return{linkClassName:s,linkActiveClassName:a,minHeadingLevel:d,maxHeadingLevel:u}}),[s,a,d,u])),(0,m.jsx)(N,{toc:g,className:t,linkClassName:s,...r})}const _={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"},y="table-of-contents__link toc-highlight",I="table-of-contents__link--active";function w(e){let{className:n,...t}=e;return(0,m.jsx)("div",{className:(0,s.Z)(_.tableOfContents,"thin-scrollbar",n),children:(0,m.jsx)(k,{...t,linkClassName:y,linkActiveClassName:I})})}var Z=t(5742);function A(){return(0,m.jsx)(d.Z,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function O(){return(0,m.jsx)(d.Z,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function E(){return(0,m.jsx)(Z.Z,{children:(0,m.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}var P=t(9047);function T(e){let{className:n}=e;return(0,m.jsx)(P.Z,{type:"caution",title:(0,m.jsx)(A,{}),className:(0,s.Z)(n,o.k.common.unlistedBanner),children:(0,m.jsx)(O,{})})}function M(e){return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(E,{}),(0,m.jsx)(T,{...e})]})}function B(e){let{sidebar:n,children:t}=e;const{metadata:i,toc:s}=(0,l.C)(),{nextItem:a,prevItem:o,frontMatter:d,unlisted:u}=i,{hide_table_of_contents:h,toc_min_heading_level:f,toc_max_heading_level:v}=d;return(0,m.jsxs)(r.Z,{sidebar:n,toc:!h&&s.length>0?(0,m.jsx)(w,{toc:s,minHeadingLevel:f,maxHeadingLevel:v}):void 0,children:[u&&(0,m.jsx)(M,{}),(0,m.jsx)(c.Z,{children:t}),(a||o)&&(0,m.jsx)(g,{nextItem:a,prevItem:o})]})}function R(e){const n=e.content;return(0,m.jsx)(l.n,{content:e.content,isBlogPostPage:!0,children:(0,m.jsxs)(a.FG,{className:(0,s.Z)(o.k.wrapper.blogPages,o.k.page.blogPostPage),children:[(0,m.jsx)(h,{}),(0,m.jsx)(B,{sidebar:e.sidebar,children:(0,m.jsx)(n,{})})]})})}}}]);