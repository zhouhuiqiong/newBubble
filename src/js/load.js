/**
 * Vue directive for lazy load components or elements.
 */
var vueLoad = {}

function findVmFromFrag(frag) {
    let node = frag.node;
    if (frag.end) {
        while (!node.__vue__ && node !== frag.end && node.nextSibling) {
            node = node.nextSibling;
        }
    }
    return node.__vue__;
}
vueLoad.install = function (Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var FragmentFactory = Vue.FragmentFactory;
    var _Vue$util = Vue.util,
        createAnchor = _Vue$util.createAnchor,
        replace = _Vue$util.replace;

    Vue.directive(options.name || 'lazy', {
        terminal: true,
        bind: function bind() {
            this.isInit = false;
            this.anchor = createAnchor('v-if');
            replace(this.el, this.anchor);
        },
        update: function update(value) {
            var _this = this;

            if (this.isInit) {
                return;
            }

            window.setTimeout(function () {
                _this.insert();
                _this.updateRef();
                _this.isInit = true;
            }, value || 0);
        },
        unbind: function unbind() {
            this.frag && this.frag.destroy();
        },

        // insert dom
        insert: function insert() {
            if (!this.factory) {
                this.factory = new FragmentFactory(this.vm, this.el);
            }
            this.frag = this.factory.create(this._host, this._scope, this._frag);
            this.frag.before(this.anchor, !this.modifiers['no-animation']); //multiBefore(target, withTransition)
        },

        // update v-ref
        updateRef: function updateRef() {
            var ref = this.descriptor.ref;
            if (!ref) {
                return;
            }

            var hash = (this.vm || this._scope).$refs,
                refs = hash[ref],
                key = this._frag.scope.$key;

            if (!refs) {
                return;
            }

            if (Array.isArray(refs)) {
                refs.push(findVmFromFrag(this._frag));
            } else {
                refs[key] = findVmFromFrag(this._frag);
            }
        }
});
module.exports = vueLoad;
