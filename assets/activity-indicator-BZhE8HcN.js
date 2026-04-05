import{j as o}from"./ui-core-CxevLRjf.js";import{u as p,V as d}from"./index-BTmBpNhZ.js";const h={xs:12,sm:16,md:20,lg:24};function $({size:s="sm",color:e,className:l}){const{t:r}=p(),a=typeof s=="number"?s:h[s],i=8,c=.8,t=[1,.7,.5,.35,.25,.2,.17,.15];return o.jsxs("div",{className:d("relative inline-flex items-center justify-center",l),style:{width:a,height:a},role:"status","aria-label":r("common.loading.default"),children:[o.jsx("svg",{viewBox:"0 0 24 24",width:a,height:a,style:{color:e?.startsWith("text-")?void 0:e},children:Array.from({length:i}).map((u,n)=>{const y=n*360/i,m=-((i-n)%i*c)/i;return o.jsx("rect",{x:"11",y:"2",width:"2",height:"6",rx:"1",fill:"currentColor",transform:`rotate(${y} 12 12)`,style:{opacity:t[n],animation:`activity-indicator-spin ${c}s steps(${i}, end) ${m}s infinite`}},n)})}),o.jsx("span",{className:"sr-only",children:r("common.loading.default")}),o.jsx("style",{children:`
        @keyframes activity-indicator-spin {
          0% { opacity: ${t[0]}; }
          12.5% { opacity: ${t[1]}; }
          25% { opacity: ${t[2]}; }
          37.5% { opacity: ${t[3]}; }
          50% { opacity: ${t[4]}; }
          62.5% { opacity: ${t[5]}; }
          75% { opacity: ${t[6]}; }
          87.5% { opacity: ${t[7]}; }
          100% { opacity: ${t[0]}; }
        }
      `})]})}export{$ as A};
