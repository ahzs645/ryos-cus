import{r,j as n}from"./ui-core-D0pDhx0h.js";import{c as be,u as Ge,a as Je,M as mt,b as ge,d as pe,e as ve,f as Z,g as _e,k as Be,S as gt,l as pt,m as vt,E as bt,bo as yt,n as xt,o as wt,O as Et,Z as St,aD as kt,B as qe,H as Tt,J as jt,bp as Ct,bq as _t}from"./index-DImvd7fi.js";import{A as ae,m as K}from"./motion-DC7C-474.js";import"./react-CyQK0IK8.js";import"./media-player-Dfptv93o.js";import"./zustand-CwjPl1Tm.js";import"./tiptap-CPHiBm_b.js";import"./ui-form-Bg85K0S3.js";import"./audio-DxkJfdUY.js";import"./pusher-BvD42uFZ.js";import"./hangul-CIZ_Rl7P.js";import"./three-BOJBN814.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const At=[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16",key:"qmtpty"}],["path",{d:"M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5",key:"1ufyfc"}],["path",{d:"M14.121 15.121A3 3 0 1 1 9.88 10.88",key:"11zox6"}]],Rt=be("CameraOff",At);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nt=[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],Pt=be("Camera",Nt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=[["path",{d:"M18 22H4a2 2 0 0 1-2-2V6",key:"pblm9e"}],["path",{d:"m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18",key:"nf6bnh"}],["circle",{cx:"12",cy:"8",r:"2",key:"1822b1"}],["rect",{width:"16",height:"16",x:"6",y:"2",rx:"2",key:"12espp"}]],Ut=be("Images",It);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mt=[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]],Lt=be("Timer",Mt);function Dt({onClose:u,onShowHelp:a,onShowAbout:m,onClearPhotos:b,onExportPhotos:E,effects:x,selectedEffect:e,onEffectSelect:g,availableCameras:s,selectedCameraId:l,onCameraSelect:_}){var T;const{t:h}=Ge(),[D,F]=r.useState(!1),U="photo-booth",A=(T=vt[U])==null?void 0:T.name,R=Je(i=>i.current),k=R==="xp"||R==="win98";return n.jsxs(mt,{inWindowFrame:k,children:[n.jsxs(ge,{children:[n.jsx(pe,{className:"text-md px-2 py-1 border-none focus-visible:ring-0",children:h("common.menu.file")}),n.jsxs(ve,{align:"start",sideOffset:1,className:"px-0",children:[n.jsx(Z,{onClick:E,className:"text-md h-6 px-3",children:h("apps.photo-booth.menu.exportPhotos")}),n.jsx(_e,{className:"h-[2px] bg-black my-1"}),n.jsx(Z,{onClick:b,className:"text-md h-6 px-3",children:h("apps.photo-booth.menu.clearAllPhotos")}),n.jsx(_e,{className:"h-[2px] bg-black my-1"}),n.jsx(Z,{onClick:u,className:"text-md h-6 px-3",children:h("common.menu.close")})]})]}),n.jsxs(ge,{children:[n.jsx(pe,{className:"text-md px-2 py-1 border-none focus-visible:ring-0",children:h("apps.photo-booth.menu.camera")}),n.jsx(ve,{align:"start",sideOffset:1,className:"px-0",children:s.map(i=>n.jsx(Be,{checked:l===i.deviceId,onCheckedChange:j=>{j&&_(i.deviceId)},className:"text-md h-6 px-3",children:i.label||`${h("apps.photo-booth.menu.camera")} ${i.deviceId.slice(0,4)}`},i.deviceId))})]}),n.jsxs(ge,{children:[n.jsx(pe,{className:"text-md px-2 py-1 border-none focus-visible:ring-0",children:h("apps.photo-booth.menu.effects")}),n.jsx(ve,{align:"start",sideOffset:1,className:"px-0",children:x.map(i=>n.jsx(Be,{checked:e.name===i.name,onCheckedChange:j=>{j&&g(i)},className:"text-md h-6 px-3",children:h(`apps.photo-booth.effects.${i.translationKey}`)},i.name))})]}),n.jsxs(ge,{children:[n.jsx(pe,{className:"px-2 py-1 text-md focus-visible:ring-0",children:h("common.menu.help")}),n.jsxs(ve,{align:"start",sideOffset:1,className:"px-0",children:[n.jsx(Z,{onClick:a,className:"text-md h-6 px-3",children:h("apps.photo-booth.menu.photoBoothHelp")}),n.jsx(Z,{onSelect:()=>F(!0),className:"text-md h-6 px-3",children:h("common.menu.shareApp")}),n.jsx(_e,{className:"h-[2px] bg-black my-1"}),n.jsx(Z,{onClick:m,className:"text-md h-6 px-3",children:h("apps.photo-booth.menu.aboutPhotoBooth")})]})]}),n.jsx(gt,{isOpen:D,onClose:()=>F(!1),itemType:"App",itemIdentifier:U,title:A,generateShareUrl:pt})]})}function Ke(u){const a={brightness:1,contrast:1,hue:0,saturate:1,grayscale:0,sepia:0,invert:0,bulge:0,pinch:0,twist:0,fisheye:0,stretch:0,squeeze:0,tunnel:0,kaleidoscope:0,ripple:0,glitch:0,center:[.5,.5]};if(u==="none")return a;const m={bulge:"bulge",pinch:"pinch",dent:"pinch",twist:"twist",twirl:"twist",fisheye:"fisheye",stretch:"stretch",squeeze:"squeeze",tunnel:"tunnel",kaleidoscope:"kaleidoscope",ripple:"ripple",glitch:"glitch"};for(const[x,e]of Object.entries(m)){const g=new RegExp(`${x}\\(([^)]+)\\)`,"i"),s=u.match(g);if(s){const l=s[1].split(",").map(parseFloat);isNaN(l[0])||(a[e]=l[0],l.length>=3&&!isNaN(l[1])&&!isNaN(l[2])&&(a.center=[l[1],l[2]]))}}const b=/([a-z-]+)\(([^)]+)\)/g;let E;for(;E=b.exec(u);){const x=E[1].trim();let e=parseFloat(E[2].trim());switch(E[2].trim().endsWith("%")&&(e/=100),x){case"brightness":a.brightness=e;break;case"contrast":a.contrast=e;break;case"hue-rotate":a.hue=e;break;case"saturate":a.saturate=e;break;case"grayscale":a.grayscale=e;break;case"sepia":a.sepia=e;break;case"invert":a.invert=e;break}}return a}async function $e(u,a,m){const b=u instanceof HTMLVideoElement?u.videoWidth:u.width,E=u instanceof HTMLVideoElement?u.videoHeight:u.height,x=document.createElement("canvas");x.width=b,x.height=E;const e=x.getContext("webgl");if(!e)throw new Error("WebGL unavailable");const g=e.createShader(e.VERTEX_SHADER);e.shaderSource(g,"attribute vec2 a;varying vec2 v;void main(){v=a*0.5+0.5;gl_Position=vec4(a,0,1);}"),e.compileShader(g);const s=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(s,m),e.compileShader(s);const l=e.createProgram();if(e.attachShader(l,g),e.attachShader(l,s),e.linkProgram(l),!e.getShaderParameter(g,e.COMPILE_STATUS))throw console.error("Vertex shader compilation error:",e.getShaderInfoLog(g)),e.deleteShader(g),e.deleteProgram(l),new Error("Vertex shader compilation failed.");if(!e.getShaderParameter(s,e.COMPILE_STATUS))throw console.error("Fragment shader compilation error:",e.getShaderInfoLog(s)),e.deleteShader(s),e.deleteProgram(l),new Error("Fragment shader compilation failed.");if(!e.getProgramParameter(l,e.LINK_STATUS))throw console.error("Shader program linking error:",e.getProgramInfoLog(l)),e.deleteProgram(l),new Error("Shader program linking failed.");e.useProgram(l);const _=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,_),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);const h=e.getAttribLocation(l,"a");e.enableVertexAttribArray(h),e.vertexAttribPointer(h,2,e.FLOAT,!1,0,0);const D=e.createTexture();e.bindTexture(e.TEXTURE_2D,D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,u),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1);const F={brightness:a.brightness??1,contrast:a.contrast??1,hue:a.hue??0,saturate:a.saturate??1,grayscale:a.grayscale?1:0,sepia:a.sepia?1:0,invert:a.invert?1:0},U={bulge:a.bulge??0,pinch:a.pinch??0,twist:a.twist??0,fisheye:a.fisheye??0,stretch:a.stretch??0,squeeze:a.squeeze??0,tunnel:a.tunnel??0,kaleidoscope:a.kaleidoscope??0,ripple:a.ripple??0,glitch:a.glitch??0};Object.entries(F).forEach(([R,k])=>{const T=e.getUniformLocation(l,`u_${R}`);T&&e.uniform1f(T,k)}),Object.entries(U).forEach(([R,k])=>{const T=e.getUniformLocation(l,`u_${R}`);T&&e.uniform1f(T,k)});const A=e.getUniformLocation(l,"u_center");if(A){const R=a.center??[.5,.5];e.uniform2f(A,R[0],R[1])}return e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.viewport(0,0,b,E),e.drawArrays(e.TRIANGLE_STRIP,0,4),x}const We=`// fragment shader for image filters and distortion effects
precision mediump float;
varying vec2 v;
uniform sampler2D u_image;

// Color filters
uniform float u_brightness;
uniform float u_contrast;
uniform float u_saturate;
uniform float u_hue;
uniform float u_grayscale;
uniform float u_sepia;
uniform float u_invert;

// Distortion effects
uniform float u_bulge;
uniform float u_pinch;
uniform float u_twist;
uniform float u_fisheye;
uniform float u_stretch;
uniform float u_squeeze;
uniform float u_tunnel;
// New effect uniforms
uniform float u_kaleidoscope;
uniform float u_ripple;
uniform float u_glitch;
uniform vec2 u_center; // Default center point for distortions (0.5, 0.5)

// from: https://gist.github.com/mjackson/5311256
vec3 rgb2hsl(vec3 c){
  float maxc=max(max(c.r,c.g),c.b),minc=min(min(c.r,c.g),c.b);
  float h=0., s=0., l=(maxc+minc)*0.5;
  if(maxc!=minc){
    float d=maxc-minc;
    s=l>0.5?d/(2.-maxc-minc):d/(maxc+minc);
    if(maxc==c.r)      h=(c.g-c.b)/d + (c.g<c.b?6.:0.);
    else if(maxc==c.g) h=(c.b-c.r)/d + 2.;
    else               h=(c.r-c.g)/d + 4.;
    h/=6.;
  }
  return vec3(h,s,l);
}

vec3 hsl2rgb(vec3 hsl){
  float h=hsl.x,s=hsl.y,l=hsl.z;
  float q=l<.5?l*(1.+s):l+s-l*s;
  float p=2.*l-q;
  float r=abs(mod(h*6.+6.,6.)-3.)-1.;
  float g=abs(mod(h*6.+4.,6.)-3.)-1.;
  float b=abs(mod(h*6.+2.,6.)-3.)-1.;
  r=clamp(r,0.,1.); g=clamp(g,0.,1.); b=clamp(b,0.,1.);
  r=r*r*(3.-2.*r); g=g*g*(3.-2.*g); b=b*b*(3.-2.*b);
  return mix(vec3(p),vec3(q),vec3(r,g,b));
}

// Distortion functions
vec2 bulge(vec2 uv, vec2 center, float strength) {
  // Move to center coordinate system
  vec2 delta = uv - center;
  float dist = length(delta);
  
  // Create a stronger, more localized bulge that fades towards the edges
  // factor is highest (1) at the center and 0 at radius 1
  float factor = 1.0 - dist;
  factor = clamp(factor, 0.0, 1.0);
  
  // Square the factor for smoother fall-off, then scale by strength
  float scale = 1.0 + strength * factor * factor;
  delta *= scale;
  
  // Return to original coordinate system
  return center + delta;
}

vec2 pinch(vec2 uv, vec2 center, float strength) {
  // Move to center coordinate system
  vec2 delta = uv - center;
  float dist = length(delta);
  
  // Apply pinch formula (opposite of bulge)
  float f = 1.0 - dist * strength;
  delta *= f;
  
  // Return to original coordinate system
  return center + delta;
}

vec2 twist(vec2 uv, vec2 center, float strength) {
  // Move to center coordinate system
  vec2 delta = uv - center;
  float dist = length(delta);
  
  // Apply twist formula - rotate based on distance
  float angle = strength * dist;
  float sinAngle = sin(angle);
  float cosAngle = cos(angle);
  
  // Rotation matrix
  delta = vec2(
    delta.x * cosAngle - delta.y * sinAngle,
    delta.x * sinAngle + delta.y * cosAngle
  );
  
  // Return to original coordinate system
  return center + delta;
}

vec2 fisheye(vec2 uv, vec2 center, float strength) {
  // Move to center coordinate system
  vec2 delta = uv - center;
  float dist = length(delta);
  
  // Apply fisheye formula
  float r = pow(dist, 0.5) * strength;
  float theta = atan(delta.y, delta.x);
  
  // Convert back to Cartesian
  delta = r * vec2(cos(theta), sin(theta));
  
  // Return to original coordinate system
  return center + delta;
}

vec2 stretch(vec2 uv, vec2 center, float strength) {
  // Horizontal stretch
  vec2 delta = uv - center;
  delta.x *= 1.0 + strength;
  return center + delta;
}

vec2 squeeze(vec2 uv, vec2 center, float strength) {
  // Vertical stretch/horizontal squeeze
  vec2 delta = uv - center;
  delta.y *= 1.0 + strength;
  delta.x /= 1.0 + strength * 0.5;
  return center + delta;
}

// Tunnel / spiral effect – angle increases with radius creating a vortex
vec2 tunnel(vec2 uv, vec2 center, float strength) {
  vec2 delta = uv - center;
  float r = length(delta);
  float angle = strength * r * 6.28318; // 2π * strength * r
  float sinA = sin(angle);
  float cosA = cos(angle);
  delta = vec2(
    delta.x * cosA - delta.y * sinA,
    delta.x * sinA + delta.y * cosA
  );
  return center + delta;
}

// Kaleidoscope effect - creates mirror reflections in a circular pattern
vec2 kaleidoscope(vec2 uv, vec2 center, float segments) {
  if (segments <= 0.0) return uv;
  
  // Convert to polar coordinates
  vec2 delta = uv - center;
  float radius = length(delta);
  float angle = atan(delta.y, delta.x);
  
  // Calculate the segment angle
  float segmentAngle = 3.14159 * 2.0 / segments;
  
  // Normalize the angle to a segment
  angle = mod(angle, segmentAngle);
  
  // Mirror within the segment
  if (mod(floor(angle / segmentAngle) + 1.0, 2.0) >= 1.0) {
    angle = segmentAngle - angle;
  }
  
  // Convert back to Cartesian coordinates
  return center + radius * vec2(cos(angle), sin(angle));
}

// Ripple effect - creates water-like rippling distortion
vec2 ripple(vec2 uv, vec2 center, float strength) {
  vec2 delta = uv - center;
  float dist = length(delta);
  
  // Create concentric ripples
  float phase = dist * 50.0;
  float offset = sin(phase) * strength * 0.01;
  
  // Apply offset along the direction from center
  return uv + normalize(delta) * offset;
}

// Glitch effect - creates digital distortion with RGB shift
vec2 glitch(vec2 uv, float strength) {
  if (strength <= 0.0) return uv;
  
  // Create some random values based on uv position
  float lineJitter = 0.0;
  
  // Only apply to certain lines for a scanline effect
  if (mod(floor(uv.y * 50.0), 5.0) == 0.0) {
    // Random horizontal shifts on specific lines
    lineJitter = (sin(uv.y * 2053.0) * 0.5 + 0.5) * strength * 0.05;
  }
  
  // Vertical block noise - larger chunks that shift left/right
  float blockJitter = 0.0;
  float blockThreshold = 0.9 - strength * 0.2;
  if (fract(sin(floor(uv.y * 10.0) * 4000.0)) > blockThreshold) {
    blockJitter = (fract(sin(floor(uv.y * 12.0) * 5432.0)) - 0.5) * strength * 0.1;
  }
  
  return uv + vec2(lineJitter + blockJitter, 0.0);
}

void main() {
  // Apply distortion effects to get sampling coordinates
  vec2 uv = v;
  
  // Start with default coordinates
  vec2 distortedUV = uv;
  
  // Apply distortion effects if any are active
  if (u_bulge != 0.0) {
    distortedUV = bulge(distortedUV, u_center, u_bulge);
  }
  
  if (u_pinch != 0.0) {
    distortedUV = pinch(distortedUV, u_center, u_pinch);
  }
  
  if (u_twist != 0.0) {
    distortedUV = twist(distortedUV, u_center, u_twist);
  }
  
  if (u_fisheye != 0.0) {
    distortedUV = fisheye(distortedUV, u_center, u_fisheye);
  }
  
  if (u_stretch != 0.0) {
    distortedUV = stretch(distortedUV, u_center, u_stretch);
  }
  
  if (u_squeeze != 0.0) {
    distortedUV = squeeze(distortedUV, u_center, u_squeeze);
  }
  
  if (u_tunnel != 0.0) {
    distortedUV = tunnel(distortedUV, u_center, u_tunnel);
  }
  
  // Apply new effects
  if (u_kaleidoscope != 0.0) {
    distortedUV = kaleidoscope(distortedUV, u_center, u_kaleidoscope * 16.0);
  }
  
  if (u_ripple != 0.0) {
    distortedUV = ripple(distortedUV, u_center, u_ripple);
  }
  
  if (u_glitch != 0.0) {
    distortedUV = glitch(distortedUV, u_glitch);
  }
  
  // Clamp to avoid sampling outside texture bounds
  distortedUV = clamp(distortedUV, 0.0, 1.0);
  
  // Sample texture with distorted coordinates
  vec4 col = texture2D(u_image, distortedUV);

  // Apply RGB shift for glitch effect
  if (u_glitch > 0.0) {
    float rgbShift = u_glitch * 0.01;
    col.r = texture2D(u_image, distortedUV + vec2(rgbShift, 0.0)).r;
    col.b = texture2D(u_image, distortedUV - vec2(rgbShift, 0.0)).b;
  }

  // Apply color filters
  
  // Brightness and Contrast
  col.rgb *= u_brightness;
  col.rgb = (col.rgb-.5)*u_contrast+.5;

  // Hue Rotate and Saturate
  vec3 hsl = rgb2hsl(col.rgb);
  hsl.x += u_hue / 360.0; // hue in [0, 1]
  hsl.y *= u_saturate;
  col.rgb = hsl2rgb(hsl);

  // Grayscale
  float g = dot(col.rgb, vec3(.2126, .7152, .0722));
  col.rgb = mix(col.rgb, vec3(g), u_grayscale);

  // Sepia (applied on top of grayscale if both are present)
  col.rgb = mix(col.rgb,
            vec3(dot(col.rgb, vec3(.393, .769, .189)),
                 dot(col.rgb, vec3(.349, .686, .168)),
                 dot(col.rgb, vec3(.272, .534, .131))),
            u_sepia);

  // Invert (applied last)
  col.rgb = mix(col.rgb, vec3(1.0) - col.rgb, u_invert);

  gl_FragColor = col;
} `;function Xe({onPhoto:u,className:a="",isPreview:m=!1,filter:b="none",sharedStream:E,selectedCameraId:x,stream:e,autoStart:g=!0}){const s=r.useRef(null),l=r.useRef(null),_=r.useRef(null),[h,D]=r.useState(null),[F,U]=r.useState(null),A=r.useRef(null),R=r.useRef(0),k=r.useRef(!1),T=r.useRef(null),i=r.useMemo(()=>/bulge|pinch|twist|fisheye|stretch|squeeze|tunnel|kaleidoscope|ripple|glitch/i.test(b),[b]),j=m?E??e??h:e??h;r.useEffect(()=>{const o=s.current;if(m)return o&&(E?(o.srcObject=E,o.play().catch(console.error)):o.srcObject=null),()=>{o&&o.srcObject===E&&(o.srcObject=null)};if(e)return k.current=!1,U(null),D(null),o&&(o.srcObject=e,o.play().catch(console.error)),()=>{o&&o.srcObject===e&&(o.srcObject=null)};if(!g){k.current=!1,oe();return}const w=!!x&&T.current!==x;return(!h||w)&&(k.current=!0,Q()),()=>{k.current&&oe()}},[m,E,e,x,h,g]),r.useEffect(()=>{if(!i){_.current!==null&&(cancelAnimationFrame(_.current),_.current=null);return}const o=l.current;if(!o||!s.current)return;A.current||(A.current=document.createElement("canvas"));const w=A.current,y=async N=>{if(!(!o||!s.current)){if(N-R.current<33){_.current=requestAnimationFrame(y);return}R.current=N;try{const P=s.current,H=.5,V=Math.max(1,Math.floor(P.videoWidth*H)),M=Math.max(1,Math.floor(P.videoHeight*H));(w.width!==V||w.height!==M)&&(w.width=V,w.height=M);const se=w.getContext("2d");if(!se)return;se.drawImage(P,0,0,w.width,w.height);const ye=Ke(b),I=await $e(w,ye,We),X=o.getContext("2d");X&&((o.width!==V||o.height!==M)&&(o.width=V,o.height=M),X.clearRect(0,0,o.width,o.height),X.drawImage(I,0,0))}catch(P){console.error("Preview WebGL render failed:",P)}_.current=requestAnimationFrame(y)}};return _.current=requestAnimationFrame(y),()=>{_.current!==null&&cancelAnimationFrame(_.current)}},[i,b]),r.useEffect(()=>{const o=async()=>{if(!s.current||!j)return;const w=s.current,y=document.createElement("canvas");y.width=w.videoWidth,y.height=w.videoHeight;const N=y.getContext("2d");if(!N)return;N.setTransform(1,0,0,1,0,0),N.scale(-1,1),N.drawImage(w,-y.width,0,y.width,y.height);let P=y;if(b!=="none")try{const M=Ke(b);P=await $e(y,M,We)}catch(M){console.error("WebGL filtering failed, falling back to no filter:",M),P=y}const H=P.toDataURL("image/jpeg",.85);u==null||u(H);const V=new CustomEvent("photo-taken",{detail:H});window.dispatchEvent(V)};if(!m)return window.addEventListener("webcam-capture",o),()=>window.removeEventListener("webcam-capture",o)},[j,u,m,b]);const Q=async()=>{try{k.current=!0,h&&h.getTracks().forEach(N=>N.stop());const o={audio:!1,video:{deviceId:x?{exact:x}:void 0,width:{ideal:640},height:{ideal:480}}},w=await navigator.mediaDevices.getUserMedia(o),y=w.getVideoTracks()[0];T.current=(y==null?void 0:y.getSettings().deviceId)??x??null,D(w),U(null),s.current&&(s.current.srcObject=w,s.current.play().catch(console.error))}catch(o){console.error("Camera error:",o),U(o instanceof Error?o.message:"Failed to access camera"),T.current=null,k.current=!1}},oe=()=>{h&&!m&&(h.getTracks().forEach(o=>o.stop()),D(null)),!e&&s.current&&(s.current.srcObject=null),e||(T.current=null,k.current=!1)};return n.jsx("div",{className:`relative ${a}`,children:F?n.jsx("div",{className:"w-full h-full flex items-center justify-center",onClick:Q,children:n.jsx(Rt,{size:48,className:"text-white/30 cursor-pointer"})}):n.jsxs(n.Fragment,{children:[n.jsx("video",{ref:s,autoPlay:!0,playsInline:!0,muted:!0,className:"w-full h-full object-cover",style:{filter:i?"none":b,transform:"scaleX(-1)"}}),i&&n.jsx("canvas",{ref:l,className:"absolute inset-0 w-full h-full object-cover",style:{transform:"scaleX(-1)"}})]})})}function Vt(u,a){const m=r.useRef(null),b=r.useRef(null),E=50;return{onTouchStart:s=>{m.current=s.targetTouches[0].clientX},onTouchMove:s=>{b.current=s.targetTouches[0].clientX},onTouchEnd:()=>{if(!m.current||!b.current)return;const s=m.current-b.current;Math.abs(s)>E&&(s>0?u():a()),m.current=null,b.current=null}}}function Qt({isWindowOpen:u,onClose:a,isForeground:m,skipInitialSound:b,instanceId:E,onNavigateNext:x,onNavigatePrevious:e}){const{t:g}=Ge(),s=bt("photo-booth",_t),[l,_]=r.useState(!1),[h,D]=r.useState(!1),[F,U]=r.useState(!1),[A,R]=r.useState(!1),[k,T]=r.useState(0),i=r.useRef(null),[j,Q]=r.useState(null),[oe,o]=r.useState(null),[w,y]=r.useState(!1),N=r.useMemo(()=>[{name:"Rainbow",filter:"hue-rotate(180deg) saturate(200%)",translationKey:"rainbow"},{name:"Vibrant",filter:"saturate(200%) contrast(150%)",translationKey:"vibrant"},{name:"Cold Blue",filter:"hue-rotate(240deg) saturate(150%)",translationKey:"coldBlue"},{name:"High Contrast",filter:"contrast(200%) brightness(110%)",translationKey:"highContrast"},{name:"Normal",filter:"none",translationKey:"normal"},{name:"Vintage",filter:"sepia(80%) brightness(90%) contrast(120%)",translationKey:"vintage"},{name:"X-Ray",filter:"invert(100%) hue-rotate(180deg) hue-rotate(180deg)",translationKey:"xRay"},{name:"Neon",filter:"brightness(120%) contrast(120%) saturate(200%) hue-rotate(310deg)",translationKey:"neon"},{name:"Black & White",filter:"brightness(90%) hue-rotate(20deg) saturate(0%)",translationKey:"blackAndWhite"}],[]),P=r.useMemo(()=>[{name:"Bulge",filter:"bulge(-0.5)",translationKey:"bulge"},{name:"Stretch",filter:"stretch(1.0)",translationKey:"stretch"},{name:"Pinch",filter:"pinch(2.0)",translationKey:"pinch"},{name:"Twirl",filter:"twist(-8.0)",translationKey:"twirl"},{name:"Fish Eye",filter:"fisheye(1.5)",translationKey:"fishEye"},{name:"Squeeze",filter:"squeeze(1.0)",translationKey:"squeeze"},{name:"Kaleidoscope",filter:"kaleidoscope(0.5)",translationKey:"kaleidoscope"},{name:"Ripple",filter:"ripple(1.5)",translationKey:"ripple"},{name:"Glitch",filter:"glitch(2.0)",translationKey:"glitch"}],[]),H=r.useMemo(()=>[...N,...P],[N,P]),[V,M]=r.useState(H.find(t=>t.translationKey==="normal")||H[0]),[se,ye]=r.useState([]),[I,X]=r.useState(null),{photos:Ae,addPhoto:Ye,addPhotos:Ze,clearPhotos:Qe}=yt(),[L,Re]=r.useState(!1),[Ne,Pe]=r.useState(0),ee=r.useRef(null),[ie,xe]=r.useState([]),[et,Ie]=r.useState(!1),[G,Ue]=r.useState(null),[tt,ce]=r.useState(!1),{play:nt}=xt(wt.PHOTO_SHUTTER,.4),[rt,Me]=r.useState(null),{saveFile:Le,files:De}=Et("/Images"),le=r.useRef(null),J=r.useRef(null),B=r.useRef(!0),we=r.useRef(u),Ee=r.useRef(m),te=r.useRef(null),Ve=Je(t=>t.current),S=Ve==="xp"||Ve==="win98",at=()=>{Qe(),xe([])},ot=()=>{console.log("Export photos")},[Se,st]=r.useState(!0);r.useEffect(()=>{if(A&&Se){const t=setTimeout(()=>{st(!1)},300);return()=>clearTimeout(t)}},[A,Se]),r.useEffect(()=>{we.current=u},[u]),r.useEffect(()=>{Ee.current=m},[m]);const Y=r.useCallback(t=>{const f=(t==null?void 0:t.skipState)??!1;J.current=null;const d=le.current;d&&d.getTracks().forEach(p=>p.stop()),le.current=null,te.current=null,ee.current&&(clearInterval(ee.current),ee.current=null),!f&&B.current&&(Q(null),y(!1))},[]),ue=r.useCallback(async()=>{if(!B.current||!(we.current&&Ee.current))return;const f=le.current,d=f&&f.active&&f.getTracks().some(c=>c.readyState==="live"),p=!I||te.current===I;if(d&&p)return;f&&Y();const v=Symbol("camera-request");J.current=v,B.current&&(o(null),y(!0));try{if(console.log("Environment:",{protocol:window.location.protocol,isSecure:window.isSecureContext,hostname:window.location.hostname,userAgent:navigator.userAgent}),!window.isSecureContext)throw new DOMException("Camera requires a secure context (HTTPS)","SecurityError");if(!navigator.mediaDevices)throw console.error("mediaDevices API not available"),new Error(g("apps.photo-booth.errors.cameraApiNotAvailable"));const c={video:{deviceId:I?{exact:I}:void 0,width:{ideal:640},height:{ideal:480}},audio:!1};console.log("Requesting camera access with constraints:",c);const C=await navigator.mediaDevices.getUserMedia(c);console.log("Camera access granted:",C.active,"Video tracks:",C.getVideoTracks().length);const O=C.getVideoTracks()[0];if(O){console.log("Video track:",O.label);try{const z=O.getSettings();console.log("Track settings:",z),te.current=z.deviceId??I??null}catch(z){console.warn("Couldn't read track settings:",z),te.current=I}}else te.current=I;if(!(J.current===v&&we.current&&Ee.current&&B.current)){C.getTracks().forEach(z=>z.stop());return}le.current=C,B.current&&Q(C)}catch(c){if(J.current!==v)return;console.error("Camera error:",c);let C=g("apps.photo-booth.errors.couldNotAccessCamera");c instanceof DOMException?(console.log("DOMException type:",c.name),c.name==="NotAllowedError"?C=g("apps.photo-booth.errors.cameraPermissionDenied"):c.name==="NotFoundError"?C=g("apps.photo-booth.errors.noCameraFound"):c.name==="SecurityError"?C=g("apps.photo-booth.errors.cameraRequiresHttps"):C=g("apps.photo-booth.errors.cameraError",{error:c.name})):c instanceof Error&&c.message&&(C=c.message),B.current&&o(C)}finally{J.current===v&&(J.current=null,B.current&&y(!1))}},[I,Y]);r.useEffect(()=>{u&&m?ue():Y()},[u,m,ue,Y]),r.useEffect(()=>(B.current=!0,()=>{B.current=!1,Y({skipState:!0})}),[Y]);const it=r.useCallback(async t=>{console.log("Switching to camera:",t),X(t),await ue()},[ue]),Oe=n.jsx(Dt,{onClose:a,onShowHelp:()=>_(!0),onShowAbout:()=>D(!0),onClearPhotos:at,onExportPhotos:ot,effects:H,selectedEffect:V,onEffectSelect:M,availableCameras:se,selectedCameraId:I,onCameraSelect:it}),ze=/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,ke=/Chrome/.test(navigator.userAgent)&&!/Edge/.test(navigator.userAgent);r.useEffect(()=>{console.log("Device info:",{userAgent:navigator.userAgent,isIOS:ze,isChrome:ke,isSecureContext:window.isSecureContext})},[]),r.useEffect(()=>{if(!ke||!i.current||!j)return;console.log("Applying Chrome-specific visibility fixes");const t=()=>{i.current&&(i.current.style.visibility="hidden",i.current.style.display="none",setTimeout(()=>{i.current&&(i.current.style.visibility="visible",i.current.style.display="block",i.current.style.opacity="0.99",setTimeout(()=>{i.current&&(i.current.style.opacity="1")},50))},50))};setTimeout(t,300),setTimeout(t,1e3)},[j,ke]),r.useEffect(()=>{const t=i.current;if(!t||!j)return;let f=!1;const d=()=>{console.log("Video can play now"),ze&&(t.style.display="none",t.offsetHeight,t.style.display="block"),t.play().then(()=>{f=!0,console.log("Video playing successfully")}).catch(v=>{console.error("Play error:",v),f=!1})},p=setTimeout(()=>{!f&&t&&j.active&&(console.log("Attempting recovery of video playback"),t.play().catch(v=>console.error("Recovery attempt failed:",v)))},2e3);return t.addEventListener("canplay",d),()=>{t.removeEventListener("canplay",d),clearTimeout(p)}},[j]),r.useEffect(()=>{if(!j||!i.current)return;console.log("Stream connected, verifying video display");const t=i.current,f=()=>{if(!t)return;console.log("Video element status:",{videoWidth:t.videoWidth,videoHeight:t.videoHeight,paused:t.paused,readyState:t.readyState,networkState:t.networkState});const p=t.srcObject;t.srcObject=null,t.offsetHeight,setTimeout(()=>{t&&p&&(t.srcObject=p,t.play().then(()=>console.log("Video forced to play successfully")).catch(v=>console.error("Force play failed:",v)))},50)};f(),setTimeout(f,1e3);const d=()=>{console.log("Video metadata loaded, dimensions:",{videoWidth:t.videoWidth,videoHeight:t.videoHeight}),(t.videoWidth===0||t.videoHeight===0)&&(console.log("Metadata loaded but dimensions still zero, applying fix..."),t.style.width===""&&t.style.height===""&&(t.style.width="100%",t.style.height="100%"),t.offsetHeight,t.play().catch(p=>console.error("Play after metadata error:",p)))};return t.addEventListener("loadedmetadata",d),()=>{t.removeEventListener("loadedmetadata",d)}},[j]),r.useEffect(()=>{(async()=>{try{const d=(await navigator.mediaDevices.enumerateDevices()).filter(p=>p.kind==="videoinput");ye(d),!I&&d.length>0&&X(d[0].deviceId)}catch(f){console.error("Error getting cameras:",f)}})()},[]);const ct=t=>{Ie(!0),setTimeout(()=>Ie(!1),800),nt();const f=t.split(",")[1],d=t.split(",")[0].split(":")[1].split(";")[0],p=atob(f),v=[];for(let re=0;re<p.length;re+=512){const fe=p.slice(re,re+512),W=new Array(fe.length);for(let q=0;q<fe.length;q++)W[q]=fe.charCodeAt(q);const je=new Uint8Array(W);v.push(je)}const c=new Blob(v,{type:d}),C=URL.createObjectURL(c),O=Date.now(),$=`photo_${new Date(O).toISOString().replace(/[-:.]/g,"").substring(0,15)}${d==="image/jpeg"?".jpg":".png"}`,Te={name:$,content:c,contentUrl:C,type:d,path:`/Images/${$}`,isDirectory:!1,size:c.size,modifiedAt:new Date};Le(Te);const he={filename:$,path:`/Images/${$}`,timestamp:O};Ye(he),Ue(t),Me(Ae.length),ce(!0),setTimeout(()=>{ce(!1),setTimeout(()=>Me(null),500)},2e3)},lt=()=>{Re(!0),Pe(0),xe([]);const t=setInterval(()=>{Pe(d=>{const p=d+1;if(p<=4){const v=new CustomEvent("webcam-capture");window.dispatchEvent(v)}if(p===4){clearInterval(t),ee.current=null,Re(!1);const v=ie.map(c=>{const C=c.split(",")[1],O=c.split(",")[0].split(":")[1].split(";")[0],de=atob(C),z=[];for(let q=0;q<de.length;q+=512){const Ce=de.slice(q,q+512),He=new Array(Ce.length);for(let me=0;me<Ce.length;me++)He[me]=Ce.charCodeAt(me);const ft=new Uint8Array(He);z.push(ft)}const $=new Blob(z,{type:O}),Te=URL.createObjectURL($),he=Date.now(),W=`photo_${new Date(he).toISOString().replace(/[-:.]/g,"").substring(0,15)}${O==="image/jpeg"?".jpg":".png"}`,je={name:W,content:$,contentUrl:Te,type:O,path:`/Images/${W}`,isDirectory:!1,size:$.size,modifiedAt:new Date};return Le(je),{filename:W,path:`/Images/${W}`,timestamp:he}});Ze(v),ie.length>0&&(Ue(ie[ie.length-1]),ce(!0),setTimeout(()=>ce(!1),3e3))}return p})},1e3);ee.current=t;const f=new CustomEvent("webcam-capture");window.dispatchEvent(f)},ut=()=>{U(!F)},dt=()=>{R(!A)},Fe=t=>{T(t)},ht=Vt(()=>{T(1)},()=>{T(0)});r.useEffect(()=>()=>{G&&G.startsWith("blob:")&&URL.revokeObjectURL(G)},[G]),r.useEffect(()=>{const t=f=>{if(!L)return;const d=f.detail;if(!d||typeof d!="string"){console.error("Invalid photo data in photo-taken event");return}xe(p=>[...p,d])};return window.addEventListener("photo-taken",t),()=>{window.removeEventListener("photo-taken",t)}},[L]);const ne=Ae.filter(t=>De.some(f=>f.name===t.filename));return u?n.jsxs(n.Fragment,{children:[!S&&m&&Oe,n.jsx(St,{title:kt("photo-booth"),onClose:a,isForeground:m,appId:"photo-booth",skipInitialSound:b,instanceId:E,onNavigateNext:x,onNavigatePrevious:e,menuBar:S?Oe:void 0,children:n.jsxs("div",{className:"flex flex-col w-full h-full bg-neutral-500 max-h-full overflow-hidden",children:[n.jsx("div",{className:`flex-1 min-h-0 relative ${!j||w||oe?"pointer-events-none opacity-50":""}`,children:n.jsxs("div",{className:"absolute inset-0 flex items-center justify-center",children:[n.jsx(Xe,{onPhoto:t=>{t&&ct(t)},className:"w-full h-full",filter:V.filter,selectedCameraId:I,stream:j,autoStart:!1}),n.jsx(ae,{children:et&&n.jsx(K.div,{className:"absolute inset-0 bg-white",initial:{opacity:.9},animate:{opacity:0},exit:{opacity:0},transition:{duration:.6}})}),n.jsx(ae,{children:L&&n.jsx(K.div,{className:"absolute inset-0 flex items-center justify-center",initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},transition:{duration:.15},children:n.jsx("div",{className:"text-8xl font-bold text-white drop-shadow-lg",children:Ne<4?4-Ne:""})})}),n.jsx(ae,{children:F&&n.jsxs(K.div,{className:"absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},...ht,children:[n.jsx(K.div,{className:"grid grid-cols-3 gap-4 p-4 w-full max-w-4xl max-h-[calc(100%-40px)] overflow-auto",initial:{scale:.85,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.85,opacity:0},transition:{duration:.2,ease:"easeOut"},style:{originX:.5,originY:.5},children:(k===0?N:P).map(t=>n.jsxs(K.div,{className:`relative aspect-video overflow-hidden rounded-lg cursor-pointer border-2 ${V.name===t.name?"border-white":"border-transparent"}`,whileHover:{scale:1.05,transition:{duration:.15}},whileTap:{scale:.95,transition:{duration:.1}},onClick:()=>{M(t),U(!1)},children:[n.jsx(Xe,{isPreview:!0,filter:t.filter,className:"w-full h-full",sharedStream:j,autoStart:!1}),n.jsx("div",{className:"absolute bottom-0 left-0 right-0 text-center py-1.5 text-white font-geneva-12 text-[12px]",style:{textShadow:"0px 0px 2px black, 0px 0px 2px black, 0px 0px 2px black"},children:g(`apps.photo-booth.effects.${t.translationKey}`)})]},t.name))}),n.jsxs("div",{className:"flex items-center justify-center mt-2 space-x-2",children:[n.jsx("button",{className:"text-white rounded-full p-0.5 hover:bg-white/10",onClick:()=>Fe(0),children:n.jsx("div",{className:`w-2 h-2 rounded-full ${k===0?"bg-white":"bg-white/40"}`})}),n.jsx("button",{className:"text-white rounded-full p-0.5 hover:bg-white/10",onClick:()=>Fe(1),children:n.jsx("div",{className:`w-2 h-2 rounded-full ${k===1?"bg-white":"bg-white/40"}`})})]})]})}),n.jsx(ae,{mode:"wait",children:A&&ne.length>0&&!Se&&n.jsx(K.div,{className:"absolute bottom-0 inset-x-0 w-full bg-white/40 backdrop-blur-sm p-1 overflow-x-auto",initial:{y:50,opacity:0},animate:{y:0,opacity:1},exit:{y:50,opacity:0},transition:{type:"tween",ease:"easeOut",duration:.2},children:n.jsx("div",{className:"flex flex-row space-x-1 h-20 w-max",children:[...ne].reverse().map((t,f)=>{const d=ne.length-1-f,p=d===rt,v=De.find(c=>c.name===t.filename);return!v||!v.contentUrl?null:n.jsx(K.div,{className:"h-full flex-shrink-0",initial:p?{scale:.5,opacity:0}:{opacity:1,scale:1},animate:{scale:1,opacity:1},layout:!0,transition:{type:"spring",damping:25,stiffness:400,duration:p?.4:0},children:n.jsx("img",{src:v.contentUrl,alt:g("apps.photo-booth.ariaLabels.photo",{index:d}),className:"h-full w-auto object-contain cursor-pointer transition-opacity hover:opacity-80",onClick:()=>{const c=document.createElement("a");c.href=v.contentUrl||"",c.download=v.name,document.body.appendChild(c),c.click(),document.body.removeChild(c)}})},`photo-${t.filename}`)})})})})]})}),n.jsxs("div",{className:"flex-shrink-0 w-full bg-black/70 backdrop-blur-md px-6 py-4 flex justify-between items-center z-[60]",children:[n.jsxs("div",{className:"flex space-x-3 relative",children:[n.jsx(ae,{children:tt&&G&&!A&&n.jsx(K.div,{className:"absolute -top-24 left-0 pointer-events-none z-[100]",initial:{opacity:0,y:10,scale:.3},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:60,scale:.2,x:-16},transition:{type:"spring",stiffness:300,damping:15},style:{originX:"0",originY:"1"},children:n.jsx(K.img,{src:G,alt:"Last photo thumbnail",className:"h-20 w-auto object-cover rounded-md shadow-md border-2 border-white",initial:{rotateZ:0},animate:{rotateZ:0},exit:{rotateZ:5},transition:{type:"spring",stiffness:200,damping:10}})})}),n.jsx("button",{className:`h-10 w-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white relative overflow-hidden ${ne.length===0?"opacity-50 cursor-not-allowed":""}`,style:{background:S?"rgba(255, 255, 255, 0.1)":void 0,border:S?"none":void 0},onMouseEnter:t=>{S&&(t.currentTarget.style.background="rgba(255, 255, 255, 0.2)")},onMouseLeave:t=>{S&&(t.currentTarget.style.background="rgba(255, 255, 255, 0.1)")},onClick:dt,disabled:ne.length===0,children:n.jsx(Ut,{size:18})}),n.jsx("button",{className:"h-10 w-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white",style:{background:S?"rgba(255, 255, 255, 0.1)":void 0,border:S?"none":void 0},onMouseEnter:t=>{S&&(t.currentTarget.style.background="rgba(255, 255, 255, 0.2)")},onMouseLeave:t=>{S&&(t.currentTarget.style.background="rgba(255, 255, 255, 0.1)")},onClick:lt,disabled:L,children:n.jsx(Lt,{size:18})})]}),n.jsx(qe,{onClick:L?()=>{}:()=>{const t=new CustomEvent("webcam-capture");window.dispatchEvent(t)},className:`rounded-full h-14 w-14 [&_svg]:size-5 ${L?"bg-gray-500 cursor-not-allowed":"bg-red-500 hover:bg-red-600"}`,style:{background:S?L?"#6b7280":"#dc2626":void 0,border:S?"none":void 0,cursor:L?"not-allowed":"pointer"},onMouseEnter:t=>{S&&!L&&(t.currentTarget.style.background="#b91c1c")},onMouseLeave:t=>{S&&!L&&(t.currentTarget.style.background="#dc2626")},disabled:L,children:n.jsx(Pt,{stroke:"white"})}),n.jsx(qe,{onClick:ut,className:"h-10 px-5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[16px]",style:{background:S?"rgba(255, 255, 255, 0.1)":void 0,border:S?"none":void 0},onMouseEnter:t=>{S&&(t.currentTarget.style.background="rgba(255, 255, 255, 0.2)")},onMouseLeave:t=>{S&&(t.currentTarget.style.background="rgba(255, 255, 255, 0.1)")},children:g("apps.photo-booth.buttons.effects")})]}),n.jsx(Tt,{isOpen:l,onOpenChange:_,helpItems:s,appId:"photo-booth"}),n.jsx(jt,{isOpen:h,onOpenChange:D,metadata:Ct,appId:"photo-booth"})]})})]}):null}export{Qt as PhotoBoothComponent};
