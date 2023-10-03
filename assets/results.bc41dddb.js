import{d as i}from"./define.b7078a0a.js";import{g as r}from"./events.7f8add71.js";import"./config.d02c906f.js";const l=t=>String(t).replace(/[^\w. ]/gi,e=>`&#${e.charCodeAt(0)};`),o=({data:t})=>`
  <a href='${t.url}'>
    <p class='link'>${t.url}</p>
    <p class='title'>${t.title}</p>
    <p class='extract'>${t.extract}</p>
  </a>
`,c=i("result",class extends HTMLLIElement{constructor(){super(),this.classList.add("result"),this.__setup()}__setup(){this.innerHTML=o({data:{url:this.dataset.url,title:this.__handleBold(JSON.parse(this.dataset.title)),extract:this.__handleBold(JSON.parse(this.dataset.extract))}}),this.__events()}__events(){this.addEventListener("keydown",t=>{var e,s;if(this.firstElementChild===document.activeElement&&(t.key==="ArrowDown"&&(t.preventDefault(),(e=this==null?void 0:this.nextElementSibling)==null||e.firstElementChild.focus()),t.key==="ArrowUp"))if(t.preventDefault(),this.previousElementSibling)(s=this.previousElementSibling)==null||s.firstElementChild.focus();else{const a=new CustomEvent("focus-search");r.dispatch(a)}})}__handleBold(t){let e="";for(const s of t)s.is_bold?e+=`<strong>${l(s.value)}</strong>`:e+=l(s.value);return e}},{extends:"li"}),h=()=>`
  <p>We could not find anything for your search...</p>
`,n=i("empty-result",class extends HTMLLIElement{constructor(){super(),this.classList.add("empty-result"),this.__setup()}__setup(){this.innerHTML=h()}},{extends:"li"}),d=()=>`
  <h1>
    A free, open-source, and non-profit search engine.
  </h1>
`,u=i("home",class extends HTMLLIElement{constructor(){super(),this.classList.add("home"),this.__setup()}__setup(){this.innerHTML=d()}},{extends:"li"}),p=()=>`
  <ul class='results'>
    <li is='${u}'></li>
  </ul>
`,L=i("results",class extends HTMLElement{constructor(){super(),this.results=null,this.__setup()}__setup(){this.innerHTML=p(),this.results=this.querySelector(".results"),this.__events()}__events(){r.on("search",t=>{this.results.innerHTML="";let e="";if(t.detail.error)e=`
          <li is='${n}'></li>
        `;else if(!t.detail.results)e=`
            <li is='${u}'></li>
          `;else if(t.detail.results.length>0)for(const s of t.detail.results)e+=`
              <li
                is='${c}' 
                data-url='${l(s.url)}'
                data-title='${l(JSON.stringify(s.title))}'
                data-extract='${l(JSON.stringify(s.extract))}'
              ></li>
            `;else e=`
            <li is='${n}'></li>
          `;this.results.innerHTML=e}),r.on("focus-result",()=>{this.results.firstElementChild.firstElementChild.focus()})}});export{L as default};
