import{d as i,c as m,a as p,b as u,g as s,t as n,s as v,v as j,_ as d,u as V,l as f,e as h,f as $,x as b}from"./index-GMdYKjcq.js";import"./transaction-card.vue_vue_type_style_index_0_lang-jksevSAk.js";const g={class:"tradition-input"},x={class:"tradition-input__title"},B=["placeholder"],C=i({__name:"tradition-input",props:{title:{},modelValue:{type:[String,Number,Boolean]},placeHolder:{}},emits:["update:modelValue"],setup(c,{emit:r}){const t=c,l=r,o=m({get(){return t.modelValue},set(e){l("update:modelValue",e)}});return(e,a)=>(p(),u("div",g,[s("div",x,n(t.title),1),v(s("input",{class:"tradition-input__input",type:"text",name:"input","onUpdate:modelValue":a[0]||(a[0]=_=>o.value=_),placeholder:e.placeHolder},null,8,B),[[j,o.value]])]))}}),I=d(C,[["__scopeId","data-v-05a5d0e1"]]),N={class:"create-project"},k={class:"create-project__container"},y=i({__name:"CreateProject",setup(c){V();const r=b(),t=f(""),l=()=>{r.push("/")};return(o,e)=>(p(),u("div",N,[s("h1",null,n(o.$t("projects.create_project")),1),s("div",k,[h($(I),{title:"Название проекта","place-holder":"Введите название проекта",modelValue:t.value,"onUpdate:modelValue":e[0]||(e[0]=a=>t.value=a)},null,8,["modelValue"])]),s("button",{class:"create-project__button",onClick:e[1]||(e[1]=a=>l())},n(o.$t("projects.create_project")),1)]))}}),H=d(y,[["__scopeId","data-v-36eb7555"]]);export{H as default};
