import {copy} from './translations.js';
const languages=['en','ka','ru'];
const dictionary=new Map(copy.map(row=>[row[0],row]));
let language='en';
export function translate(text){return dictionary.get(text)?.[languages.indexOf(language)]??text;}
const textNodes=[];
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
while(walker.nextNode()){
 const node=walker.currentNode;
 if(node.parentElement.closest('script,style,select,.brand'))continue;
 if(dictionary.has(node.textContent.trim()))textNodes.push({node,original:node.textContent});
}
const attributes=[];
for(const element of document.querySelectorAll('[placeholder],[aria-label],[alt],meta[name="description"]')){
 for(const name of ['placeholder','aria-label','alt','content']){
  const original=element.getAttribute(name);
  if(original&&dictionary.has(original))attributes.push({element,name,original});
 }
}
const originalTitle=document.title;
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('nav');
const picker=document.querySelector('#language');
let inquiryPrepared=false;
const statusText='Your inquiry has been prepared for download. Nothing has been sent yet.';
function applyLanguage(next,persist=true){
 language=languages.includes(next)?next:'en';
 document.documentElement.lang=language;
 picker.value=language;
 for(const {node,original} of textNodes)node.textContent=original.replace(original.trim(),translate(original.trim()));
 for(const {element,name,original} of attributes)element.setAttribute(name,translate(original));
 document.title=translate(originalTitle);
 updateMenuLabel();
 if(inquiryPrepared)document.querySelector('#form-status').textContent=translate(statusText);
 for(const field of document.querySelectorAll('input,textarea'))field.setCustomValidity('');
 if(persist){
  try{localStorage.setItem('geoblueberry-language',language);}catch{}
  const url=new URL(location.href);url.searchParams.set('lang',language);
  history.replaceState(null,'',url);
 }
}
function updateMenuLabel(){toggle.setAttribute('aria-label',translate(nav.classList.contains('open')?'Close navigation':'Open navigation'));}
function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');updateMenuLabel();}
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));updateMenuLabel();});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
picker.addEventListener('change',()=>applyLanguage(picker.value));
let saved;try{saved=localStorage.getItem('geoblueberry-language');}catch{}
const requested=new URL(location.href).searchParams.get('lang');
applyLanguage(languages.includes(requested)?requested:languages.includes(saved)?saved:'en',false);
document.querySelector('#year').textContent=new Date().getFullYear();
const validation={
 en:{required:'Please complete this field.',email:'Please enter a valid email address.'},
 ka:{required:'გთხოვთ, შეავსოთ ეს ველი.',email:'გთხოვთ, მიუთითოთ სწორი ელფოსტის მისამართი.'},
 ru:{required:'Пожалуйста, заполните это поле.',email:'Пожалуйста, укажите корректный адрес электронной почты.'}
};
for(const field of document.querySelectorAll('input,textarea')){
 field.addEventListener('input',()=>field.setCustomValidity(''));
 field.addEventListener('invalid',()=>{
  field.setCustomValidity('');
  if(field.validity.valueMissing||!field.value.trim())field.setCustomValidity(validation[language].required);
  else if(field.validity.typeMismatch)field.setCustomValidity(validation[language].email);
 });
}
document.querySelector('#inquiry-form').addEventListener('submit',event=>{
 event.preventDefault();
 const fields=Array.from(event.currentTarget.querySelectorAll('input,textarea'));
 for(const field of fields){
  if(!field.value.trim()){field.setCustomValidity(validation[language].required);field.reportValidity();return;}
 }
 const data=new FormData(event.currentTarget);
 const labels={name:'Your name',company:'Company',email:'Business email',country:'Destination country',message:'What are you looking for?'};
 const text=[translate('GeoBlueBerry — Export inquiry'),'',...Array.from(data,([key,value])=>translate(labels[key])+': '+String(value).trim()),'',translate('Prepared locally. This inquiry has not been sent.')].join('\n');
 const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download='GeoBlueBerry-inquiry-'+language+'.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 inquiryPrepared=true;
 document.querySelector('#form-status').textContent=translate(statusText);
});
