var m=Object.defineProperty;var f=(t,e,s)=>e in t?m(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var h=(t,e,s)=>(f(t,typeof e!="symbol"?e+"":e,s),s);const _=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}};_();const i={componentPrefix:"mwmbl",publicApiURL:"https://api.mwmbl.org/",searchQueryParam:"q",footerLinks:[{name:"Github",icon:"ph-github-logo-bold",href:"https://github.com/mwmbl/mwmbl"},{name:"Wiki",icon:"ph-info-bold",href:"https://github.com/mwmbl/mwmbl/wiki"}]},a=(t,e,s)=>{const r=`${i.componentPrefix}-${t}`;return customElements.get(r)||customElements.define(r,e,s),r};class y{constructor(){this.element=document.createElement("div")}on(e,s){this.element.addEventListener(e,s)}dispatch(e){this.element.dispatchEvent(e)}}const l=new y,b=(t,e=100)=>{let s;return(...r)=>{clearTimeout(s),s=setTimeout(()=>{t.apply(globalThis,r)},e)}},v=window.matchMedia("(prefers-reduced-motion)").matches,g=()=>`
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
`;a("search-bar",class extends HTMLElement{constructor(){super();h(this,"__handleSearch",async()=>{document.title=`MWMBL - ${this.searchInput.value||"Search"}`;const e=new URLSearchParams(document.location.search);this.searchInput.value?e.set(i.searchQueryParam,this.searchInput.value):e.delete(i.searchQueryParam);const s=document.location.protocol+"//"+document.location.host+document.location.pathname+(this.searchInput.value?"?":"")+e.toString();if(window.history.replaceState({path:s},"",s),this.searchInput.value){this.__setDisplayMode("compact");try{const r=await this.__executeSearch();this.__dispatchSearch({results:this.searchInput.value?r:null})}catch(r){this.__dispatchSearch({error:r})}}else this.__setDisplayMode("home"),this.__dispatchSearch({results:null})});this.searchInput=null,this.searchForm=null,this.abortController=new AbortController,this.__setup()}__setup(){this.innerHTML=g(),this.searchInput=this.querySelector("input"),this.searchForm=this.querySelector("form"),this.__events()}__dispatchSearch({results:e=null,error:s=null}){const r=new CustomEvent("search",{detail:{results:e,error:s}});l.dispatch(r)}__setDisplayMode(e){switch(e){case"compact":{document.body.style.paddingTop="25px",document.querySelector(".search-menu").classList.add("compact");break}case"home":{document.body.style.paddingTop="30vh",document.querySelector(".search-menu").classList.remove("compact");break}}}async __executeSearch(){return this.abortController.abort(),this.abortController=new AbortController,await(await fetch(`${i.publicApiURL}search?s=${encodeURIComponent(this.searchInput.value)}`,{signal:this.abortController.signal})).json()}__events(){this.searchForm.addEventListener("submit",e=>{e.preventDefault(),this.__handleSearch(e)}),v||this.searchInput.addEventListener("input",b(this.__handleSearch,500)),document.addEventListener("keydown",e=>{(e.key==="k"&&e.ctrlKey||e.key==="/"||e.key==="Escape")&&(e.preventDefault(),this.searchInput.focus())}),this.addEventListener("keydown",e=>{if(e.key==="ArrowDown"&&this.searchInput.value){e.preventDefault();const s=new CustomEvent("focus-result");l.dispatch(s)}}),l.on("focus-search",e=>{this.searchInput.focus()})}connectedCallback(){this.searchInput.focus();const e=new URLSearchParams(document.location.search).get(i.searchQueryParam);this.searchInput.value=e,this.__handleSearch()}});const c=t=>String(t).replace(/[^\w. ]/gi,e=>`&#${e.charCodeAt(0)};`),L=({data:t})=>`
  <a href='${t.url}'>
    <p class='link'>${t.url}</p>
    <p class='title'>${t.title}</p>
    <p class='extract'>${t.extract}</p>
  </a>
`,w=a("result",class extends HTMLLIElement{constructor(){super(),this.classList.add("result"),this.__setup()}__setup(){this.innerHTML=L({data:{url:this.dataset.url,title:this.__handleBold(JSON.parse(this.dataset.title)),extract:this.__handleBold(JSON.parse(this.dataset.extract))}}),this.__events()}__events(){this.addEventListener("keydown",t=>{var e,s;if(this.firstElementChild===document.activeElement&&(t.key==="ArrowDown"&&(t.preventDefault(),(e=this==null?void 0:this.nextElementSibling)==null||e.firstElementChild.focus()),t.key==="ArrowUp"))if(t.preventDefault(),this.previousElementSibling)(s=this.previousElementSibling)==null||s.firstElementChild.focus();else{const r=new CustomEvent("focus-search");l.dispatch(r)}})}__handleBold(t){let e="";for(const s of t)s.is_bold?e+=`<strong>${c(s.value)}</strong>`:e+=c(s.value);return e}},{extends:"li"}),E=()=>`
  <p>We could not find anything for your search...</p>
`,p=a("empty-result",class extends HTMLLIElement{constructor(){super(),this.classList.add("empty-result"),this.__setup()}__setup(){this.innerHTML=E()}},{extends:"li"}),S=()=>`
  <h1>
    Welcome to mwmbl, the free, open-source and non-profit search engine.
  </h1>
  <p>
    You can start searching by using the search bar above!
  </p>
`,d=a("home",class extends HTMLLIElement{constructor(){super(),this.classList.add("home"),this.__setup()}__setup(){this.innerHTML=S()}},{extends:"li"}),$=()=>`
  <ul class='results'>
    <li is='${d}'></li>
  </ul>
`;a("results",class extends HTMLElement{constructor(){super(),this.results=null,this.__setup()}__setup(){this.innerHTML=$(),this.results=this.querySelector(".results"),this.__events()}__events(){l.on("search",t=>{this.results.innerHTML="";let e="";if(t.detail.error)e=`
          <li is='${p}'></li>
        `;else if(!t.detail.results)e=`
            <li is='${d}'></li>
          `;else if(t.detail.results.length>0)for(const s of t.detail.results)e+=`
              <li
                is='${w}' 
                data-url='${c(s.url)}'
                data-title='${c(JSON.stringify(s.title))}'
                data-extract='${c(JSON.stringify(s.extract))}'
              ></li>
            `;else e=`
            <li is='${p}'></li>
          `;this.results.innerHTML=e}),l.on("focus-result",()=>{this.results.firstElementChild.firstElementChild.focus()})}});const x=({data:t})=>`
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
`;a("footer",class extends HTMLElement{constructor(){super(),this.__setup()}__setup(){this.innerHTML=x({data:{links:i.footerLinks}}),this.__events()}__events(){}},{extends:"footer"});
