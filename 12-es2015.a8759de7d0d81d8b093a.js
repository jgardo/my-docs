(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"3pp/":function(e,t,n){"use strict";n.r(t),n.d(t,"FilePageModule",(function(){return Q}));var r=n("TEn/"),i=n("ofXK"),s=n("3Pt+"),o=n("tyNb"),c=n("fXoL");function l(e,t){if(1&e&&(c.Rb(0,"pre"),c.pc(1),c.Qb()),2&e){const e=c.bc();c.Eb(1),c.qc(e.file.content)}}let a=(()=>{class e{constructor(){}ngOnInit(){}setFile(e){this.file=e}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c.Ib({type:e,selectors:[["app-default-file-viewer"]],decls:1,vars:1,consts:[[4,"ngIf"]],template:function(e,t){1&e&&c.nc(0,l,2,1,"pre",0),2&e&&c.ec("ngIf",t.file)},directives:[i.i],styles:["pre[_ngcontent-%COMP%]{color:var(--color)}"]}),e})();var f=n("Tr1Y");let h=(()=>{class e{constructor(){this.options={enablePreviewContentClick:!0},this.postRender=e=>e.replaceAll("<a href",'<a target="_blank" href')}ngOnInit(){}setFile(e){this.file=e}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c.Ib({type:e,selectors:[["app-markdown-file-viewer"]],decls:1,vars:3,consts:[["name","Content","mode","preview","height","100%",3,"ngModel","options","postRender","ngModelChange"]],template:function(e,t){1&e&&(c.Rb(0,"md-editor",0),c.Zb("ngModelChange",(function(e){return t.file.content=e})),c.Qb()),2&e&&c.ec("ngModel",t.file.content)("options",t.options)("postRender",t.postRender)},directives:[f.b,s.e,s.f],styles:["md-editor .preview-panel{background-color:initial!important}"]}),e})();var u=n("mrSG"),b=n("jhN1");function d(e,t){if(1&e&&c.Pb(0,"iframe",2),2&e){const e=c.bc();c.ec("src",e.sanitizedUrl,c.ic)}}function p(e,t){if(1&e){const e=c.Sb();c.Rb(0,"div"),c.Rb(1,"p"),c.pc(2," Url otworzony w nowym oknie przegl\u0105darki. "),c.Qb(),c.Rb(3,"ion-button",3),c.Zb("click",(function(){return c.hc(e),c.bc().openInBrowser()})),c.Pb(4,"ion-icon",4),c.pc(5," Otw\xf3rz ponownie "),c.Qb(),c.Qb()}}let m=(()=>{class e{constructor(e,t,n){this.sanitizer=e,this.actionSheetController=t,this.location=n,this.mode="unknown"}static calculateUrl(e){const t=e.split("\n").filter(e=>e.startsWith("URL"))[0];return t.substr(t.indexOf("=")+1).trim()}ngOnInit(){this.presentActionSheet()}presentActionSheet(){return Object(u.a)(this,void 0,void 0,(function*(){const e=yield this.actionSheetController.create({header:"Url",buttons:[{text:"Otw\xf3rz w nowym oknie",role:"selected",icon:"open",handler:()=>{this.mode="in-browser",this.openInBrowser()}},{text:"Otw\xf3rz w aplikacji",icon:"eye",handler:()=>{this.mode="in-app"}},{text:"Anuluj",icon:"close",role:"cancel",handler:()=>{this.location.back()}}]});yield e.present()}))}setFile(t){this.file=t,this.url=e.calculateUrl(t.content),this.sanitizedUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.url)}openInBrowser(){window.open(this.url)}}return e.\u0275fac=function(t){return new(t||e)(c.Ob(b.b),c.Ob(r.a),c.Ob(i.f))},e.\u0275cmp=c.Ib({type:e,selectors:[["app-url-file-viewer"]],decls:2,vars:2,consts:[["width","100%","height","97%","frameborder","0","scrolling","no",3,"src",4,"ngIf"],[4,"ngIf"],["width","100%","height","97%","frameborder","0","scrolling","no",3,"src"],["expand","block",3,"click"],["slot","start","name","eye"]],template:function(e,t){1&e&&(c.nc(0,d,1,1,"iframe",0),c.nc(1,p,6,0,"div",1)),2&e&&(c.ec("ngIf","in-app"===t.mode),c.Eb(1),c.ec("ngIf","in-browser"===t.mode))},directives:[i.i,r.f,r.l],styles:["iframe[_ngcontent-%COMP%]{overflow:hidden;border:none}"]}),e})(),v=(()=>{class e{constructor(e){this.factoryResolver=e}addViewer(e,t){const n=this.resolveComponentType(t),r=this.factoryResolver.resolveComponentFactory(n).create(e.parentInjector),i=r.instance;return i.setFile(t),e.insert(r.hostView),i}resolveComponentType(e){return e.fileSystemEntry.name.endsWith(".md")?h:e.fileSystemEntry.name.endsWith(".url")?m:a}}return e.\u0275fac=function(t){return new(t||e)(c.Vb(c.l))},e.\u0275prov=c.Kb({token:e,factory:e.\u0275fac}),e})();var y=n("bOdf"),w=n("Cfvw"),S=n("7DJ4"),g=n("YZAu"),R=n("I/6E");const O=["dynamic"];function k(e,t){}let F=(()=>{class e{constructor(e,t,n,r,i,s,o){this.fileViewerProviderService=e,this.route=t,this.fileSystemFacadeCacheService=n,this.toastService=r,this.refresherService=i,this.router=s,this.location=o}ngOnInit(){this.routeDataSubscription=this.route.data.subscribe(e=>{this.file=e.file,this.fileSystemFacade=e.fileSystemFacade,this.currentViewer&&this.currentViewer.setFile(this.file)})}ngAfterViewInit(){this.currentViewer=this.fileViewerProviderService.addViewer(this.viewContainerRef,this.file)}ngOnDestroy(){this.routeDataSubscription.unsubscribe()}goToItem(e){const t=e.path.substr(1).split("/");this.router.navigate([this.getFileSystemPrefix()].concat(t))}getFileSystemPrefix(){return"/tabs/home/file-system/"+this.file.fileSystemEntry.dataSource.id}doRefresh(e){this.fileSystemFacadeCacheService.refresh(this.fileSystemFacade).pipe(Object(y.a)(()=>{const e=(this.file.fileSystemEntry.path+"-details").split("/");return Object(w.a)(this.router.navigate([this.getFileSystemPrefix()].concat(e),{skipLocationChange:!0,state:{refreshTime:new Date}}))}),this.refresherService.finishRefresher(e),this.toastService.catchErrorAndShowToast()).subscribe()}back(){this.location.back()}}return e.\u0275fac=function(t){return new(t||e)(c.Ob(v),c.Ob(o.a),c.Ob(S.a),c.Ob(g.a),c.Ob(R.a),c.Ob(o.g),c.Ob(i.f))},e.\u0275cmp=c.Ib({type:e,selectors:[["app-file"]],viewQuery:function(e,t){var n;1&e&&c.sc(O,!0,c.U),2&e&&c.gc(n=c.ac())&&(t.viewContainerRef=n.first)},decls:12,vars:4,consts:[[3,"translucent"],["slot","start"],[3,"click"],[3,"fullscreen"],["slot","fixed",3,"ionRefresh"],["dynamic",""]],template:function(e,t){1&e&&(c.Rb(0,"ion-header",0),c.Rb(1,"ion-toolbar"),c.Rb(2,"ion-buttons",1),c.Rb(3,"ion-back-button",2),c.Zb("click",(function(){return t.back()})),c.Qb(),c.Qb(),c.Rb(4,"ion-title"),c.Rb(5,"ion-label"),c.pc(6),c.Qb(),c.Qb(),c.Qb(),c.Qb(),c.Rb(7,"ion-content",3),c.Rb(8,"ion-refresher",4),c.Zb("ionRefresh",(function(e){return t.doRefresh(e)})),c.Pb(9,"ion-refresher-content"),c.Qb(),c.nc(10,k,0,0,"ng-template",null,5,c.oc),c.Qb()),2&e&&(c.ec("translucent",!0),c.Eb(6),c.rc(" /",null==t.file||null==t.file.fileSystemEntry?null:t.file.fileSystemEntry.dataSource.id,"",null==t.file||null==t.file.fileSystemEntry?null:t.file.fileSystemEntry.path," "),c.Eb(1),c.ec("fullscreen",!0))},directives:[r.k,r.G,r.g,r.d,r.e,r.F,r.s,r.h,r.v,r.w],styles:[""]}),e})();var I=n("Yn41");const C=[{path:"",children:[{path:"**",component:F,runGuardsAndResolvers:"always",resolve:{fileSystemFacade:I.a,file:(()=>{class e{constructor(e,t){this.toastService=e,this.fileSystemFacadeResolverService=t}resolve(e,t){const n=e.url.map(e=>e.path).join("/"),r=n.endsWith("-details")?n.substr(0,n.length-"-details".length):n,i={};return this.fileSystemFacadeResolverService.resolve(e,t).pipe(Object(y.a)(e=>this.resolveForUrlAndParamMap(e,r,i)),this.toastService.catchErrorAndShowToast())}resolveForUrlAndParamMap(e,t,n){return e.resolveFile(t)}}return e.\u0275fac=function(t){return new(t||e)(c.Vb(g.a),c.Vb(I.a))},e.\u0275prov=c.Kb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]}];let E=(()=>{class e{}return e.\u0275mod=c.Mb({type:e}),e.\u0275inj=c.Lb({factory:function(t){return new(t||e)},imports:[[o.i.forChild(C)],o.i]}),e})();var P=n("5M1D");let Q=(()=>{class e{}return e.\u0275mod=c.Mb({type:e}),e.\u0275inj=c.Lb({factory:function(t){return new(t||e)},providers:[v],imports:[[r.H,i.b,s.a,E,f.a,P.a]]}),e})()}}]);