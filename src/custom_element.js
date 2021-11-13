customElements.define("rad-ial",class RadialElement extends HTMLElement {
    constructor(){
        super();
    }
    set_scope(){
        if(this.getAttribute("scope") == undefined) return;
        this.radial = new Radial(this,Radial.scopes[this.getAttribute("scope")]);
        Object.defineProperty(this.radial.scope, "reload", {
            value: ()=>{this.radial.run_expressions();},
            writable: false,
            enumerable: true,
            configurable: true
        });
        window.addEventListener("load",()=>{
            this.radial.search_for_expressions_recursive(this);
            this.radial.run_expressions();
        });
        this.removeAttribute("scope");
    }
    connectedCallback(){
        this.set_scope();
    }
    attributeChangedCallback(attr,old_name,new_name){
        this.set_scope();
    }
    static get observedAttributes(){
        return ["scope"];
    }
});