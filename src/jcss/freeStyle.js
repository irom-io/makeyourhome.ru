var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
/**
 * Increment through IDs for FreeStyle, which can't generate hashed IDs.
 */
var instanceId = 0;
var Style, Rule, Selector, Cache;
/**
 * CSS properties that are valid unit-less numbers.
 */
var CSS_NUMBER = {
    'box-flex': true,
    'box-flex-group': true,
    'column-count': true,
    'flex': true,
    'flex-grow': true,
    'flex-positive': true,
    'flex-shrink': true,
    'flex-negative': true,
    'font-weight': true,
    'line-clamp': true,
    'line-height': true,
    'opacity': true,
    'order': true,
    'orphans': true,
    'tab-size': true,
    'widows': true,
    'z-index': true,
    'zoom': true,
    // SVG properties.
    'fill-opacity': true,
    'stroke-dashoffset': true,
    'stroke-opacity': true,
    'stroke-width': true
};
/**
 * CSS vendor prefixes.
 */
var VENDOR_PREFIXES = ['-webkit-', '-ms-', '-moz-', '-o-'];
// Add vendor prefixes to all unit-less properties.
for (var _i = 0, _a = Object.keys(CSS_NUMBER); _i < _a.length; _i++) {
    var property = _a[_i];
    for (var _b = 0, VENDOR_PREFIXES_1 = VENDOR_PREFIXES; _b < VENDOR_PREFIXES_1.length; _b++) {
        var prefix = VENDOR_PREFIXES_1[_b];
        CSS_NUMBER[prefix + property] = true;
    }
}
/**
 * Transform a JavaScript property into a CSS property.
 */
function hyphenate(propertyName) {
    return propertyName
        .replace(/([A-Z])/g, '-$1')
        .replace(/^ms-/, '-ms-') // Internet Explorer vendor prefix.
        .toLowerCase();
}
/**
 * Check if a property name should pop to the top level of CSS.
 */
function isAtRule(propertyName) {
    return propertyName.charAt(0) === '@';
}
/**
 * Check if a value is a nested style definition.
 */
function isNestedStyle(value) {
    return value != null && typeof value === 'object' && !Array.isArray(value);
}
/**
 * Generate a hash value from a string.
 */
function stringHash(str) {
    var value = 5381;
    var i = str.length;
    while (i) {
        value = (value * 33) ^ str.charCodeAt(--i);
    }
    return (value >>> 0).toString(36);
}
exports.stringHash = stringHash;
/**
 * Transform a style string to a CSS string.
 */
function styleStringToString(name, value) {
    if (value == null) {
        return '';
    }
    if (typeof value === 'number' && value !== 0 && !CSS_NUMBER[name]) {
        value += 'px';
    }
    return name + ":" + String(value).replace(/([\{\}\[\]])/g, '\\$1');
}
/**
 * Transform a style into a CSS string.
 */
function styleToString(name, value) {
    if (Array.isArray(value)) {
        return value.map(function (value) {
            return styleStringToString(name, value);
        }).join(';');
    }
    return styleStringToString(name, value);
}
/**
 * Sort an array of tuples by first value.
 */
function sortTuples(value) {
    return value.sort(function (a, b) { return a[0] > b[0] ? 1 : -1; });
}
/**
 * Categorize user styles.
 */
function parseUserStyles(styles, hasNestedStyles) {
    var properties = [];
    var nestedStyles = [];
    // Sort keys before adding to styles.
    for (var _i = 0, _a = Object.keys(styles); _i < _a.length; _i++) {
        var key = _a[_i];
        var value = styles[key];
        if (isNestedStyle(value)) {
            nestedStyles.push([key.trim(), value]);
        }
        else {
            properties.push([hyphenate(key.trim()), value]);
        }
    }
    return {
        properties: sortTuples(properties),
        nestedStyles: hasNestedStyles ? nestedStyles : sortTuples(nestedStyles)
    };
}
/**
 * Stringify an array of property tuples.
 */
function stringifyProperties(properties) {
    return properties.map(function (p) { return styleToString(p[0], p[1]); }).join(';');
}
/**
 * Interpolate CSS selectors.
 */
function interpolate(selector, parent) {
    if (selector.indexOf('&') > -1) {
        return selector.replace(/&/g, parent);
    }
    return parent + " " + selector;
}
/**
 * Register all styles, but collect for post-selector correction using the hash.
 */
function collectHashedStyles(container, styles, hasNestedStyles) {
    var instances = [];
    var hashString = '';
    function stylize(container, styles, selector) {
        var _a = parseUserStyles(styles, hasNestedStyles), properties = _a.properties, nestedStyles = _a.nestedStyles;
        var styleString = stringifyProperties(properties);
        var style = container.add(new Style(styleString, container.hash));
        hashString += styleString;
        instances.push([selector, style]);
        for (var _i = 0, nestedStyles_1 = nestedStyles; _i < nestedStyles_1.length; _i++) {
            var _b = nestedStyles_1[_i], name_1 = _b[0], value = _b[1];
            hashString += name_1;
            if (isAtRule(name_1)) {
                stylize(container.add(new Rule(name_1, undefined, container.hash)), value, selector);
            }
            else {
                stylize(container, value, hasNestedStyles ? interpolate(name_1, selector) : name_1);
            }
        }
    }
    stylize(container, styles, '&');
    return { hashString: hashString, instances: instances };
}

/**
 * Parse selector key
 */
function parseSelector(key) {
    if (key.indexOf(':global ') === 0) {
        return {
            global: true,
            value: key.replace(':global ', '')
        };
    } else if (key.indexOf(' ') !== -1) {
        console.warn('Error in selector "' + key + '". To set global style or cascade use ":global " before your selector');
        return null;
    } else {
        return {
            global: false,
            value: key
        }
    }
}

/**
 * clear object of "toString" value
 */
function clearToString(obj) {
    var prop;

    for(prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (prop === 'toString') {
                delete obj[prop];
            } else if (typeof obj[prop] === 'object') {
                clearToString(obj[prop])
            }
        }
    }
}

/**
 * Recursively register styles on a container instance.
 */
function registerUserStyles(container, styles, key) {
    clearToString(styles);

    var currentSelectorInfo = parseSelector(key);
    var exportStyle = {...styles};

    if (currentSelectorInfo) {
        var _a = collectHashedStyles(container, styles, true), hashString = _a.hashString, instances = _a.instances;
        var currentSelector;

        if (currentSelectorInfo.global) {
            currentSelector = currentSelectorInfo.value;
        } else {
            currentSelectorInfo.value = currentSelectorInfo.value + '_' + container.hash(hashString);
            currentSelector = '.' + currentSelectorInfo.value;
        }

        for (var _i = 0, instances_1 = instances; _i < instances_1.length; _i++) {
            var _b = instances_1[_i], selector = _b[0], style = _b[1];
            style.add(new Selector(interpolate(selector, currentSelector), style.hash, undefined, hashString));
        }

        exportStyle.toString = () => {
            return currentSelectorInfo.value;
        };

        return exportStyle;
    } else {
        return null;
    }
}

/**
 * Create user rule. Simplified collect styles, since it doesn't need hashing.
 */
function registerUserRule(container, selector, styles) {
    var _a = parseUserStyles(styles, false), properties = _a.properties, nestedStyles = _a.nestedStyles;
    // Throw when using properties and nested styles together in rule.
    if (properties.length && nestedStyles.length) {
        throw new TypeError("Registering a CSS rule can not use properties with nested styles");
    }
    var styleString = stringifyProperties(properties);
    var rule = container.add(new Rule(selector, styleString, container.hash));
    for (var _i = 0, nestedStyles_2 = nestedStyles; _i < nestedStyles_2.length; _i++) {
        var _b = nestedStyles_2[_i], name_2 = _b[0], value = _b[1];
        registerUserRule(rule, name_2, value);
    }
}
/**
 * Parse and register keyframes on the current instance.
 */
function registerUserHashedRule(container, selector, styles) {
    var bucket = new Cache(container.hash);
    var _a = collectHashedStyles(bucket, styles, false), hashString = _a.hashString, instances = _a.instances;
    for (var _i = 0, instances_2 = instances; _i < instances_2.length; _i++) {
        var _b = instances_2[_i], rule = _b[0], style = _b[1];
        style.add(new Selector(rule, style.hash, undefined, hashString));
    }
    var currentIdentifier = "h" + container.hash(hashString);
    var atRule = container.add(new Rule("@" + selector + " " + currentIdentifier, undefined, container.hash, undefined, hashString));
    atRule.merge(bucket);
    return currentIdentifier;
}
/**
 * Get the styles string for a container class.
 */
function getStyles(container) {
    return container.values().map(function (style) { return style.getStyles(); }).join('');
}
/**
 * Implement a cache/event emitter.
 */
Cache = (function () {
    function Cache(hash) {
        var _this = this;
        if (hash === void 0) { hash = stringHash; }
        this.hash = hash;
        this._children = {};
        this._keys = [];
        this._counts = {};
        this._listeners = [];
        this._mergeListener = function (type, path) {
            var finalItem = path.pop();
            var item = _this;
            for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
                var cacheItem = path_1[_i];
                item = _this.get(cacheItem);
            }
            return type === 'add' ? item.add(finalItem) : _this.remove(finalItem);
        };
        this._childListener = function (type, path, parent) {
            _this.emitChange(type, [parent].concat(path));
        };
    }
    Cache.prototype.values = function () {
        var _this = this;
        return this._keys.map(function (x) { return _this._children[x]; });
    };
    Cache.prototype.empty = function () {
        for (var _i = 0, _a = this._keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var item = this._children[key];
            var len = this.count(item);
            while (len--) {
                this.remove(item);
            }
        }
    };
    Cache.prototype.add = function (style) {
        var count = this._counts[style.id] || 0;
        var item = this._children[style.id];
        this._counts[style.id] = count + 1;
        if (count === 0) {
            item = style.clone();
            this._keys.push(item.id);
            this._children[item.id] = item;
            this.emitChange('add', [item]);
        }
        else {
            this._keys.splice(this._keys.indexOf(style.id), 1);
            this._keys.push(style.id);
            // Check if contents are different.
            if (item.getIdentifier() !== style.getIdentifier()) {
                throw new TypeError("Hash collision: " + style.getStyles() + " === " + item.getStyles());
            }
        }
        if (style instanceof Cache) {
            if (count === 0) {
                item.addChangeListener(this._childListener);
            }
            for (var _i = 0, _a = style.values(); _i < _a.length; _i++) {
                var cacheItem = _a[_i];
                item.add(cacheItem);
            }
        }
        return item;
    };
    Cache.prototype.get = function (style) {
        return this._children[style.id];
    };
    Cache.prototype.count = function (style) {
        return this._counts[style.id] || 0;
    };
    Cache.prototype.remove = function (style) {
        var count = this._counts[style.id];
        if (count > 0) {
            this._counts[style.id] = count - 1;
            var item = this._children[style.id];
            if (count === 1) {
                delete this._counts[style.id];
                delete this._children[style.id];
                this._keys.splice(this._keys.indexOf(style.id), 1);
                this.emitChange('remove', [style]);
            }
            if (style instanceof Cache) {
                if (count === 1) {
                    item.removeChangeListener(this._childListener);
                }
                for (var _i = 0, _a = style.values(); _i < _a.length; _i++) {
                    var cacheItem = _a[_i];
                    item.remove(cacheItem);
                }
            }
        }
    };
    Cache.prototype.addChangeListener = function (fn) {
        this._listeners.push(fn);
    };
    Cache.prototype.removeChangeListener = function (fn) {
        var listeners = this._listeners;
        var index = listeners.indexOf(fn);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    };
    Cache.prototype.emitChange = function (type, path) {
        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(type, path, this);
        }
    };
    Cache.prototype.merge = function (style) {
        for (var _i = 0, _a = style.values(); _i < _a.length; _i++) {
            var cacheItem = _a[_i];
            this.add(cacheItem);
        }
        style.addChangeListener(this._mergeListener);
    };
    Cache.prototype.unmerge = function (style) {
        for (var _i = 0, _a = style.values(); _i < _a.length; _i++) {
            var cacheItem = _a[_i];
            this.remove(cacheItem);
        }
        style.removeChangeListener(this._mergeListener);
    };
    return Cache;
}());
exports.Cache = Cache;
/**
 * Selector is a dumb class made to represent nested CSS selectors.
 */
Selector = (function () {
    function Selector(selector, hash, id, identifier) {
        if (hash === void 0) { hash = stringHash; }
        if (id === void 0) { id = "s" + hash(selector); }
        if (identifier === void 0) { identifier = ''; }
        this.selector = selector;
        this.hash = hash;
        this.id = id;
        this.identifier = identifier;
    }
    Selector.prototype.getStyles = function () {
        return this.selector;
    };
    Selector.prototype.getIdentifier = function () {
        return this.identifier + "_" + this.selector;
    };
    Selector.prototype.clone = function () {
        return new Selector(this.selector, this.hash, this.id, this.identifier);
    };
    return Selector;
}());
exports.Selector = Selector;
/**
 * The style container registers a style string with selectors.
 */
Style = (function (_super) {
    __extends(Style, _super);
    function Style(style, hash, id) {
        if (hash === void 0) { hash = stringHash; }
        if (id === void 0) { id = "c" + hash(style); }
        _super.call(this);
        this.style = style;
        this.hash = hash;
        this.id = id;
    }
    Style.prototype.getStyles = function () {
        return this.style ? this.values().map(function (x) { return x.selector; }).join(',') + "{" + this.style + "}" : '';
    };
    Style.prototype.getIdentifier = function () {
        return this.style;
    };
    Style.prototype.clone = function () {
        return new Style(this.style, this.hash, this.id);
    };
    return Style;
}(Cache));
exports.Style = Style;
/**
 * Implement rule logic for style output.
 */
Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule(rule, style, hash, id, identifier) {
        if (style === void 0) { style = ''; }
        if (hash === void 0) { hash = stringHash; }
        if (id === void 0) { id = "a" + hash(rule + style); }
        if (identifier === void 0) { identifier = ''; }
        _super.call(this);
        this.rule = rule;
        this.style = style;
        this.hash = hash;
        this.id = id;
        this.identifier = identifier;
    }
    Rule.prototype.getStyles = function () {
        return this.rule + "{" + this.style + getStyles(this) + "}";
    };
    Rule.prototype.getIdentifier = function () {
        return this.identifier + "_" + this.rule + "_" + this.style;
    };
    Rule.prototype.clone = function () {
        return new Rule(this.rule, this.style, this.hash, this.id, this.identifier);
    };
    return Rule;
}(Cache));
exports.Rule = Rule;
/**
 * The FreeStyle class implements the API for everything else.
 */
var FreeStyle = (function (_super) {
    __extends(FreeStyle, _super);
    function FreeStyle(hash, id) {
        if (hash === void 0) { hash = stringHash; }
        if (id === void 0) { id = "f" + (++instanceId).toString(36); }
        _super.call(this, hash);
        this.hash = hash;
        this.id = id;
    }
    FreeStyle.prototype.url = function (url) {
        return 'url("' + encodeURI(url) + '")';
    };
    FreeStyle.prototype.join = function () {
        var classList = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classList[_i - 0] = arguments[_i];
        }
        var classNames = [];
        for (var _a = 0, classList_1 = classList; _a < classList_1.length; _a++) {
            var value = classList_1[_a];
            if (typeof value === 'string') {
                classNames.push(value);
            }
            else if (Array.isArray(value)) {
                classNames.push(this.join.apply(this, value));
            }
            else if (value != null) {
                for (var _b = 0, _c = Object.keys(value); _b < _c.length; _b++) {
                    var key = _c[_b];
                    if (value[key]) {
                        classNames.push(key);
                    }
                }
            }
        }
        return classNames.join(' ');
    };
    FreeStyle.prototype.registerStyle = function (styles, key) {
        return registerUserStyles(this, styles, key);
    };
    FreeStyle.prototype.registerRule = function (rule, styles) {
        return registerUserRule(this, rule, styles);
    };
    FreeStyle.prototype.registerKeyframes = function (keyframes) {
        return registerUserHashedRule(this, 'keyframes', keyframes);
    };
    /* istanbul ignore next */
    FreeStyle.prototype.inject = function (target) {
        target = target || document.head;
        var node = document.createElement('style');
        node.innerHTML = this.getStyles();
        target.appendChild(node);
        return node;
    };
    FreeStyle.prototype.getStyles = function () {
        return getStyles(this);
    };
    FreeStyle.prototype.getIdentifier = function () {
        return this.id;
    };
    FreeStyle.prototype.clone = function () {
        return new FreeStyle(this.hash, this.id);
    };
    return FreeStyle;
}(Cache));
exports.FreeStyle = FreeStyle;
/**
 * Exports a simple function to create a new instance.
 */
function create(hash) {
    return new FreeStyle(hash);
}
exports.create = create;
//# sourceMappingURL=free-style.js.map