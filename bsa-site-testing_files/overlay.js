google.maps.__gjsload__('overlay', function(_){'use strict';var Ky=_.pa("b"),Ly=_.na(),My=function(){var a=this.$f;if(this.getPanes()){if(this.getProjection()){if(!a.b&&this.onAdd)this.onAdd();a.b=!0;this.draw()}}else{if(a.b)if(this.onRemove)this.onRemove();else this.remove();a.b=!1}},Ny=function(a){a.$f=a.$f||new Ly;return a.$f},Oy=function(a){_.zf.call(this);this.Y=(0,_.p)(My,a)};_.t(Ky,_.C);
Ky.prototype.changed=function(a){"outProjection"!=a&&(a=!!(this.get("offset")&&this.get("projectionTopLeft")&&this.get("projection")&&_.x(this.get("zoom"))),a==!this.get("outProjection")&&this.set("outProjection",a?this.b:null))};_.t(Oy,_.zf);_.lc("overlay",{Zk:function(a){var b=a.getMap(),c=Ny(a),d=c.en;c.en=b;d&&(c=Ny(a),(d=c.ea)&&d.unbindAll(),(d=c.ti)&&d.unbindAll(),a.unbindAll(),a.set("panes",null),a.set("projection",null),_.v(c.S,_.z.removeListener),c.S=null,c.Xa&&(c.Xa.Y(),c.Xa=null),_.Xm("Ox","-p",a));if(b){c=Ny(a);d=c.Xa;d||(d=c.Xa=new Oy(a));_.v(c.S||[],_.z.removeListener);var e=c.ea=c.ea||new _.nm,f=b.__gm;e.bindTo("zoom",f);e.bindTo("offset",f);e.bindTo("center",f,"projectionCenterQ");e.bindTo("projection",b);e.bindTo("projectionTopLeft",
f);e=c.ti=c.ti||new Ky(e);e.bindTo("zoom",f);e.bindTo("offset",f);e.bindTo("projection",b);e.bindTo("projectionTopLeft",f);a.bindTo("projection",e,"outProjection");a.bindTo("panes",f);e=(0,_.p)(d.L,d);c.S=[_.z.addListener(a,"panes_changed",e),_.z.addListener(f,"zoom_changed",e),_.z.addListener(f,"offset_changed",e),_.z.addListener(b,"projection_changed",e),_.z.addListener(f,"projectioncenterq_changed",e),_.z.forward(b,"forceredraw",d)];d.L();b instanceof _.be&&(_.Um(b,"Ox"),_.Wm("Ox","-p",a,!!b.b))}}});});
