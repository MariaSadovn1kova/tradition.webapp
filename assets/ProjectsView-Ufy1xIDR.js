import{d as _,u as d,c as o,o as m,a as j,b as f,e as s,w as S,f as c,g as e,t as a,F as g,_ as h}from"./index-GMdYKjcq.js";import{T as v,M as P}from"./tradition-button-vEB5Bn3M.js";import{T as b}from"./tradition-list-ENMd9qp8.js";import{u as w,a as x}from"./transaction-card.vue_vue_type_style_index_0_lang-jksevSAk.js";const y={class:"project-container"},M={class:"project-subtitle"},B={class:"project-subtitle__text"},C={class:"project-subtitle__project-count"},T=_({__name:"ProjectsView",setup(V){const t=w(),n=x();d();const p=o(()=>n.getMode),u=o(()=>t.getProjects),i=o(()=>t.getProjectsCount),l=o(()=>p.value==="expenses"?t.getProjectSumExpenses:t.getProjectSumReceipts);return m(()=>{t.fetchProjects()}),(r,k)=>(j(),f(g,null,[s(c(v),{class:"main-button",link:"/create/project"},{default:S(()=>[e("span",null,a(r.$t("projects.create_project")),1)]),_:1}),e("div",y,[s(c(P),{"today-amount":l.value},null,8,["today-amount"]),e("div",M,[e("span",B,a(r.$t("projects.my_projects")),1),e("span",C,a(i.value),1)]),s(c(b),{items:u.value,type:"project"},null,8,["items"])])],64))}}),N=h(T,[["__scopeId","data-v-1dd5244b"]]);export{N as default};
