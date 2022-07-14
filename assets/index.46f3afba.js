const d=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}};d();const l={componentPrefix:"mwmbl",publicApiURL:"https://api.mwmbl.org/",searchQueryParam:"q",footerLinks:[{name:"Github",icon:"ph-github-logo-bold",href:"https://github.com/mwmbl/mwmbl"},{name:"Wiki",icon:"ph-info-bold",href:"https://github.com/mwmbl/mwmbl/wiki"}]},c=(t,e,s)=>{const r=`${l.componentPrefix}-${t}`;return customElements.get(r)||customElements.define(r,e,s),r};class m{constructor(){this.element=document.createElement("div")}on(e,s){this.element.addEventListener(e,s)}dispatch(e){this.element.dispatchEvent(e)}}const i=new m,f=(t,e=100)=>{let s;return(...r)=>{clearTimeout(s),s=setTimeout(()=>{t.apply(globalThis,r)},e)}},v=window.matchMedia("(prefers-reduced-motion)").matches,b=()=>`
  <form class="search-bar">
    <i class="ph-magnifying-glass-bold"></i>
    <input 
      type='search' 
      class='search-bar-input' 
      placeholder='Search on mwmbl...' 
      title='Use "CTRL+K" or "/" to focus.'
      autocomplete='off'
    >
  </form>
`;c("search-bar",class extends HTMLElement{constructor(){super(),this.searchInput=null,this.searchForm=null,this.abortController=new AbortController,this.__setup()}__setup(){this.innerHTML=b(),this.searchInput=this.querySelector("input"),this.searchForm=this.querySelector("form"),this.__events()}__events(){const t=async()=>{document.title=`MWMBL - ${this.searchInput.value||"Search"}`;const e=new URLSearchParams(document.location.search);this.searchInput.value?e.set(l.searchQueryParam,this.searchInput.value):e.delete(l.searchQueryParam);const s=document.location.protocol+"//"+document.location.host+document.location.pathname+(this.searchInput.value?"?":"")+e.toString();if(window.history.replaceState({path:s},"",s),this.searchInput.value){document.body.style.paddingTop="25px",document.querySelector(".search-menu").classList.add("compact");try{this.abortController.abort(),this.abortController=new AbortController;const n=await(await fetch(`${l.publicApiURL}search?s=${encodeURIComponent(this.searchInput.value)}`,{signal:this.abortController.signal})).json(),o=new CustomEvent("search",{detail:{results:this.searchInput.value?n:null,error:null}});i.dispatch(o)}catch(r){const n=new CustomEvent("search",{detail:{results:null,error:r}});i.dispatch(n)}}else{document.body.style.paddingTop="30vh",document.querySelector(".search-menu").classList.remove("compact");const r=new CustomEvent("search",{detail:{results:null,error:null}});i.dispatch(r)}};this.searchForm.addEventListener("submit",e=>{e.preventDefault(),t()}),v||this.searchInput.addEventListener("input",f(t,500)),document.addEventListener("keydown",e=>{(e.key==="k"&&e.ctrlKey||e.key==="/"||e.key==="Escape")&&(e.preventDefault(),this.searchInput.focus())}),this.addEventListener("keydown",e=>{if(e.key==="ArrowDown"&&this.searchInput.value){e.preventDefault();const s=new CustomEvent("focus-result");i.dispatch(s)}}),i.on("focus-search",e=>{this.searchInput.focus()})}connectedCallback(){this.searchInput.focus();const t=new URLSearchParams(document.location.search).get(l.searchQueryParam);this.searchInput.value=t,this.searchForm.dispatchEvent(new Event("submit",{cancelable:!0}))}});const a=t=>String(t).replace(/[^\w. ]/gi,e=>`&#${e.charCodeAt(0)};`),y=({data:t})=>`
  <a href='${t.url}'>
    <p class='link'>${t.url}</p>
    <p class='title'>${t.title}</p>
    <p class='extract'>${t.extract}</p>
  </a>
`,_=c("result",class extends HTMLLIElement{constructor(){super(),this.classList.add("result"),this.__setup()}__setup(){this.innerHTML=y({data:{url:this.dataset.url,title:this.__handleBold(JSON.parse(this.dataset.title)),extract:this.__handleBold(JSON.parse(this.dataset.extract))}}),this.__events()}__events(){this.addEventListener("keydown",t=>{var e,s;if(this.firstElementChild===document.activeElement&&(t.key==="ArrowDown"&&(t.preventDefault(),(e=this==null?void 0:this.nextElementSibling)==null||e.firstElementChild.focus()),t.key==="ArrowUp"))if(t.preventDefault(),this.previousElementSibling)(s=this.previousElementSibling)==null||s.firstElementChild.focus();else{const r=new CustomEvent("focus-search");i.dispatch(r)}})}__handleBold(t){let e="";for(const s of t)s.is_bold?e+=`<strong>${a(s.value)}</strong>`:e+=a(s.value);return e}},{extends:"li"}),g=()=>`
  <p>We could not find anything for your search...</p>
`,h=c("empty-result",class extends HTMLLIElement{constructor(){super(),this.classList.add("empty-result"),this.__setup()}__setup(){this.innerHTML=g()}},{extends:"li"}),L=()=>`
  <h1>
    Welcome to mwmbl, the free, open-source and non-profit search engine.
  </h1>
  <p>
    You can start searching by using the search bar above!
  </p>
`,p=c("home",class extends HTMLLIElement{constructor(){super(),this.classList.add("home"),this.__setup()}__setup(){this.innerHTML=L()}},{extends:"li"}),E=()=>`
  <ul class='results'>
    <li is='${p}'></li>
  </ul>
`;c("results",class extends HTMLElement{constructor(){super(),this.results=null,this.__setup()}__setup(){this.innerHTML=E(),this.results=this.querySelector(".results"),this.__events()}__events(){i.on("search",t=>{this.results.innerHTML="";let e="";if(t.detail.error)e=`
          <li is='${h}'></li>
        `;else if(!t.detail.results)e=`
            <li is='${p}'></li>
          `;else if(t.detail.results.length>0)for(const s of t.detail.results)e+=`
              <li
                is='${_}' 
                data-url='${a(s.url)}'
                data-title='${a(JSON.stringify(s.title))}'
                data-extract='${a(JSON.stringify(s.extract))}'
              ></li>
            `;else e=`
            <li is='${h}'></li>
          `;this.results.innerHTML=e}),i.on("focus-result",()=>{this.results.firstElementChild.firstElementChild.focus()})}});const w=({data:t})=>`
  <p class="footer-text">Find more on</p>
  <ul class="footer-list">
    ${t.links.map(e=>`
      <li class="footer-item">
        <a href="${e.href}" class="footer-link" target="__blank">
          <i class="${e.icon}"></i>
          <span>${e.name}</span>
        </a>
      </li>
    `).join("")}
  </ul>
`;c("footer",class extends HTMLElement{constructor(){super(),this.__setup()}__setup(){this.innerHTML=w({data:{links:l.footerLinks}}),this.__events()}__events(){}},{extends:"footer"});
