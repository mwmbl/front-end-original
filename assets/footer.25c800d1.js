import{d as s}from"./define.b7078a0a.js";import{c as o}from"./config.d02c906f.js";const n=({data:t})=>`
  <p class="footer-text">Find more on</p>
  <ul class="footer-list">
    ${t.links.map(e=>`
      <li class="footer-item">
        <a href="${e.href}" class="footer-link" target="_blank">
          <i class="${e.icon}"></i>
          <span>${e.name}</span>
        </a>
      </li>
    `).join("")}
  </ul>
`,i=s("footer",class extends HTMLElement{constructor(){super(),this.__setup()}__setup(){this.innerHTML=n({data:{links:o.footerLinks}}),this.__events()}__events(){}},{extends:"footer"});export{i as default};
