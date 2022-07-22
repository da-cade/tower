import{_ as h,P as d,l as f,A as o,t as g}from"./index.52ed833b.js";import{t as k}from"./TicketsService.c28d924e.js";import{j as w,C as y,c as _,b as x,d as c,e as i,f as e,F as p,E as m,t as a,p as b,i as I,G as T}from"./vendor.aca7b170.js";const S={name:"Account",setup(){const s=w("");return y(async()=>{s.value&&(await g.getTowerById(o.activeTower.id),s.value="")}),{tickets:_(()=>o.tickets),account:_(()=>o.account),towers:_(()=>o.towers.filter(n=>n.creatorId==o.account.id)),async deleteTicket(n){try{await d.confirm("Are you sure?","If you proceed, someone else can claim this ticket. If you change your mind, get a new ticket before spots run out!")&&(await k.deleteTicket(n),d.toast("We've given up your spot for you"),s.value="sold")}catch(l){f.error(l),d.toast(l.message,"error")}}}}},u=s=>(b("data-v-1637b85c"),s=s(),I(),s),A={class:"container-fluid"},j={class:"row d-flex"},B=u(()=>e("span",{class:"text-light mt-4 mb-2"}," My Tickets ",-1)),C={class:"d-flex ticket bg-light p-2 my-1"},D=["src","alt"],E={class:"d-flex flex-column justify-content-between"},P={class:"p-2"},F=u(()=>e("hr",null,null,-1)),L={class:"text-dark"},M={class:"m-0"},N={class:"m-0"},G=["onClick"],V={class:"row"},W=u(()=>e("span",{class:"text-light my-3"},"My Events",-1));function $(s,n,l,r,q,z){const v=x("Tower");return c(),i("div",A,[e("div",j,[B,(c(!0),i(p,null,m(r.tickets,t=>(c(),i("div",{class:"col-md-6",key:t.id},[e("div",C,[e("img",{class:"coverImg",src:t.event.coverImg,alt:t.event.name},null,8,D),e("div",E,[e("div",P,[e("h6",null,a(t.account.name),1),e("h5",null,a(t.event.name),1),F,e("div",L,[e("p",M,a(t.event.location),1),e("p",N,a(new Date(t.event.startDate).toLocaleString()),1)])])]),e("button",{class:"mt-auto ms-auto",onClick:H=>r.deleteTicket(t.id),"aria-label":"Delete Ticket"}," Not going ",8,G)])]))),128))]),e("div",V,[W,e("p",null,a(r.towers.length),1),(c(!0),i(p,null,m(r.towers,t=>(c(),T(v,{key:t.id,tower:t},null,8,["tower"]))),128))])])}var Q=h(S,[["render",$],["__scopeId","data-v-1637b85c"]]);export{Q as default};
