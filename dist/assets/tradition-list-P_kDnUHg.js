import{d as v,j as k,c as t,r as j,a as n,h as f,w as x,g as o,t as u,b as i,n as g,_ as h,F as b,k as C}from"./index-InqtpY1j.js";import{u as I,a as D,_ as S,b as $,f as B}from"./transaction-card.vue_vue_type_style_index_0_lang-Xr_g8JYT.js";const w={class:"tradition-card__text-content text-content"},L={class:"text-content__title"},T={class:"text-content__subtitle"},A={class:"tradition-card__arrow"},F={key:0,src:S},M={key:1,src:$},N={class:"tradition-card__transaction-info transaction-info"},z=v({__name:"tradition-card",props:{item:{},type:{},link:{}},setup(_){const e=_,r=k(),p=I(),d=D(),a=t(()=>e.item),l=t(()=>e.link),s=t(()=>d.getMode);t(()=>r.params.projectID);const m=t(()=>p.getObjectsCount(a.value.id)),c=t(()=>B(s.value==="expenses"?e.item.expenses_today:e.item.receipts_today));return(R,V)=>{const y=j("router-link");return n(),f(y,{class:"tradition-card__container",to:l.value},{default:x(()=>[o("div",w,[o("div",L,u(a.value.title),1),o("div",T,u(m.value),1)]),o("div",A,[s.value==="receipts"?(n(),i("img",F)):(n(),i("img",M))]),o("div",N,[o("span",{class:g(["transaction-info__subtitle",s.value])},u(c.value),3)])]),_:1},8,["to"])}}}),E=h(z,[["__scopeId","data-v-10dc9817"]]),O={class:"tradition-list__container"},P=v({__name:"tradition-list",props:{items:{},type:{}},setup(_){const e=_,r=k(),p=t(()=>e.items),d=t(()=>e.type),a=t(()=>r.params.projectID?r.params.projectID:null),l=s=>a.value?`/project/${a.value}/${s}`:`/project/${s}`;return(s,m)=>(n(),i("div",O,[(n(!0),i(b,null,C(p.value,c=>(n(),f(E,{key:c.id,item:c,type:d.value,link:l(c.id)},null,8,["item","type","link"]))),128))]))}}),H=h(P,[["__scopeId","data-v-18196f91"]]);export{H as T};
