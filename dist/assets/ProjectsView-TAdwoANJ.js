import{d as l,a as d,u,c as w,o as a,b as _,e as s,F as v,r as f,n as i,t as S,p as M,f as g,_ as $,g as k,h as I}from"./index-ySpXpLdx.js";const b=l("app",{state:()=>({mode:"receipts"}),actions:{setMode(e){this.mode=e}},getters:{getMode:e=>e.mode}}),r=e=>(M("data-v-112e4180"),e=e(),g(),e),x={class:"mode-switch"},C={class:"mode-switch__switches"},B=["onClick"],V=r(()=>s("div",{class:"mode-switch__switches__date"},"10.02.2024",-1)),j=r(()=>s("div",{class:"mode-switch__container"},[s("div",{class:i(["mode-switch__container__banner","banner"])}," ddd ")],-1)),y=d({__name:"mode-switch",setup(e){const t=b();u();const n=w(()=>t.getMode),p=["receipts","expenses"],h=o=>{t.setMode(o)};return(o,z)=>(a(),_("div",x,[s("div",C,[(a(),_(v,null,f(p,(c,m)=>s("button",{key:"mode"+m,class:i(["mode-switch__switches__switch",{"mode-switch__switches__switch_active":n.value===c}]),onClick:D=>h(c)},S(o.$t(`projects.${c}`)),11,B)),64)),V]),j]))}}),A=$(y,[["__scopeId","data-v-112e4180"]]),F={class:"container"},N=s("div",null,"Тут вкалдка проектоdв",-1),L=d({__name:"ProjectsView",setup(e){return(t,n)=>(a(),_("div",F,[k(I(A)),N]))}});export{L as default};